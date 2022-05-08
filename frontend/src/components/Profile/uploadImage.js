import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect } from "react";

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

const UploadImg = () => {
  // const [isDisabled, setIsDisabled] = useState(true);
  const [file, setFile] = useState();
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);
  const [uploadStatus, setUploadStatus] = useState("");

  const handlePicture = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", userData.username);
    data.append("id", userData.id);
    data.append("profil_picture", file);

    console.log(userData[0].id, "id");
    dispatch(uploadPicture(userData[0].id, data));
    // setIsDisabled(true);
  };

  const handleOnChangeInput = e => {
    setFile(e.target.files[0]);
    // console.log("file", file);
    // if (file.lastModified > 0) {
    //   setIsDisabled(false);
    // }
  };
  const imageHandler = event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profil_picture", file);

    axios(
      `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}/upload`,
      {
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
      .then(res => {
        console.log("res imagehandler", res);
      })
      .then(res => {
        setUploadStatus(res);
      })
      .catch(err => {
        console.error(err);
      });
  };
  const [image, setImage] = useState("");
  useEffect(() => {
    axios(
      `${process.env.REACT_APP_API_URL}api/users/${userData[0].id}/upload`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    )
      .then(res => {
        console.log("useffect res", res);
      })
      .then(res => {
        console.log("useffect reees", res);
        setImage(res.data.image);
        window.location = "/profile";
      });
  }, []);

  // useEffect(() => {
  //   const toFetchProfilPicture = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/api/users/image/${userData[0].id}`
  //       );

  //       if (response.data[0]) setImgSrc(response.data[0].image_url);
  //       else setImgSrc("./images/profils/default/mee.png");
  //     } catch (err) {
  //       throw err;
  //     }
  //   };
  //   toFetchProfilPicture();
  // }, [userData]);

  return (
    // <form action="" onSubmit={handlePicture} className="upload-pic">
    //   <label htmlFor="profil_picture">Changer d'image</label>
    //   <input
    //     type="file"
    //     id="file"
    //     name="profil_picture"
    //     accept=".jpg, .jpeg, .png"
    //     onChange={e => setFile(e.target.files[0])}
    //   />
    //   <br />
    //   <input type="submit" value="Envoyer" />
    // </form>
    // <form action="" onSubmit={handlePicture} className="upload-pic">
    //   <IconButton
    //     type="file"
    //     id="file"
    //     name="profil_picture"
    //     accept=".jpg, .jpeg, .png"
    //     onChange={e => setFile(e.target.files[0])}
    //   >
    //     <Badge
    //       overlap="circular"
    //       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //       badgeContent={<Edit />}
    //     >
    //       <Avatar
    //         alt="user-profile-pic"
    //         src={userData[0].profil_picture}
    //         sx={{ width: 95, height: 95 }}
    //       />
    //     </Badge>
    //   </IconButton>
    // </form>

    // <label htmlFor="contained-button-file">
    //   <Input accept="image/*" id="contained-button-file" multiple type="file" />
    // <IconButton>
    //   <Badge
    //     overlap="circular"
    //     anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    //     badgeContent={<Edit />}
    //   >
    //     <Avatar
    //       alt="user-profile-pic"
    //       src={userData[0].profil_picture}
    //       sx={{ width: 95, height: 95 }}
    //     />
    //   </Badge>
    // </IconButton>
    // </label>
    <form action="" onSubmit={handlePicture} className="photoCard">
      <Stack direction="row">
        <label htmlFor="contained-button-file" className="photoStyle">
          <input
            type="file"
            name="profil_picture"
            accept="image/*"
            multiple={false}
            onChange={imageHandler}
          />
          <img src={userData[0].images} alt="img" />
          <h2>{uploadStatus}</h2>
          {/* <Input
            id="contained-button-file"
            multiple
            type="file"
            name="profil_picture"
            accept=".jpg, .jpeg, .png"
            onChange={handleOnChangeInput}
          />
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={<Edit />}
          >
            <img
              src={`http://localhost:5000/${imgSrc}`}
              alt="profile_picture"
            />
            <Avatar
              alt="user-profile-pic"
              src={"http://localhost:5000/" + imgSrc}
              sx={{ width: 95, height: 95 }}
            />
          </Badge> */}
        </label>
      </Stack>
      <Button
        type="submit"
        variant="contained"
        // disabled={isDisabled}
        sx={{ mt: 3 }}
        className="photoCard"
      >
        Enregistrer
      </Button>
    </form>
  );
};

export default UploadImg;
