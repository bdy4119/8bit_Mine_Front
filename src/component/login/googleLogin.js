
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const GoogleButton = () => {
  const history = useNavigate();

  const clientId = "1037718829981-9m6h7ccbotf8buufvbbjk4ictlfcf5d0.apps.googleusercontent.com";

    const onSuccess = (response) => {
        axios.get("http://localhost:3000/callback/google", {params:{"id":response.profileObj.googleId, "email":response.profileObj.email}})
        .then(function(resp){
          localStorage.setItem("token", JSON.stringify(resp));

          history("/mainpage");
        })
        .catch(function(err){
          alert(err);

          history("/");
        })
    };

    useEffect(function(){
      const jwt = localStorage.getItem("token");

      if(jwt !== null){
        history("/mainpage");
      }
    }, []);

    const onFailure = (response) => {
        console.log(response);
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
        </div>
    );
};

export default GoogleButton;