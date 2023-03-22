import path from 'path';
import fs from 'fs';

import { it, vi, expect } from 'vitest';
import { Window } from 'happy-dom';

import { showError } from './dom';

const htmlDocPath = path.join(process.cwd(), 'index.html');
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window();
const document = window.document;

document.write(htmlDocContent);

vi.stubGlobal('document', document);

it('should add an error paragraph to the id="error" element', () => {
  showError('test');

  const errorEl = document.getElementById('errors');
  const errorParagraph = errorEl.firstElementChild;

  expect(errorParagraph).not.toBeNull();
});
