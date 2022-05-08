import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { dateParser } from "../Utils";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ProfilInformations() {
  const [open, setOpen] = React.useState(false);
  const userData = useSelector(state => state.userReducer);
  // const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   firstname: data.get("firstname"),
    //   lastname: data.get("lastname"),
    //   bio: data.get("bio"),
    // });
    // dispatch(updateUser(userData[0].id, data));
    // setOpen(true);
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}`,
      withCredentials: true,
      data: {
        firstname: data.get("firstname"),
        lastname: data.get("lastname"),
        bio: data.get("bio"),
      },
    }).then(res => {
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Votre profil a été modifié
        </Alert>
      </Snackbar>
      <Box>
        <Typography variant="h6" className="cardProfilTitle" sx={{ mb: 3 }}>
          Mes informations
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom"
                id="firstname"
                name="firstname"
                defaultValue={userData[0].firstname}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom"
                id="lastname"
                name="lastname"
                defaultValue={userData[0].lastname}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                fullWidth
                label="Bio"
                id="bio"
                name="bio"
                multiline
                rows={5}
                defaultValue={userData[0].bio}
              />
              <Typography variant="body1">
                Membre depuis le : {dateParser(userData[0].created_at)}
              </Typography>
              <Grid sx={{ display: "flex", justifyContent: "right" }}>
                <Button
                  type="submit"
                  size="small"
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  Modifier
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
}
