import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle conditional classes', () => {
    expect(cn('px-4', true && 'py-2', false && 'bg-red-500')).toBe('px-4 py-2');
  });

  it('should merge conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2');
  });

  it('should handle arrays and objects', () => {
    expect(cn(['px-4', 'py-2'], { 'bg-blue-500': true, 'bg-red-500': false })).toBe('px-4 py-2 bg-blue-500');
  });

  it('should handle undefined and null values', () => {
    expect(cn('px-4', undefined, null, 'py-2')).toBe('px-4 py-2');
  });
});