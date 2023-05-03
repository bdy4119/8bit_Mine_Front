
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Withdrawal(){
    const history = useNavigate();

    const jwt = localStorage.getItem("token");
    const token = jwt.split('"')[3];

    function sendEmail(){
        axios.post("http://localhost:3000/withdrawal", null, {params:{"token":token}})
        .then(function(resp){
            alert(resp);
            
            localStorage.removeItem("token");
            
            history("/");
        })
        .catch(function(err){
            alert(err);

            history("/");
        })
    }

    useEffect(function(){
        sendEmail();
    }, []);

    return(
        <div>
            <h1>회원 탈퇴 중</h1>
        </div>
    );
}

export default Withdrawal;