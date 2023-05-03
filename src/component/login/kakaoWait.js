
import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Kakaowait(){
    const history = useNavigate();

    let code = new URL(window.location.href).searchParams.get("code");

    function sendcode(){
        axios.get("http://localhost:3000/callback/kakao", {params:{"code":code}})
        .then(function(resp){
            localStorage.setItem("token", JSON.stringify(resp));
            
            history("/mainpage");
        })
        .catch(function(err){
            alert(err);

            history("/");
        });
    }

    useEffect(function(){
        sendcode();
    }, []);

    return(
        <div>
            <h1>카카오 로그인 중입니다</h1>
        </div>
    );
}

export default Kakaowait;