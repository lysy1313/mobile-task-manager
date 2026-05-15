import { Pressable, StyleSheet, View } from 'react-native';

import { taskStatusLabels } from '@/src/entities/task/model/task.constants';
import type { TaskStatus } from '@/src/entities/task/model/task.types';
import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type TaskStatusSelectProps = {
  value: TaskStatus;
  onChange: (status: TaskStatus) => void;
  error?: string;
};

const statusOptions: TaskStatus[] = ['in_progress', 'completed', 'cancelled'];

const statusColors: Record<TaskStatus, string> = {
  in_progress: theme.colors.primary,
  completed: theme.colors.success,
  cancelled: theme.colors.danger,
};

export function TaskStatusSelect({ value, onChange, error }: TaskStatusSelectProps) {
  return (
    <View style={styles.wrapper}>
      <AppText variant="caption" color={theme.colors.textMuted}>
        Status
      </AppText>

      <View style={styles.options}>
        {statusOptions.map((status) => {
          const isSelected = value === status;
          const color = statusColors[status];

          return (
            <Pressable
              key={status}
              onPress={() => onChange(status)}
              style={({ pressed }) => [
                styles.option,
                {
                  borderColor: isSelected ? color : theme.colors.border,
                  backgroundColor: isSelected ? color : theme.colors.surfaceStrong,
                },
                pressed && styles.pressed,
              ]}
            >
              <AppText
                variant="caption"
                style={[
                  styles.optionText,
                  {
                    color: isSelected ? theme.colors.text : theme.colors.textMuted,
                  },
                ]}
              >
                {taskStatusLabels[status]}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {error ? (
        <AppText variant="caption" color={theme.colors.danger}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.xs,
  },

  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },

  option: {
    minHeight: 40,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
  },

  pressed: {
    opacity: 0.82,
  },

  optionText: {
    fontWeight: '700',
  },
});
