import type { Task } from '@/src/entities/task/model/task.types';
import type { TaskSortType } from './taskSort.types';

const statusOrder: Record<Task['status'], number> = {
  in_progress: 1,
  completed: 2,
  cancelled: 3,
};

function sortByCreatedDesc(a: Task, b: Task) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function sortByCreatedAsc(a: Task, b: Task) {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
}

export function sortTasks(tasks: Task[], sortType: TaskSortType): Task[] {
  const tasksCopy = [...tasks];

  switch (sortType) {
    case 'created_asc':
      return tasksCopy.sort(sortByCreatedAsc);

    case 'status':
      return tasksCopy.sort((a, b) => {
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];

        if (statusDiff !== 0) {
          return statusDiff;
        }

        return sortByCreatedDesc(a, b);
      });

    case 'created_desc':
    default:
      return tasksCopy.sort(sortByCreatedDesc);
  }
}
