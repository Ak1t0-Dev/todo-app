import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  posts: [];
  iat: number;
  exp: number;
}

export interface AuthRequest extends Request {
  // user: JwtPayload;
  user?: User;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  // Get the access token from the request headers
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Access token is missing" });
    }

    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;

    if (typeof decoded === "string") {
      throw new Error("Invalid access token");
    }

    req.user = decoded.user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

export default authMiddleware;
