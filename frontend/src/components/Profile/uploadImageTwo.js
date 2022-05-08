import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faImage } from "@fortawesome/free-solid-svg-icons";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import axios from "axios";

const Edit = styled(EditOutlinedIcon)(({ theme }) => ({
  width: 20,
  height: 20,
  backgroundColor: "#FF9680",
  borderRadius: 50,
  padding: 12,
}));

const Input = styled("input")({
  display: "none",
});

const UploadImgTwo = () => {
  //   const [file, setFile] = useState();
  //   const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);
  const [imgSrc, setImgSrc] = useState("");
  const [userNewInfos, setUserNewInfos] = useState({
    user_firstname: "",
    user_lastname: "",
  });
  let updatedUserNewInfos = {};

  const saveChange = async e => {
    e.preventDefault();
    updatedUserNewInfos = {
      user_image: document.getElementById("profil_picture").files[0],
    };
    setUserNewInfos(updatedUserNewInfos);

    const post = new FormData();
    post.append(
      "profil_picture",
      document.getElementById("profil_picture").files[0]
    );

    axios(
      `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}/upload`,
      {
        method: "POST",
        data: post,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    // const user_id = userData[0].id;
    // const user = {
    //   ...updatedUserNewInfos,
    //   user_id: user_id,
    // };

    // localStorage.clear();
    // localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/";
  };

  useEffect(() => {
    const toFetchProfilPicture = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}/upload`
        );
        console.log(response.data.image);
        if (response.data.image) setImgSrc(response.data.image);
        else setImgSrc("./images/profils/default/mee.png");
      } catch (err) {
        throw err;
      }
    };
    toFetchProfilPicture();
  }, []);

  //   const handlePicture = e => {
  //     e.preventDefault();
  //     const data = new FormData();
  //     data.append("name", userData[0].username);
  //     data.append("userId", userData[0].id);
  //     data.append("profil_picture", file);

  //     console.log(data.profil_picture, "id");
  //     dispatch(uploadPicture(data, data.userId));
  //   };

  return (
    // <form className="modal__infos" onSubmit={saveChange}>
    //   <div className="modal__photo">
    //     <img src={imgSrc} alt="profile_picture" />
    //     <input type="file" name="profil_picture" id="profil_picture" />
    //     <label htmlFor="profil_picture">
    //       <FontAwesomeIcon icon={faImage} className="profile_picture__change" />
    //     </label>
    //   </div>

    //   <div className="modal__save">
    // <input
    //   type="submit"
    //   name="modal__save"
    //   id="modal__save"
    //   value="Enregistrer"
    // />
    //   </div>
    // </form>
    <form onSubmit={saveChange}>
      <Stack direction="row">
        <label htmlFor="profil_picture">
          <input
            type="file"
            name="profil_picture"
            id="profil_picture"
            accept="image/*"
            multiple={false}
          />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<Edit />}
          >
            <Avatar
              alt="user-profile-pic"
              src={imgSrc}
              sx={{ width: 150, height: 150 }}
            />
          </Badge>
        </label>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        // disabled={isDisabled}
        name="modal__save"
        id="modal__save"
        sx={{ mt: 3 }}
      >
        Enregistrer
      </Button>
      <input
        type="submit"
        name="modal__save"
        id="modal__save"
        value="Enregistrer"
      />
    </form>
  );
};

export default UploadImgTwo;
