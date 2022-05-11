import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import Profile from "./Profile";
import Home from "./Home";

const Authentication = () => {
  const uid = useContext(UidContext);
  console.log("uid", uid);
  return <div>{uid ? <Home /> : <Log signin={true} signup={false} />}</div>;
};

export default Authentication;
