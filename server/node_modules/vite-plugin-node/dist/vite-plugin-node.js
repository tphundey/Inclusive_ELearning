"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitePluginNode = void 0;
const rollup_plugin_swc_1 = require("./rollup-plugin-swc");
const server_1 = require("./server");
const utils_1 = __importDefault(require("./utils"));
const _1 = require(".");
function VitePluginNode(cfg) {
    var _a, _b, _c, _d;
    const swcOptions = (0, utils_1.default)({
        module: {
            type: 'es6',
        },
        jsc: {
            target: 'es2019',
            parser: {
                syntax: 'typescript',
                decorators: true,
            },
            transform: {
                legacyDecorator: true,
                decoratorMetadata: true,
            },
        },
    }, (_a = cfg.swcOptions) !== null && _a !== void 0 ? _a : {});
    const config = {
        appPath: cfg.appPath,
        adapter: cfg.adapter,
        appName: (_b = cfg.appName) !== null && _b !== void 0 ? _b : 'app',
        tsCompiler: (_c = cfg.tsCompiler) !== null && _c !== void 0 ? _c : 'esbuild',
        exportName: (_d = cfg.exportName) !== null && _d !== void 0 ? _d : 'viteNodeApp',
        swcOptions,
    };
    const plugins = [
        {
            name: _1.PLUGIN_NAME,
            config: () => {
                const plugincConfig = {
                    build: {
                        ssr: config.appPath,
                        rollupOptions: {
                            input: config.appPath,
                        },
                    },
                    server: {
                        hmr: false,
                    },
                    optimizeDeps: {
                        // Vite does not work well with optionnal dependencies,
                        // mark them as ignored for now
                        exclude: [
                            '@swc/core',
                        ],
                    },
                    VitePluginNodeConfig: config,
                };
                if (config.tsCompiler === 'swc')
                    plugincConfig.esbuild = false;
                return plugincConfig;
            },
            configureServer: async (server) => {
                server.middlewares.use(await (0, server_1.createMiddleware)(server));
            },
        },
    ];
    if (config.tsCompiler === 'swc') {
        plugins.push({
            ...(0, rollup_plugin_swc_1.RollupPluginSwc)(config.swcOptions),
        });
    }
    return plugins;
}
exports.VitePluginNode = VitePluginNode;
//# sourceMappingURL=vite-plugin-node.js.map