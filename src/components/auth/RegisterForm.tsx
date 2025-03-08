// src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail, isValidPassword, isValidUsername } from '../../utils/validators';
import theme from '../../theme';

type RegisterFormProps = {
  onLoginPress: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onLoginPress }) => {
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    // Validate form
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Bitte fülle alle Felder aus.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    if (!isValidUsername(username)) {
      setErrorMessage('Benutzername muss zwischen 3 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten.');
      return;
    }

    if (!isValidPassword(password)) {
      setErrorMessage('Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Die Passwörter stimmen nicht überein.');
      return;
    }

    // Reset error message and set loading state
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Attempt to register
      await register(email, password, username);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      } else {
        setErrorMessage('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erstelle dein Konto</Text>
      <Text style={styles.subtitle}>Werde Teil der Calisthenics-Community und beginne deine Fitness-Reise.</Text>

      {errorMessage ? (
        <HelperText type="error" visible={!!errorMessage} style={styles.errorText}>
          {errorMessage}
        </HelperText>
      ) : null}

      <TextInput
        label="Benutzername"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        mode="outlined"
      />

      <TextInput
        label="E-Mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
      />

      <TextInput
        label="Passwort"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
        mode="outlined"
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />

      <TextInput
        label="Passwort bestätigen"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showPassword}
        style={styles.input}
        mode="outlined"
      />

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
      >
        Registrieren
      </Button>

      <View style={styles.loginContainer}>
        <Text>Bereits ein Konto?</Text>
        <TouchableOpacity onPress={onLoginPress}>
          <Text style={styles.loginText}>Jetzt anmelden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.m,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: theme.spacing.s,
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: theme.spacing.l,
    color: theme.colors.text,
  },
  input: {
    marginBottom: theme.spacing.m,
    backgroundColor: theme.colors.surface,
  },
  button: {
    marginTop: theme.spacing.s,
    paddingVertical: theme.spacing.s,
  },
  errorText: {
    marginBottom: theme.spacing.s,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
    gap: theme.spacing.xs,
  },
  loginText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default RegisterForm;