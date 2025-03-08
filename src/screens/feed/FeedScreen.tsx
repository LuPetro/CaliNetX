// src/screens/feed/FeedScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import theme from '../../theme';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed</Text>
      <Text>Hier wird der Community-Feed angezeigt.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: theme.colors.primary,
  },
});

export default FeedScreen;