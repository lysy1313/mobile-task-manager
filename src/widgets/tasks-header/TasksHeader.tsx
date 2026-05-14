import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type TasksHeaderProps = {
  totalTasks: number;
  inProgressTasks: number;
  completedTasks: number;
};

export function TasksHeader({ totalTasks, inProgressTasks, completedTasks }: TasksHeaderProps) {
  return (
    <View style={styles.topSection}>
      <View style={styles.header}>
        <AppText variant="title">Tasks</AppText>

        <AppText variant="body" color={theme.colors.textMuted}>
          Temporary task list screen.
        </AppText>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.statCard}>
          <AppText variant="caption" color={theme.colors.textMuted}>
            Total
          </AppText>

          <AppText variant="subtitle">{totalTasks}</AppText>
        </Card>

        <Card style={styles.statCard}>
          <AppText variant="caption" color={theme.colors.textMuted}>
            Active
          </AppText>

          <AppText variant="subtitle">{inProgressTasks}</AppText>
        </Card>

        <Card style={styles.statCard}>
          <AppText variant="caption" color={theme.colors.textMuted}>
            Done
          </AppText>

          <AppText variant="subtitle">{completedTasks}</AppText>
        </Card>
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
    marginBottom: theme.spacing.xl,
  },

  statsRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  statCard: {
    flex: 1,
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surfaceStrong,
  },
});
