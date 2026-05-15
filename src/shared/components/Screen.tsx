import { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { theme } from '@/src/shared/config/theme';

type ScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  withPadding?: boolean;
  backgroundColor?: string;
};

export function Screen({
  children,
  style,
  withPadding = true,
  backgroundColor = theme.colors.background,
}: ScreenProps) {
  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor }, withPadding && styles.padding, style]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  padding: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
  },
});
