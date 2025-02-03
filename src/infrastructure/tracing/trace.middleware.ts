import { randomUUID } from "node:crypto";

import { Request, Response, NextFunction } from "express";

export function RequestTraceMiddleware(req: Request, res: Response, next: NextFunction) {
    const traceId = randomUUID();
    req.headers['trace-id'] = traceId;
    res.setHeader('trace-id', traceId);
    next();
}