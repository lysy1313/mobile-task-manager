import { Pressable, StyleSheet, View } from 'react-native';

import { formatTaskDateTime } from '@/src/entities/task/model/task.lib';
import type { Task } from '@/src/entities/task/model/task.types';
import { AppText, Card } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { StatusBadge } from './StatusBadge/StatusBadge';
import { TaskMetaRow } from './TaskMetaRow/TaskMetaRow';

type TaskCardProps = {
  task: Task;
  onPress?: () => void;
};

export function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open task ${task.title}`}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
    >
      <Card style={styles.taskCard}>
        <View style={styles.taskHeader}>
          <AppText variant="subtitle" style={styles.taskTitle} numberOfLines={2}>
            {task.title}
          </AppText>

          <StatusBadge status={task.status} />
        </View>

        <AppText
          variant="body"
          color={theme.colors.textMuted}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {task.description}
        </AppText>

        <View style={styles.metaList}>
          <TaskMetaRow label="Date" value={formatTaskDateTime(task.dateTime)} />
          <TaskMetaRow label="Location" value={task.location} />
          <TaskMetaRow label="Created" value={formatTaskDateTime(task.createdAt)} />
        </View>

        <AppText variant="caption" color={theme.colors.primary}>
          Tap to view details
        </AppText>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    borderRadius: theme.radius.lg,
  },

  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.99 }],
  },

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

  metaList: {
    gap: theme.spacing.xs,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
});
