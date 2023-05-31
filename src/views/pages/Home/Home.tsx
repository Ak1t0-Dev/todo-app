import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";

interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  post: Post[];
}

interface Post {
  id: ObjectId;
  title: string;
  categories: Category[];
  tags: Tag[];
}

interface Category {
  id: ObjectId;
  category: string;
}

interface Tag {
  id: ObjectId;
  tag: string;
}

export const Home = () => {
  const [posts, setPosts] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getCategories();
    getTags();
    getPosts();
  }, []);

  const getPosts = () => {
    axios
      .get("http://localhost:3001/api/userposts")
      .then((response) => {
        const data = response.data;
        console.log(data);
        setPosts(data);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  const getCategories = () => {
    axios
      .get("http://localhost:3001/api/categories")
      .then((response) => {
        const data = response.data;
        setCategories(data);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  const getTags = () => {
    axios
      .get("http://localhost:3001/api/tags")
      .then((response) => {
        const data = response.data;
        setTags(data);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  return (
    <>
      {categories.map((item, index) => {
        return <div key={index.toString()}>{item.category}</div>;
      })}
      {tags.map((item, index) => {
        return <div key={index.toString()}>{item.tag}</div>;
      })}
    </>
  );
};
