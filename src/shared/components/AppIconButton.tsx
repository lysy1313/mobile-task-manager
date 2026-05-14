import { Pressable, StyleSheet, ViewStyle } from 'react-native';

import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type AppIconButtonProps = {
  icon: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function AppIconButton({ icon, onPress, style }: AppIconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <AppText variant="subtitle" style={styles.icon}>
        {icon}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
  icon: {
    lineHeight: 24,
  },
});
