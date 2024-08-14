"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const _1 = require(".");
(0, globals_1.describe)('test sum function', () => {
    (0, globals_1.it)('add 2 + 3 should return 5', () => {
        (0, globals_1.expect)((0, _1.add)(2, 3)).toBe(5);
    });
});
