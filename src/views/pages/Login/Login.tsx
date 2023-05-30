import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContainer } from "../../components/AuthContainer/AuthContainer";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { SyntheticEvent } from "react";
// import dotenv from "dotenv";

// dotenv.config();

export const Login = () => {
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { username: "John", password: "John1234" };
    // console.log(process.env.BACKEND_URI! + "/api/auth/login");
    const url = axios
      .post("http://localhost:3001/api/auth/login", data)
      .then(() => {
        console.log(url);
        console.log("login");
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };
  return (
    <>
      <AuthContainer>
        <Title>LOGIN</Title>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mb: 4, width: "25ch", display: "flex" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <Button variant="outlined" type="submit" sx={{ width: "25ch" }}>
            LOGIN
          </Button>
        </Box>
      </AuthContainer>
    </>
  );
};

const Title = styled.h1``;
