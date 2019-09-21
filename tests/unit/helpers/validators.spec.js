import * as validators from '@/helpers/validators';

describe('Validators', () => {
  describe('isEmpty', () => {
    it('1', () => {
      expect(validators.isEmpty('1')).toBe(false);
    });

    it('0', () => {
      expect(validators.isEmpty(0)).toBe(false);
    });

    it('empty string', () => {
      expect(validators.isEmpty('')).toBe(true);
    });

    it('undefined', () => {
      expect(validators.isEmpty(undefined)).toBe(true);
    });

    it('null', () => {
      expect(validators.isEmpty(null)).toBe(true);
    });
  });

  describe('isNotEmpty', () => {
    it('1', () => {
      expect(validators.isNotEmpty('1')).toBe(true);
    });

    it('0', () => {
      expect(validators.isNotEmpty(0)).toBe(true);
    });

    it('empty string', () => {
      expect(validators.isNotEmpty('')).toBe(false);
    });

    it('undefined', () => {
      expect(validators.isNotEmpty(undefined)).toBe(false);
    });

    it('null', () => {
      expect(validators.isNotEmpty(null)).toBe(false);
    });
  });

  describe('isTel', () => {
    it('1', () => {
      expect(validators.isTel('1')).toBe(false);
    });

    it('090-1234-567', () => {
      expect(validators.isTel('090-1234-567')).toBe(false);
    });

    it('090-123-5678', () => {
      expect(validators.isTel('090-123-5678')).toBe(false);
    });

    it('09012345678', () => {
      expect(validators.isTel('09012345678')).toBe(true);
    });

    it('090-1234-5678', () => {
      expect(validators.isTel('090-1234-5678')).toBe(true);
    });

    it('0312345678', () => {
      expect(validators.isTel('0312345678')).toBe(true);
    });

    it('03-1234-5678', () => {
      expect(validators.isTel('03-1234-5678')).toBe(true);
    });
  });

  describe('isDate', () => {
    it('2019-1-1-1', () => {
      console.warn = jest.fn(); // warning skip
      expect(validators.isDate('2019-1-1-1')).toBe(false);
    });

    it('2019-13-01', () => {
      expect(validators.isDate('2019-13-01')).toBe(false);
    });

    it('2019-01-32', () => {
      expect(validators.isDate('2019-01-32')).toBe(false);
    });

    it('2019-02-29', () => {
      expect(validators.isDate('2019-02-29')).toBe(false);
    });

    it('2019-07-17', () => {
      expect(validators.isDate('2019-07-17')).toBe(true);
    });
  });
});
