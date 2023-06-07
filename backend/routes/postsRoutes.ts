import express, { Router } from "express";
import { createPost, getIndividualPosts } from "../controllers/postsController";
import authMiddleware from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.route("/createpost").post(authMiddleware, createPost);
// router.route("/createpost").post(creatPost);
router.route("/post/:id").get(getIndividualPosts);
export default router;
