export declare function createDebugger(ns: string): (msg: string, ...args: any[]) => void;
export declare const queryRE: RegExp;
export declare const hashRE: RegExp;
export declare const cleanUrl: (url: string) => string;
export declare function isObject(item: any): item is object;
export default function mergeDeep(target: object, source: object): {} & object;
