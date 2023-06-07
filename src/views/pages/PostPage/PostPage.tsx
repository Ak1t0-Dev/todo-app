import React, { useEffect, useState } from "react";
import { Post } from "../../../types";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPriorityStyles } from "../../../constants/themes/Theme";

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
    <Posts priority={post.priority} id={post._id.toString()}>
      <div>
        <Priority priority={post.priority}>{post.priority}</Priority>
      </div>
      <PostTitle priority={post.priority}>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <PostCategories>
        {post.categories &&
          post.categories.map((item, index) => {
            return <PostItem key={index}>{item.category}</PostItem>;
          })}
      </PostCategories>
    </Posts>
  );
};

const Posts = styled.div<{ priority: string }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  border-radius: 0.4rem;
  width: calc(100% - 3rem);
  height: 80vh;
  margin: 2rem 1.5rem;
  padding: 2rem;
  ${({ priority }) => {
    const { borderColor } = getPriorityStyles(priority);
    return `
      border: 3px solid ${borderColor};
    `;
  }}
`;

const Priority = styled.span<{ priority: string }>`
  border-radius: 1rem;
  padding: 0.3rem 1.2rem;
  font-size: 1rem;
  font-weight: 800;
  ${({ priority }) => {
    const { borderColor, backgroundColor, textColor } =
      getPriorityStyles(priority);
    return `  
      border: 1px solid ${borderColor};
      background-color: ${backgroundColor};
      color: ${textColor};
    `;
  }}
  ${({ priority }) =>
    priority === "" &&
    `
    visibility: hidden;
  `}
`;

const PostTitle = styled.h3<{ priority: string }>`
  padding-bottom: 0.5rem;
  font-size: 2rem;
  ${({ priority }) => {
    const { borderColor } = getPriorityStyles(priority);
    return `
      border-bottom: 1px solid ${borderColor};
    `;
  }}
`;

const PostContent = styled.div`
  height: 50vh;
  over-flow: hidden;
`;

const PostCategories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.3rem;
`;

const PostItem = styled.span`
  border: 2px solid grey;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  color: #606060;
`;
