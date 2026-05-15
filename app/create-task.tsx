import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { CreateTaskForm } from '@/src/features/create-task/ui/CreateTaskForm';
import { AppIconButton, AppText, KeyboardAwareScreen } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

export default function CreateTaskScreen() {
  function handleGoBack() {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace('/');
  }

  function handleSuccess() {
    router.replace('/');
  }

  return (
    <KeyboardAwareScreen>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <AppIconButton icon="arrow-left" onPress={handleGoBack} />
          <AppText variant="title">Create Task</AppText>
        </View>

        <AppText variant="body" color={theme.colors.textMuted}>
          Create a new task and organize your workflow.
        </AppText>
      </View>

      <CreateTaskForm onSuccess={handleSuccess} />
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
});
