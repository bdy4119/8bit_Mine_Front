
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"

function LogoutAfter(){
    const history = useNavigate();

    useEffect(function(){
        localStorage.removeItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
        history("/");
    }, [])
    
    return(
      <div>
        <h1>로그아웃 중</h1>
      </div>  
    );
}

export default LogoutAfter;