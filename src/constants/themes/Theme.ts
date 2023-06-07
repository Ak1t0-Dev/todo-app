import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1920,
    },
  },
});

export const getPriorityStyles = (priority: string) => {
  const colors = {
    low: {
      borderColor: "#86C166",
      textColor: "#86C166",
      backgroundColor: "#D5FFD6",
    },
    middle: {
      borderColor: "#F7C242",
      textColor: "#F7C242",
      backgroundColor: "#FFE7C1",
    },
    high: {
      borderColor: "#CB1B45",
      textColor: "#CB1B45",
      backgroundColor: "#FFD9DF",
    },
    default: {
      borderColor: "#3A8FB7",
      textColor: "#3A8FB7",
      backgroundColor: "#E0F2FD",
    },
  };
  return colors[priority as keyof typeof colors] || colors.default;
};
