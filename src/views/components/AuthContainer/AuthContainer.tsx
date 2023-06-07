import { ReactNode, FC } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../../../constants/themes/Theme";

interface AuthContainerProps {
  children: ReactNode;
}

export const AuthContainer: FC<AuthContainerProps> = ({ children }) => {
  const Desktop = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{
          maxWidth: Desktop ? "100%" : "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(rgb(250 250 250), rgb(126 126 126))",
        }}
      >
        {children}
      </Container>
    </>
  );
};
