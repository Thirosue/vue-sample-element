import { staffApi } from '@/module/Api';
import mockFetch from '../../mockFetch'; 

const result = require('./mock/result.json');

describe('Api', () => {
  beforeEach(() => {
    window.fetch = mockFetch(result);
  });

  describe('staffApi', () => {
    it('findAll', async () => {
      const response = await staffApi.findAll();
      console.log(response);
      expect(response.count).toBe(1);
    });
  });
});