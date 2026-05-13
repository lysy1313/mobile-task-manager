import { StyleSheet, View } from 'react-native';

import { AppButton, AppText, Card, Screen } from '@/src/shared/components';
import { theme } from '../src/shared/config/theme';

export default function HomeScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <AppText variant="title">Task Manager</AppText>
      </View>

      <Card style={styles.card}>
        <AppText variant="subtitle">Пока здесь пусто</AppText>

        <AppText variant="body" color={theme.colors.textMuted} style={styles.cardText}>
          На следующем шаге создадим сущность Task и первую карточку задачи.
        </AppText>

        <AppButton onPress={() => console.log('Create task pressed')}>Добавить задачу</AppButton>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.xl,
  },
  card: {
    gap: theme.spacing.md,
  },
  cardText: {
    marginBottom: theme.spacing.sm,
  },
});
