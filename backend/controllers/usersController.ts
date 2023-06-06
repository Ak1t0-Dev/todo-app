import { Request, Response } from "express";
import Users from "../models/users";
import { AuthRequest } from "../middlewares/authMiddleware";
import Categories from "../models/categories";
import Tags from "../models/tags";
import Priorities from "../models/priorities";

export const getUserData = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id?.toString();
    const userData = await Users.findById(userId)
      .populate("categories")
      .populate({
        path: "posts",

        populate: [
          { path: "categories", model: Categories },
          { path: "tags", model: Tags },
          { path: "priority", model: Priorities },
        ],
      })
      .select(["-_id", "categories", "posts"])
      .lean();
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    } else {
      return res.json(userData || []);
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// export const getUserPostsById = async (req: AuthRequest, res: Response) => {
//   try {
//     const userId = req.user?._id?.toString();
//     const userPosts = await Users.findById(userId)
//       .populate("categories")
//       .populate({
//         path: "posts",

//         populate: [
//           { path: "categories", model: Categories },
//           { path: "tags", model: Tags },
//           { path: "priority", model: Priorities },
//         ],
//       })
//       .select("posts")
//       .lean();
//     if (!userPosts) {
//       return res.status(404).json({ error: "User not found" });
//     } else {
//       const posts = userPosts.posts || [];
//       console.log(posts);
//       return res.json(posts);
//     }
//   } catch (err) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };
