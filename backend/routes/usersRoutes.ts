import express, { Router, Request, Response } from "express";
import { getUserPostsById } from "../controllers/usersController";
import authMiddleware, { AuthRequest } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/userposts", authMiddleware, (req: AuthRequest, res: Response) => {
  console.log("hello");
  console.log(
    "hellohellohellohellohellohellohellohellohellohellohellohellohellohellohello",
    req.user
  );
  getUserPostsById(req, res)
    .then((userPosts) => {
      return res.json(userPosts);
    })
    .catch((error: any) => {
      return res.status(500).json({ error: "Internal Server Error" });
    });
});

export default router;
