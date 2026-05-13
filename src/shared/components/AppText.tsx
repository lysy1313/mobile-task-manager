import { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { theme } from '../config/theme';

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption';

type AppTextProps = {
  children: ReactNode;
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function AppText({ children, variant = 'body', color, style }: AppTextProps) {
  return (
    <Text style={[styles.base, styles[variant], color ? { color } : null, style]}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  base: {
    color: theme.colors.text,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.textMuted,
  },
});
