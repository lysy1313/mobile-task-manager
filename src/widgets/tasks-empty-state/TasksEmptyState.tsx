// @flow
import { AppButton, AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { router } from 'expo-router';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

export const TasksEmptyState = () => {
  return (
    <View style={stylesEmptyState.emptyState}>
      <AppText variant="subtitle">No tasks yet</AppText>

      <AppText variant="body" color={theme.colors.textMuted}>
        Create your first task to start organizing your work.
      </AppText>
      <AppButton onPress={() => router.push('/create-task')}>Create task</AppButton>
    </View>
  );
};

export const stylesEmptyState = StyleSheet.create({
  emptyState: {
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
});
