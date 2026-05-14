import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import {
  type Task,
  type UpdateTaskFormValues,
  UpdateTaskSchema,
} from '@/src/entities/task/model/task.types';
import { TaskStatusSelect } from '@/src/entities/task/ui/TaskStatusSelect/TaskStatusSelect';
import {
  AppButton,
  AppDateInput,
  AppText,
  AppTextInput,
  AppTimeInput,
} from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { mergeDatePart, mergeTimePart } from '@/src/shared/utils/mergeDateTime';

type TaskDetailsEditFormProps = {
  task: Task;
  isSaving?: boolean;
  onCancel: () => void;
  onSave: (task: Task) => Promise<void> | void;
};

export function TaskDetailsEditForm({
  task,
  isSaving = false,
  onCancel,
  onSave,
}: TaskDetailsEditFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UpdateTaskFormValues>({
    resolver: zodResolver(UpdateTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: task.title,
      location: task.location,
      description: task.description,
      dateTime: new Date(task.dateTime),
      status: task.status,
    },
  });

  async function handleSave(values: UpdateTaskFormValues) {
    const updatedTask: Task = {
      ...task,
      title: values.title.trim(),
      location: values.location.trim(),
      description: values.description.trim(),
      dateTime: values.dateTime.toISOString(),
      status: values.status,
    };

    await onSave(updatedTask);
  }

  return (
    <>
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <AppTextInput
            label="Title"
            placeholder="Enter title"
            value={value}
            onChangeText={onChange}
            error={errors.title?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { value, onChange } }) => (
          <AppTextInput
            label="Location"
            placeholder="Enter location"
            value={value}
            onChangeText={onChange}
            error={errors.location?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <AppTextInput
            label="Description"
            placeholder="Enter description"
            value={value}
            onChangeText={onChange}
            error={errors.description?.message}
            multiline
            numberOfLines={5}
          />
        )}
      />

      <Controller
        control={control}
        name="dateTime"
        render={({ field: { value, onChange } }) => (
          <View style={styles.dateTimeGroup}>
            <AppText variant="caption" color={theme.colors.textMuted}>
              Execution date and time
            </AppText>

            <View style={styles.dateTimeRow}>
              <View style={styles.dateTimeField}>
                <AppDateInput
                  label="Date"
                  value={value ?? null}
                  onChange={(selectedDate) => onChange(mergeDatePart(value, selectedDate))}
                />
              </View>

              <View style={styles.dateTimeField}>
                <AppTimeInput
                  label="Time"
                  value={value ?? null}
                  onChange={(selectedTime) => onChange(mergeTimePart(value, selectedTime))}
                />
              </View>
            </View>

            {errors.dateTime?.message ? (
              <AppText variant="caption" color={theme.colors.danger}>
                {errors.dateTime.message}
              </AppText>
            ) : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="status"
        render={({ field: { value, onChange } }) => (
          <TaskStatusSelect value={value} onChange={onChange} error={errors.status?.message} />
        )}
      />

      <View style={styles.actions}>
        <AppButton onPress={handleSubmit(handleSave)} disabled={!isValid || isSaving}>
          {isSaving ? 'Saving...' : 'Save changes'}
        </AppButton>

        <AppButton onPress={onCancel}>Cancel</AppButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateTimeGroup: {
    gap: theme.spacing.xs,
  },

  dateTimeRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },

  dateTimeField: {
    flex: 1,
  },

  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
});
