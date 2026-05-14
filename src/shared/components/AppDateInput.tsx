import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { Animated, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/src/shared/config/theme';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

type AppDateInputProps = {
  label?: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
};

function formatDate(date: Date | null, placeholder: string) {
  if (!date) {
    return placeholder;
  }

  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function AppDateInput({
  label,
  value,
  onChange,
  placeholder = 'Select date',
}: AppDateInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value ?? new Date());

  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(320)).current;

  function openPicker() {
    setTempDate(value ?? new Date());
    setIsOpen(true);

    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(sheetTranslateY, {
          toValue: 0,
          duration: 240,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }

  function closePicker() {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: 320,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsOpen(false);
    });
  }

  function confirmDate() {
    onChange(tempDate);
    closePicker();
  }

  function handleChange(event: DateTimePickerEvent, selectedDate?: Date) {
    if (event.type === 'dismissed') {
      closePicker();
      return;
    }

    if (!selectedDate) {
      return;
    }

    if (Platform.OS === 'android') {
      onChange(selectedDate);
      setIsOpen(false);
      return;
    }

    setTempDate(selectedDate);
  }

  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText variant="caption" color={theme.colors.textMuted}>
          {label}
        </AppText>
      ) : null}

      <Pressable style={styles.input} onPress={openPicker}>
        <AppText variant="body" color={value ? theme.colors.text : theme.colors.textMuted}>
          {formatDate(value, placeholder)}
        </AppText>
      </Pressable>

      {Platform.OS === 'android' && isOpen ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      ) : null}

      {Platform.OS === 'ios' ? (
        <Modal visible={isOpen} transparent animationType="none" onRequestClose={closePicker}>
          <View style={styles.modalRoot}>
            <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
              <Pressable style={StyleSheet.absoluteFill} onPress={closePicker} />
            </Animated.View>

            <Animated.View
              style={[
                styles.sheet,
                {
                  transform: [{ translateY: sheetTranslateY }],
                },
              ]}
            >
              <View style={styles.sheetHeader}>
                <AppText variant="subtitle">Select deadline</AppText>

                <Pressable onPress={closePicker}>
                  <AppText variant="body" color={theme.colors.textMuted}>
                    Cancel
                  </AppText>
                </Pressable>
              </View>

              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleChange}
                textColor={theme.colors.text}
              />

              <AppButton onPress={confirmDate}>Done</AppButton>
            </Animated.View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: theme.spacing.xs,
  },

  input: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    justifyContent: 'center',
  },

  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 6, 23, 0.72)',
  },

  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },

  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
