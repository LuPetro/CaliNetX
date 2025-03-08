// src/theme/index.ts
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4E92DF',      // Blau - Hauptfarbe
    secondary: '#30CE88',    // Grün - Sekundärfarbe
    accent: '#FF6B6B',       // Rot - Akzentfarbe
    background: '#F5F7FA',   // Hellgrau - Hintergrund
    surface: '#FFFFFF',      // Weiß - Oberflächen
    text: '#333333',         // Dunkelgrau - Text
    disabled: '#BDBDBD',     // Grau - Deaktiviert
    placeholder: '#9E9E9E',  // Mittelgrau - Platzhalter
    backdrop: 'rgba(0, 0, 0, 0.5)', // Halbdurchsichtiges Schwarz - Hintergrund für Modals
    notification: '#FF6B6B', // Rot - Benachrichtigungen
    error: '#FF5252',        // Rot - Fehler
    success: '#4CAF50',      // Grün - Erfolg
    info: '#2196F3',         // Blau - Info
    warning: '#FFC107',      // Gelb - Warnung
  },
  // Typografie
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  // Spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  // Radius
  roundness: 8,
};

// Typography scale
export const typography = {
  h1: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 18,
  },
  caption: {
    fontSize: 11,
    lineHeight: 16,
  },
};

export default theme;