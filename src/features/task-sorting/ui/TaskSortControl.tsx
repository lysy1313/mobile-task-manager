import { Pressable, StyleSheet, View } from 'react-native';

import type { TaskSortType } from '@/src/features/task-sorting/model/taskSort.types';
import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type TaskSortControlProps = {
  value: TaskSortType;
  onChange: (value: TaskSortType) => void;
};

const sortOptions: {
  label: string;
  value: TaskSortType;
}[] = [
  {
    label: 'Newest',
    value: 'created_desc',
  },
  {
    label: 'Oldest',
    value: 'created_asc',
  },
  {
    label: 'Status',
    value: 'status',
  },
];

export function TaskSortControl({ value, onChange }: TaskSortControlProps) {
  return (
    <View style={styles.options}>
      {sortOptions.map((option) => {
        const isSelected = value === option.value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => [
              styles.option,
              isSelected && styles.optionSelected,
              pressed && styles.pressed,
            ]}
          >
            <AppText
              variant="caption"
              color={isSelected ? theme.colors.text : theme.colors.textMuted}
              style={styles.optionText}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },

  option: {
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.sm,
  },

  optionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },

  pressed: {
    opacity: 0.82,
  },

  optionText: {
    fontWeight: '700',
  },
});
