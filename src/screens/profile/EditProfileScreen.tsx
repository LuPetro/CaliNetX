// src/screens/profile/EditProfileScreen.tsx
import React, { useState, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  Keyboard, TextInput as RNTextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Text, 
  TextInput, 
  Button, 
  Avatar, 
  HelperText 
} from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { ProfileUpdateData } from '../../services/supabase';
import { isValidUsername } from '../../utils/validators';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../../theme';

// Typdefinitionen
type ProfileStackParamList = {
  ProfileHome: undefined;
  EditProfile: undefined;
};

type EditProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  // Hooks und State
  const { user, updateProfile } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const bioInputRef = useRef<RNTextInput>(null);
  
  // Formulardaten
  const [username, setUsername] = useState(user?.profile?.username || '');
  const [displayName, setDisplayName] = useState(user?.profile?.display_name || '');
  const [bio, setBio] = useState(user?.profile?.bio || '');
  
  // UI-Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usernameError, setUsernameError] = useState('');
  
  // Validation functions
  const validateUsername = (value: string) => {
    if (!value) {
      setUsernameError('Benutzername ist erforderlich');
      return false;
    }
    
    if (!isValidUsername(value)) {
      setUsernameError('Benutzername muss zwischen 3 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten');
      return false;
    }
    
    setUsernameError('');
    return true;
  };
  
  // Event handlers
  const handleSave = async () => {
    // Validierung
    if (!validateUsername(username)) {
      return;
    }
    
    if (!user?.id) {
      setErrorMessage('Benutzer nicht gefunden');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const updateData: ProfileUpdateData = {
        username,
        display_name: displayName,
        bio,
      };
      
      await updateProfile(updateData);
      
      // Erfolgreiche Aktualisierung
      Alert.alert(
        'Erfolg',
        'Dein Profil wurde erfolgreich aktualisiert.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Profils:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Ein Fehler ist aufgetreten');
      } else {
        setErrorMessage('Ein unbekannter Fehler ist aufgetreten');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // UI Rendering
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 20}
      >
        <ScrollView 
          ref={scrollViewRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          <View style={styles.header}>
            <Avatar.Image 
              size={80} 
              source={{ uri: user?.profile?.avatar_url || 'https://via.placeholder.com/80' }} 
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.profile?.display_name || user?.profile?.username}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
          
          {errorMessage ? (
            <HelperText type="error" visible={!!errorMessage} style={styles.errorText}>
              {errorMessage}
            </HelperText>
          ) : null}
          
          <View style={styles.form}>
            <TextInput
              label="Benutzername"
              value={username}
              onChangeText={setUsername}
              onBlur={() => validateUsername(username)}
              style={styles.input}
              mode="outlined"
              error={!!usernameError}
            />
            {usernameError ? (
              <HelperText type="error" visible={!!usernameError}>
                {usernameError}
              </HelperText>
            ) : null}
            
            <TextInput
              label="Anzeigename"
              value={displayName}
              onChangeText={setDisplayName}
              style={styles.input}
              mode="outlined"
            />
            
            <TextInput
              label="Biografie"
              value={bio}
              onChangeText={setBio}
              style={styles.textArea}
              mode="outlined"
              multiline
              numberOfLines={4}
              blurOnSubmit={true}
              onSubmitEditing={() => Keyboard.dismiss()}
              ref={bioInputRef}
              onFocus={() => {
                // Einmaliges Scrollen zum Ende, wenn Bio fokussiert wird
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }}
            />
            
            <View style={styles.buttonContainer}>
              <Button 
                mode="outlined" 
                onPress={() => navigation.goBack()} 
                style={styles.cancelButton}
              >
                Abbrechen
              </Button>
              <Button 
                mode="contained" 
                onPress={handleSave} 
                style={styles.saveButton}
                loading={isLoading}
                disabled={isLoading}
              >
                Speichern
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 120, // Extra Platz am Ende für eine bessere Tastatur-Erfahrung
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  avatar: {
    marginBottom: theme.spacing.s,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  email: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  form: {
    padding: theme.spacing.m,
  },
  input: {
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  textArea: {
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    minHeight: 100,
    maxHeight: 200,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
    paddingBottom: Platform.OS === 'ios' ? theme.spacing.xl : theme.spacing.m,
  },
  cancelButton: {
    flex: 1,
    marginRight: theme.spacing.s,
  },
  saveButton: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
  errorText: {
    marginHorizontal: theme.spacing.m,
    marginTop: theme.spacing.s,
  },
});

export default EditProfileScreen;