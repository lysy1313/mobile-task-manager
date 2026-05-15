import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { StyleSheet, View } from 'react-native';
import { taskStatusLabels } from '../../model/task.constants';
import { TaskStatus } from '../../model/task.types';

const statusConfig: Record<
  TaskStatus,
  {
    color: string;
    backgroundColor: string;
  }
> = {
  in_progress: {
    color: theme.colors.primary,
    backgroundColor: 'rgba(59, 130, 246, 0.16)',
  },
  completed: {
    color: theme.colors.success,
    backgroundColor: 'rgba(34, 197, 94, 0.16)',
  },
  cancelled: {
    color: theme.colors.danger,
    backgroundColor: 'rgba(239, 68, 68, 0.16)',
  },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];

  return (
    <View
      style={[
        styles.statusBadge,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.color,
        },
      ]}
    >
      <AppText variant="caption" style={[styles.statusText, { color: config.color }]}>
        {taskStatusLabels[status]}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  statusBadge: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontWeight: '700',
  },
});
