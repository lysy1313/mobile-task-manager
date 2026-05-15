import type { CreateTaskFormValues, Task } from '@/src/entities/task/model/task.types';

export function createTaskFromFormValues(values: CreateTaskFormValues): Task {
  return {
    id: `${Date.now()}`,
    title: values.title.trim(),
    description: values.description.trim(),
    location: values.location.trim(),
    dateTime: values.dateTime.toISOString(),
    status: 'in_progress',
    createdAt: new Date().toISOString(),
  };
}
