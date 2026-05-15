import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Task Manager',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-task"
        options={{
          title: 'Create Task',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
