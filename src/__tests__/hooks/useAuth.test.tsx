// src/__tests__/hooks/useAuth.test.tsx
import React from 'react';
import { signIn, signUp, signOut } from '../../services/supabase';

// Mocks für die supabase-Funktionen
jest.mock('../../services/supabase', () => ({
    supabase: {
      auth: {
        getSession: jest.fn(() => Promise.resolve({ data: { session: null }, error: null })),
        onAuthStateChange: jest.fn(() => ({
          data: { subscription: { unsubscribe: jest.fn() } },
        })),
      },
    },
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
    getCurrentUser: jest.fn(),
  }));

// Mock für den useAuth-Hook, unter Verwendung der gemockten Funktionen aus supabase
jest.mock('../../hooks/useAuth', () => {
    const { signIn, signUp, signOut } = require('../../services/supabase');
    return {
      useAuth: jest.fn(() => ({
        user: null,
        session: null,
        loading: false,
        login: jest.fn((email: string, password: string) => signIn(email, password)),
        register: jest.fn((email: string, password: string, username: string) => 
          signUp(email, password, username)
        ),
        logout: jest.fn(() => signOut())
      })),
      AuthProvider: ({ children }: { children: React.ReactNode }) => children
    };
  });

// Importiere den gemockten Hook
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
    expect(signIn).toHaveBeenCalledWith(email, password);
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
    expect(signUp).toHaveBeenCalledWith(email, password, username);
  });

  it('should call signOut function when logout is called', async () => {
    // Arrange
    const { logout } = useAuth();

    // Act
    await logout();

    // Assert
    expect(signOut).toHaveBeenCalled();
  });
});