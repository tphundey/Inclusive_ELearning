"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = exports.cleanUrl = exports.hashRE = exports.queryRE = exports.createDebugger = void 0;
/**
 * modified from vitejs source code, just to make the console output looks vite-like
 */
const debug_1 = __importDefault(require("debug"));
function createDebugger(ns) {
    const log = (0, debug_1.default)(ns);
    return (msg, ...args) => {
        log(msg, ...args);
    };
}
exports.createDebugger = createDebugger;
exports.queryRE = /\?.*$/;
exports.hashRE = /#.*$/;
const cleanUrl = (url) => url.replace(exports.hashRE, '').replace(exports.queryRE, '');
exports.cleanUrl = cleanUrl;
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
exports.isObject = isObject;
function mergeDeep(target, source) {
    const output = Object.assign({}, target);
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
            // @ts-expect-error access unknow property
            if (isObject(source[key])) {
                if (!(key in target)) {
                    // @ts-expect-error access unknow property
                    Object.assign(output, { [key]: source[key] });
                }
                else {
                    // @ts-expect-error access unknow property
                    output[key] = mergeDeep(target[key], source[key]);
                }
            }
            else {
                // @ts-expect-error access unknow property
                Object.assign(output, { [key]: source[key] });
            }
        });
    }
    return output;
}
exports.default = mergeDeep;
//# sourceMappingURL=utils.js.map