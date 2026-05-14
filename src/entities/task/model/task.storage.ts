import AsyncStorage from '@react-native-async-storage/async-storage';

import * as z from 'zod';
import { Task, TaskSchema } from './task.types';

const TASKS_STORAGE_KEY = 'tasks';

export async function getStoredTasks(): Promise<Task[]> {
  try {
    const rawTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

    if (!rawTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(rawTasks);

    const result = z.array(TaskSchema).safeParse(parsedTasks);

    if (!result.success) {
      return [];
    }

    return result.data;
  } catch (error) {
    console.log('Failed to load tasks:', error);
    return [];
  }
}

export async function saveStoredTasks(tasks: Task[]): Promise<void> {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.log('Failed to save tasks:', error);
    throw error;
  }
}

export async function addStoredTask(task: Task): Promise<void> {
  const currentTasks = await getStoredTasks();
  const nextTasks = [task, ...currentTasks];

  await saveStoredTasks(nextTasks);
}
