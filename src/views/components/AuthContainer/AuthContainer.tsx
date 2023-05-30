import { ReactNode, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

interface AuthContainerProps {
  children: ReactNode;
}

export const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Container
        sx={{
          bgcolor: "#cfe8fc",
          height: "60vh",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Container>
    </>
  );
};
