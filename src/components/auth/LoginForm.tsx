// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail } from '../../utils/validators';
import theme from '../../theme';

type LoginFormProps = {
  onRegisterPress: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onRegisterPress }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Validate form
    if (!email || !password) {
      setErrorMessage('Bitte fülle alle Felder aus.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }

    // Reset error message and set loading state
    setErrorMessage('');
    setIsLoading(true);

    try {
      // Attempt to login
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
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
      <Text style={styles.title}>Willkommen zurück!</Text>
      <Text style={styles.subtitle}>Melde dich an, um deine Calisthenics-Reise fortzusetzen.</Text>

      {errorMessage ? (
        <HelperText type="error" visible={!!errorMessage} style={styles.errorText}>
          {errorMessage}
        </HelperText>
      ) : null}

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

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        loading={isLoading}
        disabled={isLoading}
      >
        Anmelden
      </Button>

      <View style={styles.registerContainer}>
        <Text>Noch kein Konto?</Text>
        <TouchableOpacity onPress={onRegisterPress}>
          <Text style={styles.registerText}>Jetzt registrieren</Text>
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
    gap: theme.spacing.xs,
  },
  registerText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default LoginForm;