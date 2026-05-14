import { StyleSheet, View } from 'react-native';

import { formatTaskDateTime } from '@/src/entities/task/model/task.lib';
import type { Task, TaskStatus } from '@/src/entities/task/model/task.types';
import { TaskStatusSelect } from '@/src/entities/task/ui/TaskStatusSelect/TaskStatusSelect';
import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { DetailRow } from './DetailRow';

type TaskDetailsViewProps = {
  task: Task;
  onStatusChange: (status: TaskStatus) => void;
};

export function TaskDetailsView({ task, onStatusChange }: TaskDetailsViewProps) {
  return (
    <>
      <View style={styles.section}>
        <AppText variant="caption" color={theme.colors.textMuted}>
          Description
        </AppText>

        <AppText variant="body">{task.description}</AppText>
      </View>

      <View style={styles.detailsCard}>
        <DetailRow label="Execution date" value={formatTaskDateTime(task.dateTime)} />
        <DetailRow label="Location" value={task.location} />
        <DetailRow label="Created" value={formatTaskDateTime(task.createdAt)} />
      </View>

      <View style={styles.statusSection}>
        <TaskStatusSelect value={task.status} onChange={onStatusChange} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: theme.spacing.xs,
  },

  detailsCard: {
    gap: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surfaceStrong,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
  },

  statusSection: {
    gap: theme.spacing.xs,
  },
});
