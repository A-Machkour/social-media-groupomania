import React from "react";
import axios from "axios";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import { useState, useEffect } from "react";
import Comment from "./commentText";

export default function CommentsList(props) {
  const [allComments, setAllComments] = useState([]);

  console.log("allComments", allComments);

  useEffect(() => {
    async function getComments() {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/comments/${props.post.post_id}/getallcomments`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        setAllComments(prevState => [...prevState, ...data]);
      } else throw new Error("Oops, didn't get an array.");
    }
    getComments();
  }, [props.post.post_id]);
  return (
    <Collapse in={props.expanded} timeout="auto" unmountOnExit>
      <CardContent className="comments">
        {allComments.map(comment => (
          <Comment comment={comment} key={comment.comment_id} />
        ))}
      </CardContent>
    </Collapse>
  );
}
