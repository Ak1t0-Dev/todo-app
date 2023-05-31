import express, { Router } from "express";
import {
  // getPosts,
  // getPostedBy,
  getIndividualPosts,
} from "../controllers/postsController";

const router: Router = express.Router();

// router.route("/all").get(getPosts);
// router.route("/postedBy").get(getPostedBy);
router.route("/post/:id").get(getIndividualPosts);

export default router;
