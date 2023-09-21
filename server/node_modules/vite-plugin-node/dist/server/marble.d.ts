import type { Context, ServerIO } from '@marblejs/core';
import type { HttpListener, HttpServer } from '@marblejs/http';
import type { Reader } from 'fp-ts/Reader';
import type { RequestAdapter } from '..';
export interface MarbleContext {
    server: Promise<ServerIO<HttpServer>>;
    listener: Reader<Context, HttpListener>;
}
export declare const MarbleHandler: RequestAdapter<MarbleContext>;
