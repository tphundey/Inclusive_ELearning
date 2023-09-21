"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KoaHandler = void 0;
const KoaHandler = ({ app, req, res }) => {
    app.callback()(req, res);
};
exports.KoaHandler = KoaHandler;
//# sourceMappingURL=koa.js.map