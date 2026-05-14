import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Task } from '@/src/entities/model/task/task.types';
import { AppIconButton, AppText, Screen } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { TasksHeader } from '@/src/widgets/tasks-header/TasksHeader';
import { TasksList } from '@/src/widgets/tasks-list/TasksList';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Prepare project structure',
    description: 'Create the base FSD structure and shared UI components.',
    dateTime: '2026-05-15T10:00:00.000Z',
    location: 'Home office',
    status: 'in_progress',
    createdAt: '2026-05-14T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Design task form',
    description: 'Build the first version of the create task screen.',
    dateTime: '2026-05-16T14:30:00.000Z',
    location: 'Workspace',
    status: 'completed',
    createdAt: '2026-05-14T13:20:00.000Z',
  },
  {
    id: '3',
    title: 'Test date picker',
    description: 'Check date picker behavior on iPhone with Expo Go.',
    dateTime: '2026-05-17T18:00:00.000Z',
    location: 'Mobile device',
    status: 'cancelled',
    createdAt: '2026-05-14T15:45:00.000Z',
  },
];

export default function HomeScreen() {
  const totalTasks = mockTasks.length;
  const completedTasks = mockTasks.filter((task) => task.status === 'completed').length;
  const inProgressTasks = mockTasks.filter((task) => task.status === 'in_progress').length;

  return (
    <Screen withPadding={false} backgroundColor={theme.colors.topSection}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <TasksHeader
          totalTasks={totalTasks}
          inProgressTasks={inProgressTasks}
          completedTasks={completedTasks}
        />

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <AppText variant="subtitle">All tasks</AppText>

            <AppIconButton icon="+" onPress={() => router.push('/create-task')} />
          </View>

          <TasksList tasks={mockTasks} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },

  mainContent: {
    flex: 1,
    backgroundColor: theme.colors.background,

    marginTop: -theme.radius.xl,
    paddingTop: theme.spacing.xl + theme.radius.xl,

    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
});
