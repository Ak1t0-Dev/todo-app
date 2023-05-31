import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Category, Post, Tag } from "../../../types";

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const navigate = useNavigate();

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

  const handleClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <Main>
      <Categories>
        {categories.map((item, index) => {
          return <Item key={index.toString()}>{item.category}</Item>;
        })}
      </Categories>
      <Tags>
        {tags.map((item, index) => {
          return <Item key={index.toString()}>{item.tag}</Item>;
        })}
      </Tags>
      <PostsList>
        {posts.map((post, index) => {
          return (
            <Posts
              key={index.toString()}
              id={post._id.toString()}
              onClick={() => handleClick(post._id.toString())}
            >
              <div>{post.title}</div>
              <PostCategories>
                {post.categories &&
                  post.categories.map((item, index) => {
                    return <PostItem key={index}>{item.category}</PostItem>;
                  })}
              </PostCategories>
              <PostTags>
                {post.tags &&
                  post.tags.map((item, index) => {
                    return <PostItem key={index}>{item.tag}</PostItem>;
                  })}
              </PostTags>
            </Posts>
          );
        })}
      </PostsList>
    </Main>
  );
};

const Main = styled.div`
  padding: 1rem;
`;

const PostsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Posts = styled.div`
  border: 3px solid black;
  width: 300px;
  padding: 1rem;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  border: 3px solid black;
  padding: 1rem;
  margin: 1rem 0;
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  border: 3px solid black;
  padding: 1rem;
  margin: 1rem 0;
`;

const Item = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;
`;

const PostCategories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.3rem;
`;

const PostTags = styled.div`
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
