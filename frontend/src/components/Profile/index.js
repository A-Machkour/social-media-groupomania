import * as React from "react";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ProfilePhoto from "./profilePhoto";
import ProfileInformations from "./profileInformations";
import { useSelector } from "react-redux";

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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4),
  borderRadius: "50px",
  color: theme.palette.text.secondary,
}));

const ProfilePage = () => {
  const userData = useSelector(state => state.userReducer);

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <Typography variant="h4" sx={{ py: 3, px: 5 }}>
          {userData[0].username}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Item>
              <ProfilePhoto />
            </Item>
          </Grid>
          <Grid item xs={12} md={7}>
            <Item>
              <ProfileInformations />
            </Item>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default ProfilePage;
