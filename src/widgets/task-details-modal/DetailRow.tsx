import { StyleSheet, View } from 'react-native';

import { AppText } from '@/src/shared/components';
import { theme } from '@/src/shared/config/theme';

type DetailRowProps = {
  label: string;
  value: string;
};

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <AppText variant="caption" color={theme.colors.textMuted}>
        {label}
      </AppText>

      <AppText variant="body">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  detailRow: {
    gap: theme.spacing.xs,
  },
});
