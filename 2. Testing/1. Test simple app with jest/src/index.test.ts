import { describe, expect, test } from '@jest/globals';
import { add } from './index';


describe('test sum function', () => {
    test('add 2 + 3 should return 5', () => {
        expect(add(2,3)).toBe(5)
    })
})