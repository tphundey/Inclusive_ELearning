"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarbleHandler = void 0;
const MarbleHandler = async ({ app, req, res }) => {
    const server = await app.server;
    app.listener(server.context)(req, res);
};
exports.MarbleHandler = MarbleHandler;
//# sourceMappingURL=marble.js.map