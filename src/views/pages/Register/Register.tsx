import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContainer } from "../../components/AuthContainer/AuthContainer";
import styled from "styled-components";
import Button from "@mui/material/Button";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";

// dotenv.config();

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");

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

  const handleFirstnameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    return setFirstname(event.target.value);
  };
  const handleLastnameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    return setLastname(event.target.value);
  };
  const handleAddressChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    return setAddress(event.target.value);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      address: address,
    };
    // console.log(process.env.BACKEND_URI! + "/api/auth/login");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        data
      );
      console.log(response.data);
      localStorage.setItem("accessToken", response.data.accessToken);
      navigate("/login");
    } catch (error: any) {
      console.error("Error:", error.response.data);
    }
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
            label="User Name"
            variant="outlined"
            onChange={handleUsernameChange}
          />
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={handleFirstnameChange}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={handleLastnameChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={handlePasswordChange}
          />
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            onChange={handleAddressChange}
          />
          <Button variant="outlined" type="submit" sx={{ width: "400px" }}>
            REGISTER
          </Button>
        </Box>
      </AuthContainer>
    </>
  );
};

const Title = styled.h1``;
