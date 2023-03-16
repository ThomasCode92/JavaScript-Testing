import { expect, it } from 'vitest';

import { generateToken, generateTokenPromise } from './async';

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

it('should generate a token value', async () => {
  const testUserEmail = 'test@test.com';

  const token = await generateTokenPromise(testUserEmail);

  // expect(generateTokenPromise(testUserEmail)).resolves.toBeDefined();
  expect(token).toBeDefined();
});
