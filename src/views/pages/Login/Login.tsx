import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContainer } from "../../components/AuthContainer/AuthContainer";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
// import dotenv from "dotenv";

// dotenv.config();

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    return setUsername(event.target.value);
  };

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    return setPassword(event.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = { username: username, password: password };
    // console.log(process.env.BACKEND_URI! + "/api/auth/login");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        data
      );
      if (response.data.error) {
        console.error("Error:", response.data.message);
      } else {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Error:", error.response);
    }
  };
  return (
    <>
      <AuthContainer>
        <Title>LOGIN</Title>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mb: 4, width: "400px", display: "flex" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="outlined-basic"
            label="UserName"
            variant="outlined"
            onChange={handleUsernameChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={handlePasswordChange}
          />
          <Button variant="outlined" type="submit" sx={{ width: "400px" }}>
            LOGIN
          </Button>
        </Box>
      </AuthContainer>
    </>
  );
};

const Title = styled.h1``;
