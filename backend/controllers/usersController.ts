import { Request, Response } from "express";
import Users from "../models/users";
import { AuthRequest } from "../middlewares/authMiddleware";

export const getUserPosts = async (req: Request, res: Response) => {
  // const user = await Users.find().populate("posts");
  const user = await Users.find().populate({
    path: "posts",
    populate: [
      { path: "categories", model: "Categories" },
      { path: "tags", model: "Tags" },
    ],
  });
  const posts = user.flatMap((user) => user.posts);
  console.log(posts);
  return res.json(posts);
};

export const getUserPostsById = async (req: AuthRequest, res: Response) => {
  // const user = await Users.find().populate("posts");
  const userId = req.user?._id?.toString();
  console.log("aaaaaaavvvvvvvvvvvvvvvvvvvvvaadddddddsaaaaaa", req.user);
  console.log(userId);
  const userPosts = await Users.findById(userId).populate({
    path: "posts",
    populate: [
      { path: "categories", model: "Categories" },
      { path: "tags", model: "Tags" },
    ],
  });
  console.log(userPosts);
  res.json(userPosts);
};
