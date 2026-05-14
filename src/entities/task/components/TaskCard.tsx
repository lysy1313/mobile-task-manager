import { StyleSheet, View } from 'react-native';

import { taskStatusLabels } from '@/src/entities/model/task/task.constants';
import { formatTaskDateTime } from '@/src/entities/model/task/task.lib';
import { Task, TaskStatus } from '@/src/entities/model/task/task.types';
import { AppText, Card } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type TaskCardProps = {
  task: Task;
};

function getStatusStyle(status: TaskStatus) {
  switch (status) {
    case 'completed':
      return styles.statusCompleted;

    case 'cancelled':
      return styles.statusCancelled;

    case 'in_progress':
    default:
      return styles.statusInProgress;
  }
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <AppText variant="subtitle" style={styles.taskTitle}>
          {task.title}
        </AppText>

        <View style={[styles.statusBadge, getStatusStyle(task.status)]}>
          <AppText variant="caption" style={styles.statusText}>
            {taskStatusLabels[task.status]}
          </AppText>
        </View>
      </View>

      <AppText variant="body" color={theme.colors.textMuted}>
        {task.description}
      </AppText>

      <View style={styles.metaList}>
        <AppText variant="caption" color={theme.colors.textMuted}>
          Date: {formatTaskDateTime(task.dateTime)}
        </AppText>

        <AppText variant="caption" color={theme.colors.textMuted}>
          Location: {task.location}
        </AppText>

        <AppText variant="caption" color={theme.colors.textMuted}>
          Created: {formatTaskDateTime(task.createdAt)}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  taskCard: {
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },

  taskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },

  taskTitle: {
    flex: 1,
  },

  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },

  statusInProgress: {
    backgroundColor: theme.colors.primary,
  },

  statusCompleted: {
    backgroundColor: theme.colors.success,
  },

  statusCancelled: {
    backgroundColor: theme.colors.danger,
  },

  statusText: {
    color: theme.colors.text,
    fontWeight: '700',
  },

  metaList: {
    gap: theme.spacing.xs,
  },
});
