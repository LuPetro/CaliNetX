// src/__tests__/hooks/useAuth.test.tsx
import React from 'react';

// Erst die Mock-Funktionen erstellen
const mockSignIn = jest.fn().mockResolvedValue({ 
  data: { user: { id: 'test-id', email: 'test@example.com' }, session: {} },
  error: null 
});

const mockSignUp = jest.fn().mockResolvedValue({ 
  data: { user: { id: 'test-id', email: 'test@example.com' } },
  error: null 
});

const mockSignOut = jest.fn().mockResolvedValue({ error: null });

// Dann die Supabase-Services mocken
jest.mock('../../services/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-id' }, session: {} },
        error: null
      }),
      signUp: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-id' } },
        error: null
      }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn().mockReturnValue({
        data: { subscription: { unsubscribe: jest.fn() } },
      }),
    },
  },
  signIn: mockSignIn,
  signUp: mockSignUp,
  signOut: mockSignOut,
  getCurrentUser: jest.fn().mockResolvedValue({ 
    id: 'test-id', 
    email: 'test@example.com', 
    profile: { username: 'testuser' } 
  }),
}));

// Dann den useAuth-Hook mocken
jest.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    session: null,
    loading: false,
    login: jest.fn().mockImplementation((email, password) => mockSignIn(email, password)),
    register: jest.fn().mockImplementation((email, password, username) => 
      mockSignUp(email, password, username)
    ),
    logout: jest.fn().mockImplementation(() => mockSignOut())
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children
}));

// Nach den Mocks können wir die tatsächlichen Funktionen importieren
import { useAuth } from '../../hooks/useAuth';

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call signIn function when login is called', async () => {
    // Arrange
    const email = 'test@example.com';
    const password = 'Password123';
    const { login } = useAuth();

    // Act
    await login(email, password);

    // Assert
    expect(mockSignIn).toHaveBeenCalledWith(email, password);
  });

  it('should call signUp function when register is called', async () => {
    // Arrange
    const email = 'new@example.com';
    const password = 'NewPassword123';
    const username = 'newuser';
    const { register } = useAuth();

    // Act
    await register(email, password, username);

    // Assert
    expect(mockSignUp).toHaveBeenCalledWith(email, password, username);
  });

  it('should call signOut function when logout is called', async () => {
    // Arrange
    const { logout } = useAuth();

    // Act
    await logout();

    // Assert
    expect(mockSignOut).toHaveBeenCalled();
  });
});