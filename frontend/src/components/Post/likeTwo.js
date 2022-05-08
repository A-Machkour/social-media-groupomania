import React, { useContext, useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import { Button, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { UidContext } from "../AppContext";
// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { PostAddSharp } from "@material-ui/icons";

export default function LikeButtonTwo(props) {
  const [uploads, setUploads] = useState([]);
  const uid = useContext(UidContext);

  const likePost = (id, key) => {
    var tempLikes = uploads;
    tempLikes[key].likes = tempLikes[key].likes + 1;

    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts/like`, {
        user_id: uid,
        post_id: id,
      })
      .then(response => {
        setUploads(tempLikes);
      });
  };

  return (
    <CardActions disableSpacing>
      <button onClick={() => likeHandle()}>BUTTON LIKE + NUMBER</button>
      <IconButton aria-label="add to favorites">
        <ThumbUpIcon
          className="likeButton"
          onClick={() => {
            likePost(val.id, key);
          }}
        />
      </IconButton>
    </CardActions>
  );
}
