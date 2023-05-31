import { ObjectId } from "mongoose";

export interface Post {
  _id: ObjectId;
  title: string;
  categories: Category[];
  tags: Tag[];
}

export interface Category {
  _id: ObjectId;
  category: string;
}

export interface Tag {
  _id: ObjectId;
  tag: string;
}
