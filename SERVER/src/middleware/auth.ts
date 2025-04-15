import { NextFunction, Request, Response } from "express";

export const isAuthenticated = ( req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(4.1).json({ error: "Unauthorized" });
};