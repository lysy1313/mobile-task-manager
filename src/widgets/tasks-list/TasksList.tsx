import { StyleSheet, View } from 'react-native';

import { Task } from '@/src/entities/task/model/task.types';
import { TaskCard } from '@/src/entities/task/ui/TaskCard';
import { theme } from '@/src/shared/config/theme';

type TasksListProps = {
  tasks: Task[];
  onTaskPress?: (taskId: string) => void;
};

export function TasksList({ tasks, onTaskPress }: TasksListProps) {
  return (
    <View style={styles.taskList}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onPress={() => onTaskPress?.(task.id)} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  taskList: {
    gap: theme.spacing.md,
  },
});
