import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  AppButton,
  AppDateInput,
  AppIconButton,
  AppText,
  AppTextInput,
  Card,
  KeyboardAwareScreen,
} from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

export default function CreateTaskScreen() {
  const [deadline, setDeadline] = useState<Date | null>(null);

  function handleGoBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  return (
    <KeyboardAwareScreen>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppIconButton icon="←" onPress={handleGoBack} />

          <AppText variant="title">Create Task</AppText>
        </View>

        <AppText variant="body" color={theme.colors.textMuted}>
          Create a new task and organize your workflow.
        </AppText>
      </View>

      <Card style={styles.card}>
        <AppTextInput label="Title" placeholder="Enter title" />

        <AppTextInput label="Location" placeholder="Enter location" />

        <AppTextInput
          label="Description"
          placeholder="Enter description"
          multiline
          numberOfLines={5}
        />

        <AppDateInput label="Deadline" value={deadline} onChange={setDeadline} />

        <View style={styles.actions}>
          <AppButton onPress={() => console.log('Create task')}>Create Task</AppButton>
        </View>
      </Card>
    </KeyboardAwareScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  card: {
    gap: theme.spacing.md,
  },
  actions: {
    marginTop: theme.spacing.sm,
  },
});
