import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { getStoredTasks } from '@/src/entities/task/model/task.storage';
import { Task } from '@/src/entities/task/model/task.types';
import { AppIconButton, AppLoader, AppText, Screen } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { stylesEmptyState, TasksEmptyState } from '@/src/widgets/tasks-empty-state/TasksEmptyState';
import { TasksHeader } from '@/src/widgets/tasks-header/TasksHeader';
import { TasksList } from '@/src/widgets/tasks-list/TasksList';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadTasks() {
        try {
          setIsLoading(true);

          const storedTasks = await getStoredTasks();

          setTasks(storedTasks);
        } finally {
          setIsLoading(false);
        }
      }

      loadTasks();
    }, []),
  );

  return (
    <Screen withPadding={false} backgroundColor={theme.colors.topSection}>
      <StatusBar style="light" />

      <View style={styles.screenContent}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <TasksHeader tasks={tasks} />

          <View style={styles.mainContent}>
            <View style={styles.sectionHeader}>
              <AppText variant="subtitle">All tasks</AppText>
            </View>

            {isLoading ? (
              <View style={stylesEmptyState.emptyState}>
                <AppLoader text="Loading tasks..." />
              </View>
            ) : tasks.length > 0 ? (
              <TasksList tasks={tasks} />
            ) : (
              <TasksEmptyState />
            )}
          </View>
        </ScrollView>

        {tasks.length !== 0 && (
          <AppIconButton
            icon="plus"
            onPress={() => router.push('/create-task')}
            style={styles.floatingButton}
            iconColor={theme.colors.text}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
  },

  mainContent: {
    flex: 1,
    backgroundColor: theme.colors.background,

    marginTop: -theme.radius.xl,
    paddingTop: theme.spacing.xl + theme.radius.xl,

    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 96,
  },

  sectionHeader: {
    marginBottom: theme.spacing.md,
  },

  floatingButton: {
    position: 'absolute',
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,

    backgroundColor: theme.colors.topSection,
    borderColor: theme.colors.primaryDark,

    zIndex: 10,
    elevation: 10,
  },
});
