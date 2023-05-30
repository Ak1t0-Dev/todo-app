import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContainer } from "../../components/AuthContainer/AuthContainer";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { SyntheticEvent } from "react";
// import dotenv from "dotenv";

// dotenv.config();

export const Register = () => {
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      username: "Alex",
      password: "Alex1234",
      firstname: "Alex1234",
      lastname: "Alex1234",
      address: "Alex1234",
    };
    // console.log(process.env.BACKEND_URI! + "/api/auth/login");
    const url = axios
      .post("http://localhost:3001/api/auth/register", data)
      .then(() => {
        console.log(url);
      })
      .catch((err) => {
        console.error("err:", err);
      });
  };
  return (
    <>
      <AuthContainer>
        <Title>REGISTER</Title>
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
            label="First Name"
            variant="outlined"
          />
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          <TextField id="outlined-basic" label="Address" variant="outlined" />
          <Button variant="outlined" type="submit" sx={{ width: "400px" }}>
            REGISTER
          </Button>
        </Box>
      </AuthContainer>
    </>
  );
};

const Title = styled.h1``;
