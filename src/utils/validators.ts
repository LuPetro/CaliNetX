// src/utils/validators.ts

// Email validation
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password validation - minimum 8 characters, at least one letter and one number
  export const isValidPassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Username validation - alphanumeric, 3-20 characters
  export const isValidUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };
  
  // Form error messages
  export const getFormErrorMessage = (type: string, field: string): string => {
    switch (type) {
      case 'required':
        return `${field} ist erforderlich.`;
      case 'email':
        return 'Bitte gib eine gültige E-Mail-Adresse ein.';
      case 'password':
        return 'Passwort muss mindestens 8 Zeichen lang sein und mindestens einen Buchstaben und eine Zahl enthalten.';
      case 'username':
        return 'Benutzername muss zwischen 3 und 20 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten.';
      case 'match':
        return 'Passwörter stimmen nicht überein.';
      default:
        return 'Ungültige Eingabe.';
    }
  };