import axios from "axios";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Category, Post } from "../../../types";
import CreatePostDialog from "../../components/Dialog/CreatePostDialog";
import { getPriorityStyles } from "../../../constants/themes/Theme";

export const CategoriesContext = createContext<Category[]>([]);

export const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const handlePostChanged = () => {
    getUserData();
  };

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/userdata", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status) {
        const { posts, categories } = response.data;
        setPosts(posts);
        setCategories(categories);
      } else {
        console.error("Error:", response.data);
      }
    } catch (error: any) {
      console.error("Error:", error.response.data);
    }
  };

  // const getCategories = () => {
  //   axios
  //     .get("http://localhost:3001/api/usercategories")
  //     .then((response) => {
  //       const data = response.data;
  //       setCategories(data);
  //     })
  //     .catch((err) => {
  //       console.error("err:", err);
  //     });
  // };

  const handleClick = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <Main>
      <CategoriesContext.Provider value={categories}>
        <CreatePostDialog handlePostChanged={handlePostChanged} />
        <PostsList>
          {posts.map((post, index) => {
            return (
              <PostItem
                priority={post.priority}
                key={index.toString()}
                id={post._id.toString()}
                onClick={() => handleClick(post._id.toString())}
              >
                <Priority priority={post.priority}>{post.priority}</Priority>
                <PostTitle priority={post.priority}>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostCategories>
                  {post.categories &&
                    post.categories.map((item, index) => {
                      return (
                        <PostCategory key={index}>{item.category}</PostCategory>
                      );
                    })}
                </PostCategories>
              </PostItem>
            );
          })}
        </PostsList>
      </CategoriesContext.Provider>
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
  margin-top: 1rem;
`;

const PostItem = styled.div<{ priority: string }>`
  border-radius: 0.4rem;
  width: 300px;
  padding: 1rem;
  ${({ priority }) => {
    const { borderColor } = getPriorityStyles(priority);
    return `
      border: 3px solid ${borderColor};
    `;
  }}
`;

const Priority = styled.span<{ priority: string }>`
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
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
  ${({ priority }) => {
    const { borderColor } = getPriorityStyles(priority);
    return `
      border-bottom: 1px solid ${borderColor};
    `;
  }}
`;

const PostContent = styled.div`
  height: 100px;
  over-flow: hidden;
`;

const PostCategories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.3rem;
  padding: 0.3rem;
`;

const PostCategory = styled.span`
  border: 1.5px solid grey;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.5rem;
  color: #606060;
`;
