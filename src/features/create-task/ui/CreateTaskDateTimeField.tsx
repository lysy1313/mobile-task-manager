import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import type { CreateTaskFormValues } from '@/src/entities/task/model/task.types';
import { AppDateInput, AppText, AppTimeInput } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { mergeDatePart, mergeTimePart } from '@/src/shared/utils/mergeDateTime';

type CreateTaskDateTimeFieldProps = {
  control: Control<CreateTaskFormValues>;
  error?: string;
};

export function CreateTaskDateTimeField({ control, error }: CreateTaskDateTimeFieldProps) {
  return (
    <Controller
      control={control}
      name="dateTime"
      render={({ field: { value, onChange } }) => (
        <View style={styles.group}>
          <View style={styles.row}>
            <View style={styles.field}>
              <AppDateInput
                label="Date"
                value={value ?? null}
                onChange={(selectedDate) => onChange(mergeDatePart(value, selectedDate))}
              />
            </View>

            <View style={styles.field}>
              <AppTimeInput
                label="Time"
                value={value ?? null}
                onChange={(selectedTime) => onChange(mergeTimePart(value, selectedTime))}
              />
            </View>
          </View>

          {error ? (
            <AppText variant="caption" color={theme.colors.danger}>
              {error}
            </AppText>
          ) : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  group: {
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  field: {
    flex: 1,
  },
});
