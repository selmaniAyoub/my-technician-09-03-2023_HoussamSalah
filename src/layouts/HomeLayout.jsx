import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import LanguageTranslation from "../components/Public/LanguageTranslation";
import HomeNavigation from "../components/Public/HomeNavigation";
import Footer from "../components/Public/Footer/Footer";
import CookieConsent from "react-cookie-consent";
export default function HomeLayout({ children }) {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1400,
        xl: 1536,
      },
    },
    typography: {
      fontFamily:
        '"IBM Plex Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CssBaseline />

        <HomeNavigation />
        <br />
        

        {children}

        <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="myCraftCookie"
        style={{ background: "#1f1f1f" }}
        buttonStyle={{
          background: "#006aff",
          color: "white",
          fontSize: "18px",
          borderRadius: "5px",
          padding: "12px 24px",
          fontWeight: "bold",
        }}
        expires={365}
      >
        This website uses cookies to enhance the user experience.{" "}
        <a
          href="/privacy-policy"
          style={{ color: "white", textDecoration: "underline" }}
        >
          Learn more
        </a>
      </CookieConsent>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}
