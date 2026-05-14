import { StyleSheet, View } from 'react-native';

import { Task } from '@/src/entities/task/model/task.types';
import { TaskCard } from '@/src/entities/task/ui/TaskCard';
import { theme } from '@/src/shared/config/theme';

type TasksListProps = {
  tasks: Task[];
};

export function TasksList({ tasks }: TasksListProps) {
  return (
    <View style={styles.taskList}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  taskList: {
    gap: theme.spacing.md,
  },
});
