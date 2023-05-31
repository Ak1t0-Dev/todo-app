import express, { Router } from "express";
import {
  getPosts,
  getPostedBy,
  getIndividualPosts,
} from "../controllers/postsController";

const router: Router = express.Router();

router.route("/all").get(getPosts);
router.route("/:id").get(getIndividualPosts);
router.route("/postedBy").get(getPostedBy);

export default router;
