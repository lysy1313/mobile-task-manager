import { useFocusEffect } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import {
  deleteStoredTask,
  getStoredTasks,
  updateStoredTask,
} from '@/src/entities/task/model/task.storage';
import type { Task } from '@/src/entities/task/model/task.types';
import { sortTasks } from '@/src/features/task-sorting/model/sortTasks';
import type { TaskSortType } from '@/src/features/task-sorting/model/taskSort.types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sortType, setSortType] = useState<TaskSortType>('created_desc');

  const sortedTasks = useMemo(() => {
    return sortTasks(tasks, sortType);
  }, [tasks, sortType]);

  const selectedTask = useMemo(() => {
    return tasks.find((task) => task.id === selectedTaskId) ?? null;
  }, [tasks, selectedTaskId]);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);

      const storedTasks = await getStoredTasks();

      setTasks(storedTasks);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  function openTaskDetails(taskId: string) {
    setSelectedTaskId(taskId);
  }

  function closeTaskDetails() {
    setSelectedTaskId(null);
  }

  async function updateTask(updatedTask: Task) {
    await updateStoredTask(updatedTask);

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  async function deleteTask(taskToDelete: Task) {
    await deleteStoredTask(taskToDelete.id);

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskToDelete.id));
    setSelectedTaskId(null);
  }

  return {
    tasks,
    sortedTasks,
    sortType,
    setSortType,

    isLoading,

    selectedTask,
    openTaskDetails,
    closeTaskDetails,

    updateTask,
    deleteTask,
  };
}
