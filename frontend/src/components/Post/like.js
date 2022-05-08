import React, { useContext, useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { UidContext } from "../AppContext";
// import { useContext } from "react";
import { useSelector } from "react-redux";
// import { PostAddSharp } from "@material-ui/icons";

export default function LikeButton(props) {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const [loadPost, setLoadPost] = useState(true);
  const posts = useSelector(state => state.postReducer);

  //   useEffect(() => {

  //   }, [posts]);
  // const likeUnlikePost = id => {
  //   axios
  //     .patch(`${process.env.REACT_APP_API_URL}api/posts/${id}/like`, {
  //       user_Id: props.userId,
  //       post_Id: id,
  //     })
  //     .then(res => {
  //       console.log(res);
  //     });
  // };
  const likeHandle = async () => {
    const data = {
      userId: uid,
      postId: posts[0].postId,
    };

    console.log(data.userId, data.postId);
    await axios.patch(`/api/posts/${uid}/like`, data);
    document.location.reload();
  };

  return (
    <>
      <button onClick={() => likeHandle()}>BUTTON LIKE + NUMBER</button>
      <IconButton aria-label="add to favorites">
        <ThumbUpIcon className="likeButton" />
      </IconButton>
    </>
  );
}
///////////////////
// import React, { useEffect, useState } from "react";
// // import "./ToInteract.scss";

// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faCommentAlt, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// // import { POST, PATCH } from "../../../../api/axios";
// // import ENDPOINTS from "../../../../api/endpoints";

// const LikeButton = ({ postId }) => {
//   // State
//   const [nbOfLikes, setNbOfLikes] = useState(0);
//   const [postLiked, setPostLiked] = useState(false);
//   const uid = useContext(UidContext);

//   const likeHandle = async () => {
//     const data = {
//       userId: uid,
//       postId: postId,
//     };

//     console.log(data.userId, data.postId);
//     await Axios.post("/api/posts/:id/like", data);
//     document.location.reload();
//   };

//   useEffect(() => {
//     const getLikesNb = async () => {
//       const response = await Axios.post("/api/posts/:id/like", { postId });

//       const nbOfLikes = response.data[0].total;
//       setNbOfLikes(nbOfLikes);
//     };
//     getLikesNb();
//   }, [postId]);

//   // useEffect(() => {
//   //   const getColorLikeButton = async () => {
//   //     const data = {
//   //       postId,
//   //       userId: uid,
//   //     };
//   //     const response = await Axios.post("/api/posts/:id/postLikedByUser", data);
//   //     if (response.data[0]) {
//   //       setPostLiked(true);
//   //     } else {
//   //       setPostLiked(false);
//   //     }
//   //   };
//   //   getColorLikeButton();
//   // }, [postId, uid]);

//   return (
//     <div className="to-interact">
//       <div className="to-interact__nb-of-likes">
//         {/* <FontAwesomeIcon icon={faThumbsUp} color={"#38618c"} /> */}
//         <p className="to-interact__nb-of-likes--number">{nbOfLikes}</p>
//       </div>
//       <hr />
//       <div className="to-interact__buttons">
//         <button
//           className={postLiked ? "button__liked" : null}
//           onClick={likeHandle}
//         >
//           <span>
//             {/* <FontAwesomeIcon
//               icon={faThumbsUp}
//               color={postLiked ? "#38618C" : "gray"}
//             /> */}
//           </span>
//           J'aime
//         </button>
//         <button>
//           <span>
//             {/* <FontAwesomeIcon icon={faCommentAlt} color={"#f57251"} /> */}
//           </span>
//           Commenter
//         </button>
//       </div>
//       <hr />
//     </div>
//   );
// };

// export default LikeButton;
