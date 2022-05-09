import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { UidContext } from "../AppContext";
import { useSelector } from "react-redux";

export default function LikeButton(props) {
  const [postLiked, setPostLiked] = useState(false);
  const [nbOfLikes, setNbOfLikes] = useState(0);
  const uid = useContext(UidContext);
  const [loadPost, setLoadPost] = useState(true);
  const posts = useSelector(state => state.postReducer);

  // Ajoute a la table like lors d'un clic sur le bouton like
  const likeHandle = async () => {
    const data = {
      userId: uid,
      postId: props.post.post_id,
    };
    await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/posts/${uid}/like`,
      withCredentials: true,
      data: data,
    }).then(res => {
      console.log(res);
    });
    document.location.reload(true);
  };
  useEffect(() => {
    const getLikesNb = async () => {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts/${props.post.post_id}/like`,
        withCredentials: true,
      });

      const nbOfLikes = response.data[0].total;
      setNbOfLikes(nbOfLikes);
    };
    console.log(nbOfLikes, "nbOfLikes");
    getLikesNb();
  });
  useEffect(() => {
    const getColorLikeButton = async () => {
      const data = {
        userId: uid,
        postId: props.post.post_id,
      };
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts/${props.post.post_id}/postLikedByUser`,
        withCredentials: true,
        data: data,
      });
      if (response.data[0]) {
        setPostLiked(true);
      } else {
        setPostLiked(false);
      }
    };
    getColorLikeButton();
  }, [uid, props.post.post_id]);

  return (
    <>
      <IconButton aria-label="add to favorites" onClick={() => likeHandle()}>
        <p className="like-number">{nbOfLikes}</p>
        <ThumbUpIcon
          style={postLiked ? { color: "#ff2a00" } : { color: "#a7a7a7b9" }}
          className="like-button"
        />
      </IconButton>
    </>
  );
}
