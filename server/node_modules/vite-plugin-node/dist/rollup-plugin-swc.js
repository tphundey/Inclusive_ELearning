"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupPluginSwc = void 0;
const pluginutils_1 = require("@rollup/pluginutils");
const utils_1 = require("./utils");
function RollupPluginSwc(options) {
    let swc;
    // todo: load swc/tsconfig from config files
    const config = {
        // options from swc config
        ...options,
    };
    const filter = (0, pluginutils_1.createFilter)(/\.(tsx?|jsx)$/, /\.js$/);
    return {
        name: 'rollup-plugin-swc',
        async transform(code, id) {
            if (filter(id) || filter((0, utils_1.cleanUrl)(id))) {
                if (!swc)
                    swc = await Promise.resolve().then(() => __importStar(require('@swc/core')));
                const result = await swc.transform(code, {
                    ...config,
                    filename: id,
                });
                return {
                    code: result.code,
                    map: result.map,
                };
            }
        },
    };
}
exports.RollupPluginSwc = RollupPluginSwc;
//# sourceMappingURL=rollup-plugin-swc.js.map