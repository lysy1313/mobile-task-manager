import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type AppTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function AppTextInput({
  label,
  error,
  multiline = false,
  style,
  ...props
}: AppTextInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? (
        <AppText variant="caption" color={theme.colors.textMuted}>
          {label}
        </AppText>
      ) : null}

      <TextInput
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        placeholderTextColor={theme.colors.textMuted}
        style={[styles.input, multiline && styles.textarea, error && styles.inputError, style]}
        {...props}
      />

      {error ? (
        <AppText variant="caption" color={theme.colors.danger}>
          {error}
        </AppText>
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
    color: theme.colors.text,
    fontSize: 16,
  },

  textarea: {
    minHeight: 120,
    paddingTop: theme.spacing.md,
  },

  inputError: {
    borderColor: theme.colors.danger,
  },
});
