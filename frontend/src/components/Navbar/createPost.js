import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import { useSelector } from "react-redux";
import axios from "axios";
import { UidContext } from "../AppContext";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const CreatePost = props => {
  const [file, setFile] = useState("");
  const [openNewPost, setOpenNewPost] = React.useState(false);
  const uid = useContext(UidContext);

  const handleClickOpenNewPost = () => {
    setOpenNewPost(true);
    setFile("");
  };

  const handleCloseNewPost = () => {
    setOpenNewPost(false);
  };

  const handleSubmitPost = event => {
    event.preventDefault();
    const dataContent = new FormData(event.currentTarget);
    const data = new FormData();
    data.append("post_image", file);
    data.append("content", dataContent.get("content"));
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/posts/${uid}`,
      withCredentials: true,
      data,
    }).then(res => {
      handleCloseNewPost();
    });
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        sx={{ mr: 5, display: { xs: "none", md: "flex" } }}
        onClick={handleClickOpenNewPost}
      >
        Créer un post
      </Button>

      <IconButton
        color="secondary"
        aria-label="add post"
        component="span"
        sx={{ mr: 4, display: { xs: "flex", md: "none" } }}
        onClick={handleClickOpenNewPost}
      >
        <AddIcon />
      </IconButton>

      <Dialog open={openNewPost} onClose={handleCloseNewPost}>
        <DialogTitle>Créer un post</DialogTitle>
        <Box component="form" onSubmit={handleSubmitPost} noValidate>
          <DialogContent>
            <label htmlFor="post_image">
              <Input
                accept="image/*"
                id="post_image"
                multiple
                type="file"
                name="post_image"
                onChange={e => setFile(e.target.files[0])}
              />
              <Button
                variant="contained"
                component="span"
                color="secondary"
                sx={{ mr: 3, mb: 3 }}
              >
                Image
              </Button>
              {file.name}
            </label>
            <TextField
              autoFocus
              margin="dense"
              id="content"
              name="content"
              label="Contenu"
              type="text"
              fullWidth
              variant="standard"
              color="secondary"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewPost} color="secondary">
              Annuler
            </Button>
            <Button type="submit" color="secondary">
              Créer
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreatePost;
