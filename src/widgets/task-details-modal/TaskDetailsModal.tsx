import { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import type { Task, TaskStatus } from '@/src/entities/task/model/task.types';
import { StatusBadge } from '@/src/entities/task/ui/StatusBadge/StatusBadge';
import { AppIconButton, AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { TaskDetailsEditForm } from './TaskDetailsEditForm';
import { TaskDetailsView } from './TaskDetailsView';

type TaskDetailsModalProps = {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
  onUpdate: (task: Task) => Promise<void> | void;
  onDelete: (task: Task) => Promise<void> | void;
};

export function TaskDetailsModal({
  visible,
  task,
  onClose,
  onUpdate,
  onDelete,
}: TaskDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsEditing(false);
    }
  }, [visible, task?.id]);

  if (!task) {
    return null;
  }

  const currentTask = task;

  function handleClose() {
    setIsEditing(false);
    onClose();
  }

  async function handleUpdateTask(updatedTask: Task) {
    try {
      setIsSaving(true);

      await onUpdate(updatedTask);

      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(status: TaskStatus) {
    if (status === currentTask.status) {
      return;
    }

    const updatedTask: Task = {
      ...currentTask,
      status,
    };

    try {
      setIsStatusUpdating(true);

      await onUpdate(updatedTask);
    } finally {
      setIsStatusUpdating(false);
    }
  }

  function handleDeleteTask() {
    Alert.alert('Delete task?', 'This action cannot be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await onDelete(currentTask);
          handleClose();
        },
      },
    ]);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdrop} onPress={handleClose} />

        <View style={styles.sheet}>
          <View style={styles.header}>
            <View style={styles.titleBlock}>
              <AppText variant="subtitle" numberOfLines={2}>
                {isEditing ? 'Edit task' : currentTask.title}
              </AppText>

              {!isEditing ? <StatusBadge status={currentTask.status} /> : null}
            </View>

            <View style={styles.headerActions}>
              {!isEditing ? (
                <>
                  <AppIconButton
                    icon="edit-3"
                    onPress={() => setIsEditing(true)}
                    style={styles.headerButton}
                  />

                  <AppIconButton
                    icon="trash-2"
                    onPress={handleDeleteTask}
                    style={[styles.headerButton, styles.deleteIconButton]}
                    iconColor={theme.colors.danger}
                  />
                </>
              ) : null}

              <AppIconButton icon="x" onPress={handleClose} style={styles.headerButton} />
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
            {isEditing ? (
              <TaskDetailsEditForm
                task={currentTask}
                isSaving={isSaving}
                onCancel={() => setIsEditing(false)}
                onSave={handleUpdateTask}
              />
            ) : (
              <TaskDetailsView
                task={currentTask}
                onStatusChange={handleStatusChange}
                isStatusUpdating={isStatusUpdating}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.72)',
  },

  sheet: {
    maxHeight: '86%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },

  titleBlock: {
    flex: 1,
    gap: theme.spacing.sm,
  },

  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.surfaceStrong,
  },

  deleteIconButton: {
    borderColor: theme.colors.danger,
  },

  content: {
    gap: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
});
