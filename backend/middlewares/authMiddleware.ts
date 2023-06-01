import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../types";

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
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
      if (err) return res.sendStatus(403);
      if (typeof decoded === "string") {
        throw new Error("Invalid access token");
      }
      // req.user = decoded!;
      req.user = decoded;
      console.log(
        "decodedecodedecodedecodedecodedecodedecodedecodedecodedecode",
        decoded
      );
      console.log(
        "decodeduserdecodeduserdecodeduserdecodeduserdecodeduserdecodeduser",
        decoded?.user
      );
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

export default authMiddleware;
