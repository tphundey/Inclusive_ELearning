"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMiddleware = exports.getPluginConfig = exports.SUPPORTED_FRAMEWORKS = exports.debugServer = void 0;
const process_1 = require("process");
const chalk_1 = __importDefault(require("chalk"));
const __1 = require("..");
const utils_1 = require("../utils");
const express_1 = require("./express");
const fastify_1 = require("./fastify");
const koa_1 = require("./koa");
const nest_1 = require("./nest");
const marble_1 = require("./marble");
exports.debugServer = (0, utils_1.createDebugger)('vite:node-plugin:server');
exports.SUPPORTED_FRAMEWORKS = {
    express: express_1.ExpressHandler,
    nest: nest_1.NestHandler,
    koa: koa_1.KoaHandler,
    fastify: fastify_1.FastifyHandler,
    marble: marble_1.MarbleHandler,
};
const env = { command: 'serve', mode: '' };
const getPluginConfig = async (server) => {
    const plugin = server.config.plugins.find(p => p.name === __1.PLUGIN_NAME);
    let userConfig;
    if (typeof plugin.config === 'function')
        userConfig = await plugin.config({}, env);
    if (userConfig)
        return userConfig.VitePluginNodeConfig;
    console.error('Please setup VitePluginNode in your vite.config.js first');
    (0, process_1.exit)(1);
};
exports.getPluginConfig = getPluginConfig;
const getRequestHandler = (handler) => {
    if (typeof handler === 'function') {
        (0, exports.debugServer)(chalk_1.default.dim `using custom server handler`);
        return handler;
    }
    (0, exports.debugServer)(chalk_1.default.dim `creating ${handler} node server`);
    return exports.SUPPORTED_FRAMEWORKS[handler];
};
const createMiddleware = async (server) => {
    const config = await (0, exports.getPluginConfig)(server);
    const logger = server.config.logger;
    const requestHandler = getRequestHandler(config.adapter);
    if (!requestHandler) {
        console.error('Failed to find a request handler');
        process.exit(1);
    }
    return async function (req, res, next) {
        const appModule = await server.ssrLoadModule(config.appPath);
        let app = appModule[config.exportName];
        if (!app) {
            logger.error(`Failed to find a named export ${config.exportName} from ${config.appPath}`);
            process.exit(1);
        }
        else {
            // some app may be created with a function returning a promise
            app = await app;
            await requestHandler({ app, server, req, res, next });
        }
    };
};
exports.createMiddleware = createMiddleware;
//# sourceMappingURL=index.js.map