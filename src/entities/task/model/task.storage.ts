import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from 'zod';

import { TaskSchema, type Task } from './task.types';

const TASKS_STORAGE_KEY = 'task-manager:tasks';

const TasksSchema = z.array(TaskSchema);

export async function getStoredTasks(): Promise<Task[]> {
  try {
    const rawTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

    if (!rawTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(rawTasks);
    const result = TasksSchema.safeParse(parsedTasks);

    if (!result.success) {
      await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
      return [];
    }

    return result.data;
  } catch {
    return [];
  }
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  const result = TasksSchema.safeParse(tasks);

  if (!result.success) {
    throw new Error('Invalid tasks data');
  }

  await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(result.data));
}

export async function addStoredTask(task: Task): Promise<void> {
  const currentTasks = await getStoredTasks();
  const nextTasks = [task, ...currentTasks];

  await saveStoredTasks(nextTasks);
}

export async function updateStoredTask(updatedTask: Task): Promise<void> {
  const currentTasks = await getStoredTasks();

  const nextTasks = currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));

  await saveStoredTasks(nextTasks);
}

export async function deleteStoredTask(taskId: string): Promise<void> {
  const currentTasks = await getStoredTasks();

  const nextTasks = currentTasks.filter((task) => task.id !== taskId);

  await saveStoredTasks(nextTasks);
}
