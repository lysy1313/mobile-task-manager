import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { theme } from '@/src/shared/config/theme';
import { AppText } from './AppText';

type AppLoaderProps = {
  text?: string;
  fullHeight?: boolean;
};

export function AppLoader({ text = 'Loading...', fullHeight = false }: AppLoaderProps) {
  return (
    <View style={[styles.wrapper, fullHeight && styles.fullHeight]}>
      <ActivityIndicator size="large" color={theme.colors.primary} />

      {text ? (
        <AppText variant="body" color={theme.colors.textMuted}>
          {text}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.xl,
  },

  fullHeight: {
    flex: 1,
  },
});
