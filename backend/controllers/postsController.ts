import { Request, Response } from "express";
import Posts from "../models/posts";

export const getPosts = async (req: Request, res: Response) => {
  const postsList = await Posts.find().populate("tags").populate("categories");
  res.json(postsList);
};

export const getIndividualPosts = async (req: Request, res: Response) => {
  const individualPosts = await Posts.findById(req.params.id)
    .populate("tags")
    .populate("categories");
  res.json(individualPosts);
};

export const getPostedBy = async (req: Request, res: Response) => {
  const postedBy = await Posts.find().populate("tags").populate("categories");
  res.json(postedBy);
};
