import { expect, test } from 'vitest';
import { getRandomId } from '../getRandomId';

test('getRandomId should return a string of 7 characters', () => {
  const id = getRandomId();

  expect(id).toBeTypeOf('string');
  expect(id).toHaveLength(7);
});
