import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { Badge } from "@mui/material";
import { Avatar } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";

const Edit = styled(EditOutlinedIcon)(({ theme }) => ({
  width: 20,
  height: 20,
  backgroundColor: "#FF9680",
  borderRadius: 50,
  padding: 12,
}));

const Input = styled("input")({
  display: "none",
  cursor: "pointer",
});

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userReducer);

  const handlePicture = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData[0].username);
    data.append("userId", userData[0].id);
    data.append("profil_picture", file);

    dispatch(uploadPicture(userData[0].id, data));
    window.location.href = "/";
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-pic">
      <Stack direction="row">
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <label htmlFor="profil_picture">
              <Input
                type="file"
                name="profil_picture"
                id="profil_picture"
                accept=".jpg, .jpeg, .png .gif"
                onChange={e => setFile(e.target.files[0])}
                multiple={false}
              />
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={<Edit />}
              >
                <Avatar
                  alt="user-profile-pic"
                  className="userPic"
                  src={userData[0].images}
                  sx={{ width: 150, height: 150 }}
                />
              </Badge>
            </label>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <input type="submit" value="ENVOYER" className="btnUpload" />
          </Grid>
        </Grid>
      </Stack>
    </form>
  );
};

export default UploadImg;
