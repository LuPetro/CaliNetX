// src/screens/profile/ProfileScreen.tsx
// Implementierung des Profilscreens mit Logout-Funktionalität
import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Avatar, Card, Divider, IconButton } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../../theme';

type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
};

type ProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'ProfileHome'>;
};

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <View style={styles.header}>
        <View style={styles.profileEditContainer}>
          <IconButton
            icon="account-edit"
            size={24}
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.editButton}
          />
        </View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  profileEditContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  editButton: {
    margin: theme.spacing.s,
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