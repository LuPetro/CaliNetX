// src/__tests__/utils/validators.test.ts
import { isValidEmail, isValidPassword, isValidUsername } from '../../utils/validators';

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('should return true for valid emails', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@example')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should return true for valid passwords', () => {
      expect(isValidPassword('Password1')).toBe(true);
      expect(isValidPassword('Abcdefg1')).toBe(true);
    });

    it('should return false for invalid passwords', () => {
      expect(isValidPassword('pass')).toBe(false); // zu kurz
      expect(isValidPassword('password')).toBe(false); // keine Zahl
      expect(isValidPassword('12345678')).toBe(false); // kein Buchstabe
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('isValidUsername', () => {
    it('should return true for valid usernames', () => {
      expect(isValidUsername('user123')).toBe(true);
      expect(isValidUsername('john_doe')).toBe(true);
    });

    it('should return false for invalid usernames', () => {
      expect(isValidUsername('ab')).toBe(false); // zu kurz
      expect(isValidUsername('user name')).toBe(false); // enthält Leerzeichen
      expect(isValidUsername('user@name')).toBe(false); // unerlaubtes Zeichen
      expect(isValidUsername('')).toBe(false);
    });
  });
});