"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FastifyHandler = void 0;
const FastifyHandler = async ({ app, req, res }) => {
    await app.ready();
    app.routing(req, res);
};
exports.FastifyHandler = FastifyHandler;
//# sourceMappingURL=fastify.js.map