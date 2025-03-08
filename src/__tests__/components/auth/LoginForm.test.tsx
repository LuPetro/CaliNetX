// src/__tests__/components/auth/LoginForm.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from '../../../components/auth/LoginForm';
import { useAuth } from '../../../hooks/useAuth';

// Mock des useAuth Hooks
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('LoginForm', () => {
  const mockLogin = jest.fn();
  const mockOnRegisterPress = jest.fn();

  beforeEach(() => {
    // Mock für den useAuth Hook setzen
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onRegisterPress={mockOnRegisterPress} />
    );

    expect(getByText('Willkommen zurück!')).toBeTruthy();
    expect(getByText('Anmelden')).toBeTruthy();
    expect(getByText('Jetzt registrieren')).toBeTruthy();
  });

  it('shows error for invalid email', async () => {
    const { getByText, getByPlaceholderText, findByText } = render(
      <LoginForm onRegisterPress={mockOnRegisterPress} />
    );

    // Ungültige E-Mail eingeben
    fireEvent.changeText(getByPlaceholderText('E-Mail'), 'invalid-email');
    
    // Passwort eingeben
    fireEvent.changeText(getByPlaceholderText('Passwort'), 'password123');
    
    // Login-Button drücken
    fireEvent.press(getByText('Anmelden'));

    // Fehler sollte angezeigt werden
    const errorMessage = await findByText('Bitte gib eine gültige E-Mail-Adresse ein.');
    expect(errorMessage).toBeTruthy();
    
    // Login-Funktion sollte nicht aufgerufen worden sein
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login function with valid credentials', async () => {
    const { getByText, getByPlaceholderText } = render(
      <LoginForm onRegisterPress={mockOnRegisterPress} />
    );

    // Gültige E-Mail und Passwort eingeben
    fireEvent.changeText(getByPlaceholderText('E-Mail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Passwort'), 'Password123');
    
    // Login-Button drücken
    fireEvent.press(getByText('Anmelden'));

    // Prüfen, ob die Login-Funktion aufgerufen wurde
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'Password123');
    });
  });

  it('navigates to register screen when register is pressed', () => {
    const { getByText } = render(
      <LoginForm onRegisterPress={mockOnRegisterPress} />
    );

    // Auf "Jetzt registrieren" klicken
    fireEvent.press(getByText('Jetzt registrieren'));
    
    // Prüfen, ob die Navigation-Funktion aufgerufen wurde
    expect(mockOnRegisterPress).toHaveBeenCalled();
  });
});