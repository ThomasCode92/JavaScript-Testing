import { expect, it } from 'vitest';

import { generateToken } from './async';

it('should generate a token value', () =>
  new Promise((resolve, reject) => {
    const testUserEmail = 'test@test.com';

    generateToken(testUserEmail, (err, token) => {
      try {
        expect(token).toBeDefined();
        // expect(token).toBe(2);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }));
