import { toBoolean } from '../../src';

describe('Result.ts unit tests', () => {
  it('should return false if value is undefined', () => {
    expect(toBoolean(undefined)).toBeFalsy()
  });
  it('should return false if value is null', () => {
    expect(toBoolean(null)).toBeFalsy()
  });
  it('should return false if value is an empty string', () => {
    expect(toBoolean('')).toBeFalsy()
  });
  it('should return false if value is 0 (number)', () => {
    expect(toBoolean(0)).toBeFalsy()
  });
  it('should return false if value is false (boolean)', () => {
    expect(toBoolean(false)).toBeFalsy()
  });
  it('should return true if value is an object', () => {
    expect(toBoolean(Object.assign({}, {}))).toBeTruthy()
  });
  it('should return true if value is non-empty string', () => {
    expect(toBoolean('Something')).toBeTruthy()
  });
  it('should return true if value is non-zero number', () => {
    expect(toBoolean(30000)).toBeTruthy()
  });
  it('should return true if value is true (boolean)', () => {
    expect(toBoolean(30000)).toBeTruthy()
  });
});