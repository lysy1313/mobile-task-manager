import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';
import { StyleSheet, View } from 'react-native';

export function TaskMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaRow}>
      <AppText variant="caption" color={theme.colors.textMuted} style={styles.metaLabel}>
        {label}
      </AppText>

      <AppText
        variant="caption"
        color={theme.colors.textMuted}
        style={styles.metaValue}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },

  metaLabel: {
    width: 64,
  },

  metaValue: {
    flex: 1,
  },
});
