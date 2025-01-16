# TaskChain AI: Intelligent Task Management Platform

## 🚀 Project Overview
TaskChain AI is an advanced task management and collaboration platform leveraging cutting-edge AI technologies to revolutionize productivity and workflow management.

## 🌟 Project Features

### Current Features
- 🤖 AI-Powered Task Management
- 📋 Intelligent Task Prioritization
- 🔄 Real-time Collaboration
- 🔐 Secure User Authentication
- 📊 Advanced Project Tracking

### Upcoming Features
- 🧠 Machine Learning Task Recommendations
- 📈 Advanced Analytics Dashboard
- 🌐 Multi-Team Collaboration
- 🤝 Third-Party Integrations

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- NestJS
- MongoDB
- Docker

### DevOps
- Docker
- Docker Compose
- Render (Deployment)

## 📦 Prerequisites
Before you begin, ensure you have:
- Node.js (v18+)
- npm (v9+)
- Docker
- Docker Compose

## 🔧 Local Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/taskchain-ai.git
cd taskchain-ai
```

### 2. Environment Setup
Create `.env` files in both `server` and `Frontend` directories:

**Server `.env`**
```
MONGODB_URI=
PORT=5000
FRONTEND_URL=http://localhost:8080
REDIS_URL=redis://localhost:6379



# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Frontend `.env`**
```
VITE_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
VITE_MONGODB_URI=
MONGODB_URI=
VITE_API_URL=http://localhost:5000/api

```

### 3. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

## 🐳 Docker Deployment

### Local Docker Setup
```bash
# Build and start containers
docker-compose up --build

# Stop containers
docker-compose down

# Rebuild without cache
docker-compose build --no-cache
```

### Production Deployment
* Recommended Platform: Render
* Configure environment variables
* Connect GitHub repository
* Set build commands in Render dashboard

## 🚀 Running the Application

### Development Mode
```bash
# Start Backend (server directory)
npm run start:dev

# Start Frontend (Frontend directory)
npm run dev
```

### Production Mode
```bash
# Build Backend
npm run build

# Start Backend
npm run start:prod

# Build Frontend
npm run build

# Serve Frontend
npm run preview
```

## 🔒 Security Considerations
* Use strong, unique passwords
* Enable Two-Factor Authentication
* Regularly update dependencies
* Use environment-specific configurations

## 🤝 Contributing

### How to Contribute
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

### Contribution Guidelines
* Follow existing code style
* Write comprehensive tests
* Update documentation
* Ensure CI/CD checks pass

## 🐛 Troubleshooting

### Common Issues
* Dependency conflicts
* Port already in use
* MongoDB connection errors

### Debugging
* Check Docker logs
* Verify environment variables
* Ensure all services are running





**Made with ❤️ and 🧠 by TaskChain AI**