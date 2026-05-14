import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';

import { addStoredTask } from '@/src/entities/task/model/task.storage';
import { CreateTaskSchema, type CreateTaskFormValues } from '@/src/entities/task/model/task.types';
import { createTaskFromFormValues } from '@/src/features/create-task/model/createTaskFromFormValues';
import { CreateTaskDateTimeField } from '@/src/features/create-task/ui/CreateTaskDateTimeField';
import { AppButton, AppText, AppTextInput, Card } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type CreateTaskFormProps = {
  onSuccess: () => void;
};

export function CreateTaskForm({ onSuccess }: CreateTaskFormProps) {
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateTaskFormValues>({
    resolver: zodResolver(CreateTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      location: '',
      description: '',
      dateTime: undefined,
    },
  });

  async function handleCreateTask(values: CreateTaskFormValues) {
    const newTask = createTaskFromFormValues(values);

    try {
      setSubmitError('');
      setIsSubmitting(true);

      await addStoredTask(newTask);

      onSuccess();
    } catch {
      setSubmitError('Failed to create task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card style={styles.card}>
      {submitError ? (
        <AppText variant="caption" color={theme.colors.danger}>
          {submitError}
        </AppText>
      ) : null}

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

      <CreateTaskDateTimeField control={control} error={errors.dateTime?.message} />

      <AppButton onPress={handleSubmit(handleCreateTask)} disabled={!isValid || isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create Task'}
      </AppButton>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
  },
});
