import { promises as fs } from 'fs';
import { it, expect, vi } from 'vitest';

import writeData from './io';

vi.mock('fs');

it('should execute the writeFile method', () => {
  const testData = 'Test';
  const testFilename = 'test.txt';

  writeData(testData, testFilename);

  expect(fs.writeFile).toBeCalled();
});
