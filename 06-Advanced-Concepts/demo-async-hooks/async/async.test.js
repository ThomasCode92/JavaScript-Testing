import { expect, it } from 'vitest';

import { generateToken } from './async';

it('should generate a token value', () => {
  const testUserEmail = 'test@test.com';

  generateToken(testUserEmail, (err, token) => {
    // expect(token).toBeDefined();
    expect(token).toBe(2);
  });
});
