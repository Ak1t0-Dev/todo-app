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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "linear-gradient(rgb(236 236 236), rgb(146 146 146))",
        }}
      >
        {children}
      </Container>
    </>
  );
};
