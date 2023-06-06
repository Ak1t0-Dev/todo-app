import express, { Router } from "express";
import { creatPost, getIndividualPosts } from "../controllers/postsController";

const router: Router = express.Router();

router.route("/createpost").post(creatPost);
router.route("/post/:id").get(getIndividualPosts);

export default router;
