import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import { UidContext } from "../AppContext";
import { red } from "@mui/material/colors";
import axios from "axios";

export default function CommentInput(props) {
  const [commentMessage, setCommentMessage] = useState("");
  const uid = useContext(UidContext);
  const handleSubmit = async event => {
    const data = {
      user_id: uid,
      post_id: props.post.post_id,
      content: commentMessage,
    };
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/comments/`,
      data: data,
      withCredentials: true,
    });

    document.location.reload();
  };
  const inputHandle = e => {
    setCommentMessage(e.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ display: "flex", alignItems: "flex-end", px: 2, pb: 2 }}
    >
      <Avatar
        alt={props.dataUser.username}
        className="userPic"
        src={props.dataUser.images}
        sx={{
          width: 25,
          height: 25,
          mr: 1,
          my: 0.5,
          bgcolor: red[500],
        }}
      />
      <TextField
        id="comment"
        name="content"
        label="Commentaire"
        variant="standard"
        onChange={e => {
          inputHandle(e);
          setCommentMessage(e.target.value);
        }}
        fullWidth
        sx={{ mr: 2 }}
      />
      <IconButton aria-label="send" type="submit" size="small" color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
