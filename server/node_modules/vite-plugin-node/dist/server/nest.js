"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestHandler = void 0;
let prevApp;
const NestHandler = async ({ app, req, res }) => {
    // @ts-expect-error nest app typing error
    if (!app.isInitialized) {
        if (prevApp)
            await prevApp.close();
        await app.init();
        prevApp = app;
    }
    const instance = app.getHttpAdapter().getInstance();
    if (typeof instance === 'function') {
        instance(req, res);
    }
    else {
        const fastifyApp = await instance.ready();
        fastifyApp.routing(req, res);
    }
};
exports.NestHandler = NestHandler;
//# sourceMappingURL=nest.js.map