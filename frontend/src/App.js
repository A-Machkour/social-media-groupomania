import { UidContext } from "./components/AppContext";
import Routes from "./components/Routes";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUid = async () => {
      await axios({
        method: "GET",
        url: "http://localhost:5000/jwtid",
        withCredentials: true,
      })
        .then(res => {
          console.log(res);
          setUid(res.data);
        })
        .catch(err => console.log(err));
    };
    fetchUid();
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
