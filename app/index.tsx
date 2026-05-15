import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import { TaskSortControl } from '@/src/features/task-sorting/ui/TaskSortControl';
import { AppIconButton, AppLoader, AppText, Screen } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { useTasks } from '@/src/shared/utils/useTasks';
import { TaskDetailsModal } from '@/src/widgets/task-details-modal/TaskDetailsModal';
import { stylesEmptyState, TasksEmptyState } from '@/src/widgets/tasks-empty-state/TasksEmptyState';
import { TasksHeader } from '@/src/widgets/tasks-header/TasksHeader';
import { TasksList } from '@/src/widgets/tasks-list/TasksList';

export default function HomeScreen() {
  const {
    tasks,
    sortedTasks,
    sortType,
    setSortType,
    isLoading,
    selectedTask,
    openTaskDetails,
    closeTaskDetails,
    updateTask,
    deleteTask,
  } = useTasks();

  return (
    <Screen withPadding={false} backgroundColor={theme.colors.topSection}>
      <StatusBar style="light" />

      <View style={styles.screenContent}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <TasksHeader tasks={tasks} />

          <View style={styles.mainContent}>
            <View style={styles.sectionHeader}>
              <AppText variant="subtitle">All tasks</AppText>
              {tasks.length > 0 ? (
                <TaskSortControl value={sortType} onChange={setSortType} />
              ) : null}
            </View>

            {isLoading ? (
              <View style={stylesEmptyState.emptyState}>
                <AppLoader text="Loading tasks..." />
              </View>
            ) : tasks.length > 0 ? (
              <TasksList tasks={sortedTasks} onTaskPress={openTaskDetails} />
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

        <TaskDetailsModal
          visible={Boolean(selectedTask)}
          task={selectedTask}
          onClose={closeTaskDetails}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
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
    marginBottom: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
