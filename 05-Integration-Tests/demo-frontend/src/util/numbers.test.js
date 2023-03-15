import { describe, expect, it } from 'vitest';

import { cleanNumbers, transformToNumber } from './numbers';

describe('transformNumber()', () => {
  it('should transform a string number to a number of type number', () => {
    const input = '1';
    const expectedResult = parseInt(input);

    const result = transformToNumber(input);

    expect(result).toBeTypeOf('number');
    expect(result).toBe(expectedResult);
  });

  it('should yield NaN for non-transformable values', () => {
    const input1 = 'invalid';
    const input2 = {};

    const result1 = transformToNumber(input1);
    const result2 = transformToNumber(input2);

    expect(result1).toBeNaN();
    expect(result2).toBeNaN();
  });
});

describe('cleanNumbers()', () => {
  // This can be called an 'Integration Test'
  it('should return an array of number values if an array of string number valuesis provided', () => {
    const numberValues = ['1', '2'];

    const cleanedNumbers = cleanNumbers(numberValues);

    expect(cleanedNumbers[0]).toBeTypeOf('number');
  });
});
