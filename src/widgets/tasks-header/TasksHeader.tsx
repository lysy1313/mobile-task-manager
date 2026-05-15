import { StyleSheet, View } from 'react-native';

import { Task } from '@/src/entities/task/model/task.types';
import { AppText, Card } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type TasksHeaderProps = {
  tasks: Task[];
};

type StatItem = {
  label: string;
  value: number;
  color: string;
  backgroundColor: string;
};

export function TasksHeader({ tasks }: TasksHeaderProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.status === 'completed').length;
  const inProgressTasks = tasks.filter((task) => task.status === 'in_progress').length;
  const cancelledTasks = tasks.filter((task) => task.status === 'cancelled').length;

  const statItems: StatItem[] = [
    {
      label: 'Total tasks',
      value: totalTasks,
      color: theme.colors.text,
      backgroundColor: 'rgba(182, 182, 182, 0.14)',
    },
    {
      label: 'In progress',
      value: inProgressTasks,
      color: theme.colors.primary,
      backgroundColor: 'rgba(59, 130, 246, 0.14)',
    },
    {
      label: 'Completed',
      value: completedTasks,
      color: theme.colors.success,
      backgroundColor: 'rgba(34, 197, 94, 0.14)',
    },
    {
      label: 'Cancelled',
      value: cancelledTasks,
      color: theme.colors.danger,
      backgroundColor: 'rgba(239, 68, 68, 0.14)',
    },
  ];

  return (
    <View style={styles.topSection}>
      <View style={styles.header}>
        <AppText variant="title">Tasks</AppText>

        <AppText variant="body" color={theme.colors.textMuted}>
          Stay organized and manage your work tasks efficiently.
        </AppText>
      </View>

      <View style={styles.statsGrid}>
        {statItems.map((item) => (
          <Card
            key={item.label}
            style={[styles.statCard, { backgroundColor: item.backgroundColor }]}
          >
            <View style={styles.statHeader}>
              <View style={[styles.statDot, { backgroundColor: item.color }]} />

              <AppText variant="caption" color={theme.colors.textMuted} numberOfLines={1}>
                {item.label}
              </AppText>
            </View>

            <AppText variant="subtitle" color={item.color} style={styles.statValue}>
              {item.value}
            </AppText>
          </Card>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    backgroundColor: theme.colors.topSection,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,

    borderBottomLeftRadius: theme.radius.xl,
    borderBottomRightRadius: theme.radius.xl,

    zIndex: 2,
    overflow: 'hidden',
  },

  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  statCard: {
    width: '48%',
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceStrong,
    padding: theme.spacing.md,
  },

  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  statDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },

  statLabel: {
    flex: 1,
  },

  statValue: {
    fontSize: 24,
    lineHeight: 28,
  },
});
