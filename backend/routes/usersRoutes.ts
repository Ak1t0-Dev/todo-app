import express, { Router, Request, Response } from "express";
import { getUserData } from "../controllers/usersController";
import authMiddleware, { AuthRequest } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/userdata", authMiddleware, (req: AuthRequest, res: Response) => {
  try {
    getUserData(req, res);
  } catch (error: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
