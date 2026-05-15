import { TaskStatus } from './task.types';

export const taskStatusLabels: Record<TaskStatus, string> = {
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};
