import axios from "axios";
import { useEffect, useState } from "react";
import { ObjectId } from "mongoose";

interface Category {
  id: ObjectId;
  category: string;
}

export const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

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

  return (
    <>
      {categories.map((item) => {
        return <div>{item.category}</div>;
      })}
    </>
  );
};
