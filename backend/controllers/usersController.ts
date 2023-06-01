import { Request, Response } from "express";
import Users from "../models/users";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getUserPostsById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    const userPosts = await Users.findById(userId)
      .populate({
        path: "posts",
        populate: [
          { path: "categories", model: "Categories" },
          { path: "tags", model: "Tags" },
        ],
      })
      .select("posts")
      .lean();
    if (!userPosts) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const posts = userPosts.posts || [];
      return res.json(posts);
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
