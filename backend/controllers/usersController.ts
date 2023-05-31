import { Request, Response } from "express";
import Users from "../models/users";

export const getUserPosts = async (req: Request, res: Response) => {
  const userpostsList = await Users.find().populate("posts");
  console.log(userpostsList);
  res.json(userpostsList);
};
