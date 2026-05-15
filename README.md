# Mobile Task Manager

A simple mobile task management application built with React Native and Expo.

The app allows users to create, view, edit, delete, sort, and manage work tasks locally on the device.

## Features

- Create new tasks with:
  - title
  - description
  - execution date and time
  - location
- View all created tasks in a clean task list
- Open task details in a modal
- Edit existing tasks
- Delete tasks
- Change task status:
  - In Progress
  - Completed
  - Cancelled
- Quickly update task status from the details modal
- Sort tasks by:
  - newest first
  - oldest first
  - status
- Store all task data locally on the device using AsyncStorage
- Validate task forms with React Hook Form and Zod
- Use reusable UI components
- Support mobile-friendly keyboard behavior and safe area layout

## Tech Stack

- React Native
- Expo
- Expo Router
- TypeScript
- React Hook Form
- Zod
- AsyncStorage
- React Native DateTimePicker
- Expo Vector Icons

## Project Structure

```text
app/
  _layout.tsx
  index.tsx
  create-task.tsx

src/
  entities/
    task/
      model/
      ui/

  features/
    create-task/
    task-management/
    task-sorting/

  widgets/
    task-details-modal/
    tasks-header/
    tasks-list/

  shared/
    components/
    config/
    utils/
```

## Main Screens

### Tasks Screen

The main screen displays all saved tasks, task statistics, sorting controls, and a floating action button for creating a new task.

### Create Task Screen

The create task screen contains a validated form where users can enter task information and save it locally.

### Task Details Modal

The task details modal allows users to view full task information, quickly change task status, edit task data, or delete the task.

## Local Storage

All tasks are stored locally on the device using AsyncStorage.

Storage key:

```text
task-manager:tasks
```

This ensures that tasks remain available after the app is closed and reopened.

## Validation

The app uses Zod schemas together with React Hook Form to validate task forms.

Required fields:

- title
- description
- location
- execution date and time

## How to Run

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Run on web:

```bash
npm run web
```

Run on a physical device:

1. Install Expo Go on your phone.
2. Start the project with `npm start`.
3. Scan the QR code from the terminal or browser.

## Android APK Build

The APK can be built with EAS Build.

Install EAS CLI if needed:

```bash
npm install -g eas-cli
```

Login to Expo:

```bash
eas login
```

Configure EAS:

```bash
eas build:configure
```

Build Android APK:

```bash
eas build -p android --profile preview
```

## Notes

The project focuses on clean structure, readable code, reusable components, local data persistence, and a simple modern mobile UI.
