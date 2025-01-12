export interface User {
    name: string;
    email: string;
    avatar: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    priority: 'Low' | 'Moderate' | 'High';
    status: 'Not Started' | 'In Progress' | 'Completed';
    createdOn: string;
    image?: string;
  }
  
  export interface TaskStatus {
    completed: number;
    inProgress: number;
    notStarted: number;
  }
  
  