import { expect, it, vi } from 'vitest';

import { sendDataRequest } from './http';

const testResponseData = { testKey: 'testData' };

const testFetch = vi.fn((url, option) => {
  return new Promise((resolve, reject) => {
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };
    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

it('should return any available response data', () => {
  const testData = { key: 'test' };

  expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
});
