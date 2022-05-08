import React from "react";
import Navbar from "../components/Navbar";
import ProfilePage from "../components/Profile/index";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import { useContext } from "react";
const Profile = () => {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <>
          <Navbar />
          <ProfilePage />
        </>
      ) : (
        <Log signin={true} signup={false} />
      )}
    </>
  );
};

export default Profile;
