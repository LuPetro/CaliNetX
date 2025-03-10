// src/screens/profile/EditProfileScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Button, Avatar, HelperText } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { ProfileUpdateData } from '../../services/supabase';
import { isValidUsername } from '../../utils/validators';
import { StackNavigationProp } from '@react-navigation/stack';
import theme from '../../theme';

type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

type EditProfileScreenProps = {
  navigation: StackNavigationProp<ProfileStackParamList, 'EditProfile'>;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  
  const [username, setUsername] = useState(user?.profile?.username || '');
  const [displayName, setDisplayName] = useState(user?.profile?.display_name || '');
  const [bio, setBio] = useState(user?.profile?.bio || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Validierungsstatus
  const [usernameError, setUsernameError] = useState('');
  
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
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Avatar.Image 
            size={100} 
            source={{ uri: user?.profile?.avatar_url || 'https://via.placeholder.com/100' }} 
          />
          <View style={styles.editAvatarBadge}>
            <MaterialCommunityIcons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
        <Text style={styles.changePhotoText}>Profilbild ändern</Text>
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
    paddingBottom: 40, // Extra Platz am Ende für eine bessere Tastatur-Erfahrung
  },
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.disabled,
  },
  avatarContainer: {
    position: 'relative',
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.surface,
  },
  changePhotoText: {
    marginTop: theme.spacing.s,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  form: {
    padding: theme.spacing.m,
  },
  input: {
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  textArea: {
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.surface,
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.m,
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