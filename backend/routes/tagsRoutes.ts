import express, { Router } from "express";
import { getTags } from "../controllers/tagsController";

const router: Router = express.Router();

router.get("/tags", getTags);

export default router;
