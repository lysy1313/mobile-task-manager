export type TaskStatus = 'in_progress' | 'completed' | 'cancelled';

export type Task = {
  id: string;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  status: TaskStatus;
  createdAt: string;
};
