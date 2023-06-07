import React, { useEffect, useState } from "react";
import { Post } from "../../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | undefined>(undefined);

  useEffect(() => {
    getPostById();
  }, []);

  const getPostById = () => {
    axios
      .get(`http://localhost:3001/api/post/${id}`)
      .then((response) => {
        const data = response.data;
        setPost(data);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };

  if (post === null || post === undefined) {
    return <div>Loading...</div>; // Placeholder while data is being fetched
  }

  return (
    <Posts id={post._id.toString()}>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <PostCategories>
        {post.categories &&
          post.categories.map((item, index) => {
            return <PostItem key={index}>{item.category}</PostItem>;
          })}
      </PostCategories>
    </Posts>
  );
};

const Posts = styled.div`
  border: 3px solid black;
  width: 300px;
  padding: 1rem;
`;

const PostCategories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.3rem;
`;

const PostItem = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.5rem;
`;
