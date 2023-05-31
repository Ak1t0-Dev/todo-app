import express, { Router } from "express";
import { getUserPosts } from "../controllers/usersController";

const router: Router = express.Router();

router.get("/userposts", getUserPosts);

export default router;
