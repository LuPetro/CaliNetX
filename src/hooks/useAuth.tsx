// src/hooks/useAuth.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, getCurrentUser, signIn, signUp, signOut } from '../services/supabase';
import { Session } from '@supabase/supabase-js';

// Define types
type User = {
  id: string;
  email: string;
  profile?: {
    username: string;
    display_name: string;
    avatar_url?: string;
    bio?: string;
    level?: string;
    workout_count?: number;
    streak_count?: number;
  };
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for a session on mount
  useEffect(() => {
    const getSession = async () => {
      setLoading(true);
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          const userData = await getCurrentUser();
          setUser(userData as User);
        }
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Set up a listener for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session) {
          try {
            const userData = await getCurrentUser();
            setUser(userData as User);
          } catch (error) {
            console.error('Error getting user data:', error);
          }
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // Clean up the listener
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await signIn(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (email: string, password: string, username: string) => {
    try {
      await signUp(email, password, username);
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};