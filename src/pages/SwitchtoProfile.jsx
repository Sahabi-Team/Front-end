import React, {  useContext ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export default function SwitchtoProfile() {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo != null) {
      if (userInfo.usertype == "trainee") {
        navigate("/workoutplans");
      } else if (userInfo.usertype == "trainer") {
        navigate("/trainer_students");
      }
    }
    else{
        navigate("/signin");
    }
  }, []);

  return null;
}
