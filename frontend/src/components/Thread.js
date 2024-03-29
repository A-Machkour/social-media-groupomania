import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getPosts } from "../actions/post.actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PostCard from "./Post/index";
import Box from "@mui/material/Box";

let theme = createTheme({
  palette: {
    primary: {
      main: "#FD2D01",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FF9680",
      contrastText: "#fff",
    },
  },
});

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [loadPost, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="thread-page">
        <Navbar />
        <div className="thread-container">
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
              })}
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Thread;
