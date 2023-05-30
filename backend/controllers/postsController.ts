import { Request, Response } from "express";
import { postsModel } from "../models/posts";

export const getPosts = async (req: Request, res: Response) => {
  const postsList = await postsModel
    .find()
    .populate("users")
    .populate("tags")
    .populate("categories");
  res.json(postsList);
};

export const getIndividualPosts = async (req: Request, res: Response) => {
  const individualPosts = await postsModel
    .findById(req.params.id)
    .populate("users")
    .populate("tags")
    .populate("categories");
  res.json(individualPosts);
};

export const getPostedBy = async (req: Request, res: Response) => {
  const postedBy = await postsModel
    .find()
    .populate("users")
    .populate("tags")
    .populate("categories");
  res.json(postedBy);
};
