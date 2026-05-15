import { z } from 'zod';

export const TaskStatusSchema = z.enum(['in_progress', 'completed', 'cancelled']);

export const TaskSchema = z.object({
  id: z.string().min(1, 'Task id is required'),

  title: z.string().trim().min(1, 'Title is required').max(80, 'Title is too long'),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(500, 'Description is too long'),

  dateTime: z.iso.datetime({
    message: 'Invalid task date',
  }),

  location: z.string().trim().min(1, 'Location is required').max(120, 'Location is too long'),

  status: TaskStatusSchema,

  createdAt: z.iso.datetime({
    message: 'Invalid creation date',
  }),
});

export const CreateTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(80, 'Title is too long'),

  description: z
    .string()
    .trim()
    .min(1, 'Description is required')
    .max(500, 'Description is too long'),

  dateTime: z.date({
    message: 'Deadline is required',
  }),

  location: z.string().trim().min(1, 'Location is required').max(120, 'Location is too long'),
});

export const UpdateTaskSchema = CreateTaskSchema.extend({
  status: TaskStatusSchema,
});

export type TaskStatus = z.infer<typeof TaskStatusSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskFormValues = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskFormValues = z.infer<typeof UpdateTaskSchema>;
