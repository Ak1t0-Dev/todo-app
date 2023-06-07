import axios from "axios";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Category, Post } from "../../../types";
import CreatePostDialog from "../../components/Dialog/CreatePostDialog";

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
        {/* <Categories>
          {categories.map((item, index) => {
            return <Item key={index.toString()}>{item.category}</Item>;
          })}
        </Categories> */}
        <PostsList>
          {posts.map((post, index) => {
            return (
              <Posts
                key={index.toString()}
                id={post._id.toString()}
                onClick={() => handleClick(post._id.toString())}
              >
                <Priority>{post.priority}</Priority>
                <PostTitle>{post.title}</PostTitle>
                <PostContent>{post.content}</PostContent>
                <PostCategories>
                  {post.categories &&
                    post.categories.map((item, index) => {
                      return <PostItem key={index}>{item.category}</PostItem>;
                    })}
                </PostCategories>
              </Posts>
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

const Posts = styled.div`
  border: 3px solid black;
  width: 300px;
  padding: 1rem;
`;

const Priority = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.7rem;
`;

// const Categories = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   gap: 0.3rem;
//   border: 3px solid black;
//   padding: 1rem;
//   margin: 1rem 0;
// `;

// const Item = styled.span`
//   border: 1px solid black;
//   border-radius: 1rem;
//   padding: 0.3rem 0.5rem;
//   font-size: 1rem;
// `;

const PostTitle = styled.h3``;

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

// const PostTags = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   gap: 0.3rem;
//   padding: 0.3rem;
// `;

const PostItem = styled.span`
  border: 1px solid black;
  border-radius: 1rem;
  padding: 0.3rem 0.5rem;
  font-size: 0.5rem;
`;
