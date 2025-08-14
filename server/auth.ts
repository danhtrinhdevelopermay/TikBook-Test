import type { Request, Response, NextFunction } from "express";
import type { User } from "@shared/schema";

// Extend Express types for session
declare module 'express-session' {
  interface SessionData {
    user?: User;
    userId?: string;
  }
}

// Middleware to check if user is authenticated
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Middleware to attach user to request
export const attachUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userId) {
    // User is authenticated
    req.user = req.session.user;
  }
  next();
};

// Type augmentation for Express Request
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}