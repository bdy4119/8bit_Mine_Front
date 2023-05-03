
import React, { useEffect } from "react";
import MicrosoftLogin from "react-microsoft-login";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function Microsoft(){
    const history = useNavigate();

    const clientId = "580b25cd-a912-485f-b38e-f8da5e6cb448";

    const callback = (error, response) => {
        axios.get("http://localhost:3000/callback/microsoft", {params:{"id":response.uniqueId, "email":response.idTokenClaims.preferred_username}})
        .then(function(resp){
            localStorage.setItem("token", JSON.stringify(resp));

            history("/mainpage");
        })
        .catch(function(err){
            alert(err);
        })
    };

    useEffect(function(){
        const jwt = localStorage.getItem("token");

        if(jwt !== null){
            history("/mainpage");
        }
    }, []);

    return(
        <div>
            <h1>마소 로그인</h1>
            <MicrosoftLogin clientId={clientId} authCallback={callback}  />
        </div>
    );
}

export default Microsoft;