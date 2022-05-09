import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Button from "@mui/material/Button";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FD2D01",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF9680",
      contrastText: "#fff",
    },
  },
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Groupomania
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Log(props) {
  const [signIn, setSignIn] = useState(props.signin);
  const [signUp, setSignUp] = useState(props.signup);
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleClick = e => {
    if (e.target.id === "register") {
      setSignIn(false);
      setSignUp(true);
      setMessageError("");
    } else if (e.target.id === "login") {
      setSignUp(false);
      setSignIn(true);
      setMessageError("");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random/?computer,working,cafe)",
            backgroundRepeat: "no-repeat",
            backgroundColor: t =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundImage: "./images/logo/icon.png",
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src="./images/logo/icon2.png"
              alt="logo"
              className="authLogo"
            ></img>
            <Typography component="h1" variant="h5">
              {signIn && "Se connecter"}
              {signUp && "S'inscrire"}
            </Typography>
            <Typography variant="h7" color="error">
              {messageError}
            </Typography>
            <Typography variant="h7" color="success.main">
              {messageSuccess}
            </Typography>
            {signIn && (
              <SignInForm
                setMessageError={setMessageError}
                setMessageSuccess={setMessageSuccess}
              />
            )}
            {signUp && (
              <SignUpForm
                setMessageError={setMessageError}
                setMessageSuccess={setMessageSuccess}
                setSignIn={setSignIn}
                setSignUp={setSignUp}
              />
            )}
            {/* <Link href="#" variant="body2" onClick={handleClick} id="login"> 
                          Connexion
                        </Link>
                        <Link href="#" variant="body2" onClick={handleClick} id="register"> 
                          Inscription
                        </Link> */}
            <Grid container spacing={4}>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button size="small" onClick={handleClick} id="login">
                  Connexion
                </Button>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button size="small" onClick={handleClick} id="register">
                  Inscription
                </Button>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
