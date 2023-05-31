import { Request, Response } from "express";
import Users from "../models/users";

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
  res.json(posts);
};
