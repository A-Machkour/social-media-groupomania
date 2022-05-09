import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useDispatch } from "react-redux";
import UploadImgThree from "./uploadImageThree";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { deleteUser } from "../../actions/user.actions";
import { UidContext } from "../AppContext";
import axios from "axios";

export default function ProfilPhoto() {
  const uid = React.useContext(UidContext);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);

  function setCookie(
    key,
    value,
    expireDays,
    expireHours,
    expireMinutes,
    expireSeconds
  ) {
    var expireDate = new Date();
    if (expireDays) {
      expireDate.setDate(expireDate.getDate() + expireDays);
    }
    if (expireHours) {
      expireDate.setHours(expireDate.getHours() + expireHours);
    }
    if (expireMinutes) {
      expireDate.setMinutes(expireDate.getMinutes() + expireMinutes);
    }
    if (expireSeconds) {
      expireDate.setSeconds(expireDate.getSeconds() + expireSeconds);
    }
    document.cookie =
      key +
      "=" +
      escape(value) +
      ";domain=" +
      window.location.hostname +
      ";path=/" +
      ";expires=" +
      expireDate.toUTCString();
  }

  function deleteCookie(name) {
    setCookie(name, "", null, null, null, 1);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserDelete = async () => {
    // axios({
    //   method: "delete",
    //   url: `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}`,
    //   withCredentials: true,
    // }).then(res => {
    //   console.log(res);
    // });
    // console.log(uid, "delete");
    //await dispatch(deleteUser(userData[0].id));
    deleteCookie("jwt");
    window.location.href = "/";
  };
  console.log(uid, "delete");

  return (
    <Grid>
      <Typography variant="h6" className="cardProfilTitle" sx={{ pb: 2 }}>
        Photo de profil
      </Typography>

      <UploadImgThree />
      <Typography variant="h6" className="cardProfilTitle" sx={{ pt: 3 }}>
        Compte
      </Typography>
      <Link component="button" variant="body2" onClick={handleClickOpen}>
        Supprimer mon compte
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Suppression de votre compte"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes-vous sur de vouloir supprimer votre compte ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleUserDelete} autoFocus>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
