import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import axios from "axios";
import { dateParser } from "../Utils";

const Comment = ({ comment }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [dataUser, setDataUser] = useState("");

  const getCommentUsername = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/comments/${comment.user_id}/user`
      );

      if (response.data[0]) {
        setDataUser(response.data[0].username);
      }
    } catch (err) {
      throw err;
    }
  };
  getCommentUsername();

  const getCommentAvatar = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/users/${comment.user_id}/upload`
      );
      if (response.data) setImgSrc(response.data.image);
    } catch (err) {
      throw err;
    }
  };
  getCommentAvatar();

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem className="comment__message" sx={{ p: 0 }}>
        <ListItemIcon>
          <Avatar
            alt={comment.user_id.username}
            className="userPic"
            src={imgSrc}
          />
        </ListItemIcon>
        <ListItemText primary={dataUser} />
      </ListItem>
      <ListItemText
        sx={{ mt: 2 }}
        primary={comment.content}
        secondary={"Posté le " + dateParser(comment.comment_date)}
      />
      <Divider component="li" />
    </List>
  );
};

export default Comment;
