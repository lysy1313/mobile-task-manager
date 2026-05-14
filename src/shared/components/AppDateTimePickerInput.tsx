import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useRef, useState } from 'react';
import { Animated, Modal, Platform, Pressable, StyleSheet, View } from 'react-native';

import { theme } from '@/src/shared/config/theme';
import { AppButton } from './AppButton';
import { AppText } from './AppText';

type DateTimePickerMode = 'date' | 'time';

type AppDateTimePickerInputProps = {
  label?: string;
  title: string;
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder: string;
  mode: DateTimePickerMode;
  error?: string;
  formatValue: (date: Date | null, placeholder: string) => string;
};

export function AppDateTimePickerInput({
  label,
  title,
  value,
  onChange,
  placeholder,
  mode,
  error,
  formatValue,
}: AppDateTimePickerInputProps) {
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

  function confirmValue() {
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

      <Pressable style={[styles.input, error && styles.inputError]} onPress={openPicker}>
        <AppText variant="body" color={value ? theme.colors.text : theme.colors.textMuted}>
          {formatValue(value, placeholder)}
        </AppText>
      </Pressable>

      {error ? (
        <AppText variant="caption" color={theme.colors.danger}>
          {error}
        </AppText>
      ) : null}

      {Platform.OS === 'android' && isOpen ? (
        <DateTimePicker
          value={value ?? new Date()}
          mode={mode}
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
                <AppText variant="subtitle">{title}</AppText>

                <Pressable onPress={closePicker}>
                  <AppText variant="body" color={theme.colors.textMuted}>
                    Cancel
                  </AppText>
                </Pressable>
              </View>

              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={handleChange}
                textColor={theme.colors.text}
              />

              <AppButton onPress={confirmValue}>Done</AppButton>
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

  inputError: {
    borderColor: theme.colors.danger,
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
  },

  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
