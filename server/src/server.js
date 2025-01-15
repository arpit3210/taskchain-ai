"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const Task_1 = __importDefault(require("./models/Task"));
// Load environment variables from .env file
dotenv_1.default.config();
// Cloudinary Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://arpitsinghthakur321:064EkDhktztpzvzs@cluster0.jnsifwx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Multer configuration for file upload
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});
// Enhanced CORS configuration
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:8080', 'http://localhost:5173', 'http://127.0.0.1:8080', 'http://127.0.0.1:5173'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});
// MongoDB Connection with enhanced error handling
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('✅ MongoDB Connected Successfully');
})
    .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
});
// Cloudinary upload helper function
const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.v2.uploader.upload_stream({
            folder: 'task-images',
            allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
        }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
        uploadStream.end(file.buffer);
    });
};
// Create Task with Image Upload
function createTaskHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.group('Task Creation Process');
            console.log('Request Body:', req.body);
            console.log('Request File:', req.file);
            // Parse task data from the request
            const taskData = JSON.parse(req.body.taskData);
            // Handle file upload if exists
            let cloudinaryResult;
            if (req.file) {
                try {
                    cloudinaryResult = yield uploadToCloudinary(req.file);
                    taskData.image = cloudinaryResult.secure_url;
                    taskData.imagePublicId = cloudinaryResult.public_id;
                }
                catch (uploadError) {
                    console.error('Cloudinary Upload Error:', uploadError);
                    // Continue with task creation even if image upload fails
                }
            }
            // More precise duplicate task detection
            const similarTask = yield Task_1.default.findOne({
                userId: taskData.userId,
                title: { $regex: new RegExp(`^${taskData.title}$`, 'i') },
                description: taskData.description,
                priority: taskData.priority,
                status: taskData.status
            });
            console.log('Similar Task Found:', similarTask ? 'Yes' : 'No');
            if (similarTask) {
                console.warn('Potential duplicate task detected');
                console.groupEnd();
                res.status(409).json({
                    message: 'A similar task already exists'
                });
                return;
            }
            try {
                // Create and save the new task
                const newTask = new Task_1.default(taskData);
                yield newTask.save();
                console.log('Task created successfully:', newTask);
                console.groupEnd();
                res.status(201).json(newTask);
            }
            catch (saveError) {
                const errorMessage = saveError instanceof Error
                    ? saveError.message
                    : 'Unknown save error';
                console.error('Error saving task:', errorMessage);
                console.groupEnd();
                res.status(500).json({
                    message: 'Error saving task',
                    error: errorMessage
                });
            }
        }
        catch (error) {
            const errorMessage = error instanceof Error
                ? error.message
                : 'Unexpected error';
            console.error('Unexpected error in task creation:', errorMessage);
            console.groupEnd();
            res.status(500).json({
                message: 'Unexpected error creating task',
                error: errorMessage
            });
        }
    });
}
// Register the handler with proper typing
app.post('/api/tasks', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield createTaskHandler(req, res);
}));
// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        message: 'Backend is running smoothly',
        timestamp: new Date().toISOString(),
        mongoStatus: mongoose_1.default.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});
// Get Tasks
app.get('/api/tasks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.query;
        console.log('Fetching tasks for userId:', userId);
        const tasks = yield Task_1.default.find({ userId });
        res.json(tasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({
            message: 'Error fetching tasks',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}));
const deleteTaskHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const { userId } = req.query;
        console.log('Delete task request:', { taskId, userId });
        if (!userId) {
            res.status(400).json({ message: 'User ID is required' });
            return;
        }
        const deletedTask = yield Task_1.default.findOneAndDelete({ _id: taskId, userId: userId });
        if (!deletedTask) {
            res.status(404).json({ message: 'Task not found or unauthorized' });
            return;
        }
        if (deletedTask.imagePublicId) {
            yield cloudinary_1.v2.uploader.destroy(deletedTask.imagePublicId);
        }
        res.status(200).json({ message: 'Task deleted successfully', task: deletedTask });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({
            message: 'Error deleting task',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Apply the handler to the route
app.delete('/api/tasks/:taskId', deleteTaskHandler);
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        message: 'An unexpected error occurred',
        error: err.message || 'Unknown error'
    });
});
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('🛑 SIGINT received. Shutting down gracefully...');
    server.close(() => {
        mongoose_1.default.connection.close(false).then(() => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        }).catch((err) => {
            console.error('Error closing MongoDB connection:', err);
            process.exit(1);
        });
    });
});
