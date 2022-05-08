import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
// import Navbar from "../components/Navbar";
import Thread from "../components/Thread";
const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home-page">
      {uid ? (
        <>
          <Thread />
        </>
      ) : (
        <Log signin={true} signup={false} />
      )}
    </div>
  );
};

export default Home;
