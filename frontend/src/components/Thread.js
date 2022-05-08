import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getPosts } from "../actions/post.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import PostCard from "./Post/index";
import Box from "@mui/material/Box";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
    // window.addEventListener('scroll', loadMore);
    // return () => window.removeEventListener('scroll');
  }, [loadPost, dispatch]);

  return (
    <div className="thread-page">
      <Navbar />
      <div className="thread-container">
        {/* {uid ? <Navbar /> : <Log signin={true} signup={false} />} */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!isEmpty(posts[0]) &&
            posts.map(post => {
              return <PostCard key={post.post_id} post={post} />;
              // return <li key={post.post_id}>{post.user_id}</li>;
            })}
        </Box>
      </div>
    </div>
  );
};

export default Thread;
