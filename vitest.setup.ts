/// <reference types="@vitest/browser/matchers" />
/// <reference types="@vitest/browser/providers/playwright" />

import { defineCustomElements } from './loader/index.js';

defineCustomElements(window);
