// src/__tests__/services/supabase.test.ts
import { supabase, signIn, signUp, signOut, getCurrentUser } from '../../services/supabase';

// Mock für insert außerhalb definieren, um Zugriff im Test zu haben
const mockInsert = jest.fn().mockImplementation(() => Promise.resolve({ error: null }));

// Erstelle korrekten Mock für die Supabase-Instanz
jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({
      auth: {
        signInWithPassword: jest.fn().mockImplementation(() => 
          Promise.resolve({ data: {}, error: null })
        ),
        signUp: jest.fn().mockImplementation(() => 
          Promise.resolve({ data: { user: { id: '123' } }, error: null })
        ),
        signOut: jest.fn().mockImplementation(() => 
          Promise.resolve({ error: null })
        ),
        getUser: jest.fn().mockImplementation(() => 
          Promise.resolve({ data: { user: { id: '123' } }, error: null })
        ),
        getSession: jest.fn()
      },
      from: jest.fn().mockImplementation(() => ({
        select: jest.fn().mockImplementation(() => ({
          eq: jest.fn().mockImplementation(() => ({
            single: jest.fn().mockImplementation(() => 
              Promise.resolve({ data: {}, error: null })
            )
          }))
        })),
        insert: mockInsert // Verwende die gemeinsame mockInsert-Funktion
      }))
    }))
  };
});

describe('Supabase Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should call supabase.auth.signInWithPassword with correct credentials', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'Password123';

      // Act
      await signIn(email, password);

      // Assert
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email,
        password,
      });
    });

    it('should throw an error if authentication fails', async () => {
      // Arrange
      const email = 'test@example.com';
      const password = 'WrongPassword';
      const error = new Error('Invalid login credentials');
      
      // Überschreibe die Mock-Implementierung nur für diesen Test
      jest.spyOn(supabase.auth, 'signInWithPassword').mockImplementation(() =>
        Promise.resolve({ 
          data: { 
            user: null, 
            session: null 
          }, 
          error: error as any  // TypeScript-Cast, um Kompatibilität zu gewährleisten
        })
      );

      // Act & Assert
      await expect(signIn(email, password)).rejects.toThrow('Invalid login credentials');
    });
  });

  describe('signUp', () => {
    it('should call supabase.auth.signUp with correct data', async () => {
      // Arrange
      const email = 'new@example.com';
      const password = 'NewPassword123';
      const username = 'newuser';

      // Act
      await signUp(email, password, username);

      // Assert
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
    });

    it('should create a profile after successful signup', async () => {
      // Arrange
      const email = 'new@example.com';
      const password = 'NewPassword123';
      const username = 'newuser';

      // Act
      await signUp(email, password, username);

      // Assert
      expect(supabase.from).toHaveBeenCalledWith('profiles');
      expect(mockInsert).toHaveBeenCalledWith([{
        id: '123',
        username: 'newuser',
        display_name: 'newuser'
      }])
    });
  });

  describe('signOut', () => {
    it('should call supabase.auth.signOut', async () => {
      // Act
      await signOut();

      // Assert
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('getCurrentUser', () => {
    it('should call supabase.auth.getUser', async () => {
      // Act
      await getCurrentUser();

      // Assert
      expect(supabase.auth.getUser).toHaveBeenCalled();
    });
  });
});