import { describe, it, expect } from 'vitest';
import { humanizeDuration } from '../index.js';

describe('humanizeDuration', () => {
  describe('valid inputs', () => {
    it('should return "0ms" for 0ms', () => {
      expect(humanizeDuration(0)).toBe('0ms');
    });

    it('should handle single millisecond unit', () => {
      expect(humanizeDuration(500)).toBe('500ms');
    });

    it('should handle single second unit', () => {
      expect(humanizeDuration(1500)).toBe('1s 500ms');
    });

    it('should handle exact minute boundary', () => {
      expect(humanizeDuration(60000)).toBe('1m');
    });

    it('should handle multiple units (hours, minutes, seconds)', () => {
      expect(humanizeDuration(3661000)).toBe('1h 1m 1s');
    });

    it('should handle large values with years and months', () => {
      expect(humanizeDuration(34128000000)).toBe('1y 1mo');
    });

    it('should handle negative values with negative sign', () => {
      expect(humanizeDuration(-3661000)).toBe('-1h 1m 1s');
    });

    it('should handle maximum precision with all units', () => {
      const ms = 31536000000 + 2592000000 + 86400000 + 3600000 + 60000 + 1000 + 123;
      expect(humanizeDuration(ms)).toBe('1y 1mo 1d 1h 1m 1s 123ms');
    });

    it('should handle values between units correctly', () => {
      const ms = 2592000000 + 43200000; // 1mo (30d) + 12h
      expect(humanizeDuration(ms)).toBe('1mo 12h');
    });
  });

  describe('invalid inputs', () => {
    it('should throw TypeError for non-number input', () => {
      expect(() => humanizeDuration('1000' as any)).toThrow(TypeError);
      expect(() => humanizeDuration(null as any)).toThrow(TypeError);
      expect(() => humanizeDuration({} as any)).toThrow(TypeError);
    });

    it('should throw TypeError for NaN', () => {
      expect(() => humanizeDuration(NaN)).toThrow(TypeError);
    });

    it('should throw TypeError for Infinity', () => {
      expect(() => humanizeDuration(Infinity)).toThrow(TypeError);
      expect(() => humanizeDuration(-Infinity)).toThrow(TypeError);
    });
  });
});