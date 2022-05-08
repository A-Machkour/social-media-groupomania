import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { dateParser } from "../Utils";
// import { useSelector } from "react-redux";
import axios from "axios";
import Box from "@mui/material/Box";
import LikeButton from "./like";
import CommentsButton from "./commentsButton";
import CommentsList from "./commentsList";
import CommentInput from "./commentInput";
import DeletePost from "./deletePost";
import { useContext } from "react";
import { UidContext } from "../AppContext";
import CardActions from "@mui/material/CardActions";

export default function PostCard(props) {
  const [dataUser, setDataUser] = useState({});
  const [dataUid, setDataUid] = useState({});
  const [imagePost, setImagePost] = useState("");
  // const postData = useSelector(state => state.postReducer);
  // const userData = useSelector(state => state.userReducer);
  const [open, setOpen] = React.useState(false);
  const uid = useContext(UidContext);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/${uid}`,
      withCredentials: true,
    }).then(res => {
      setDataUid(res.data[0]);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/users/${props.post.user_id}`,
      withCredentials: true,
    }).then(res => {
      setDataUser(res.data[0]);
    });
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/posts/image/${props.post.post_id}`,
      withCredentials: true,
    }).then(res => {
      if (res.data.length !== 0) {
        setImagePost(res.data[0].image_url);
      }
    });
  }, [imagePost]);

  return (
    <Box
      sx={{
        width: { xs: "75%", sm: "70%", md: "40%", lg: "35%" },
      }}
    >
      <Card
        sx={{
          mt: 5,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={dataUser.username}
              className="userPic"
              src={dataUser.images}
              onClick={handleClickOpen}
            />
          }
          action={
            uid == props.post.user_id || dataUid.admin == 1 ? (
              <DeletePost post={props.post} />
            ) : (
              ""
            )
          }
          title={dataUser.username}
          subheader={dateParser(props.post.post_date)}
        />
        {imagePost !== "" && (
          <CardMedia
            component="img"
            height="300"
            sx={{
              backgroundImage: `url(${imagePost})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: t =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
            }}
          />
        )}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.post.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikeButton />
          <CommentsButton
            expanded={expanded}
            handleExpandClick={handleExpandClick}
          />
        </CardActions>
        <CommentsList expanded={expanded} />
        <CommentInput />
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Information de "} {dataUser.username}
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={dataUser.username}
            className="userPic"
            src={dataUser.images}
            sx={{
              width: 150,
              height: 150,
              my: 3,
              bgcolor: red[500],
            }}
          />
          <Typography variant="body2">Nom : {dataUser.lastname}</Typography>
          <Typography variant="body2" sx={{ my: 1 }}>
            Prénom : {dataUser.firstname}
          </Typography>
          <Typography variant="body2">
            Bio : {dataUser.bio !== null ? dataUser.bio : "Non renseigné"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
