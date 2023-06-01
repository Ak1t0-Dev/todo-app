import { ObjectId } from "mongoose";

export interface User {
  _id: ObjectId;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  posts: [];
  iat: number;
  exp: number;
}

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
