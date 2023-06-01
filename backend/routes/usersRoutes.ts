import express, { Router, Request, Response } from "express";
import { getUserPostsById } from "../controllers/usersController";
import authMiddleware, { AuthRequest } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/userposts", authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    getUserPostsById(req, res);
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
