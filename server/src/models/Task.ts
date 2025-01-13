import mongoose from 'mongoose';

export interface ITask extends mongoose.Document {
  title: string;
  description?: string;
  priority: 'Low' | 'Moderate' | 'High';
  status: 'Not Started' | 'In Progress' | 'Completed';
  createdOn: Date;
  dueDate?: Date;
  image?: string;
  userId: string;
}

const TaskSchema = new mongoose.Schema<ITask>({
  title: { 
    type: String, 
    required: true 
  },
  description: String,
  priority: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    default: 'Moderate'
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: false
  },
  image: String,
  userId: {
    type: String,
    required: true
  }
});

export default mongoose.model<ITask>('Task', TaskSchema);