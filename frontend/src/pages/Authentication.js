import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Profile from "./Profile";

const Authentication = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return <div>{uid ? <Profile /> : <Log signin={true} signup={false} />}</div>;
};

export default Authentication;
