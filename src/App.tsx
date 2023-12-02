import { ThemeProvider } from "@emotion/react";
import { CssBaseline, IconButton, createTheme } from "@mui/material";
import React, { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { routes } from "./routes";
import styles from "./App.module.scss";

const router = createBrowserRouter(routes);

const App = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
      primary: {
        main: "#90caf9",
      },
      secondary: {
        main: "#131052",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Switch
          className={styles.darkModeToggleButton}
          checked={toggleDarkMode}
          onChange={toggleDarkTheme}
          icon={<Brightness4Icon sx={{ marginBottom: 1 }} />}
          checkedIcon={<Brightness7Icon sx={{ marginBottom: 1 }} />}
          size="medium"
          edge="end"
          disableRipple
        /> */}
        <IconButton
          className={styles.darkModeToggleButton}
          sx={{
            position: "fixed",
            top: "1rem",
            right: "10rem",
          }}
          onClick={toggleDarkTheme}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
