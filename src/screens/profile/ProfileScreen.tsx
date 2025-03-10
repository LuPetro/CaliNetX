// src/screens/profile/ProfileScreen.tsx
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Avatar, Card, Divider } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import theme from '../../theme';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Hier könnte man einen Toast oder eine andere Benachrichtigung anzeigen
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Image 
          size={80} 
          source={{ uri: user?.profile?.avatar_url || 'https://via.placeholder.com/80' }} 
        />
        <Text style={styles.username}>{user?.profile?.display_name || user?.profile?.username || 'Benutzer'}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Profilinformationen</Text>
          <Divider style={styles.divider} />
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Level:</Text>
            <Text style={styles.infoValue}>{user?.profile?.level || 'Beginner'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Workouts:</Text>
            <Text style={styles.infoValue}>{user?.profile?.workout_count || '0'}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Streak:</Text>
            <Text style={styles.infoValue}>{user?.profile?.streak_count || '0'} Tage</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bio:</Text>
            <Text style={styles.infoValue}>{user?.profile?.bio || 'Keine Biografie vorhanden'}</Text>
          </View>
        </Card.Content>
      </Card>

      <Button 
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}
      >
        Ausloggen
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: theme.spacing.m,
    color: theme.colors.primary,
  },
  email: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  card: {
    margin: theme.spacing.m,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  divider: {
    marginBottom: theme.spacing.m,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.s,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  infoValue: {
    color: theme.colors.text,
    flex: 1,
    textAlign: 'right',
  },
  logoutButton: {
    margin: theme.spacing.m,
    backgroundColor: theme.colors.error,
  },
});

export default ProfileScreen;