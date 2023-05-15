
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Withdrawal(){
    const history = useNavigate();

    const token = localStorage.getItem("token");

    function sendEmail(){
        let result = window.confirm("회원탈퇴를 진행합니다");

        if(result){
            axios.post("http://localhost:3000/withdrawal", null, {params:{"token":token}})
            .then(function(resp){
            alert(resp);
            
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            
            history("/");
        })
        .catch(function(err){
            alert(err);

            history("/edit");
        })
        }
        else{
            history("/edit");
        }
    }

    useEffect(function(){
        document.getElementById("backtop").style.visibility = "hidden";
        sendEmail();
    }, []);

    return(
        <div>
            <h1>회원 탈퇴 중</h1>
        </div>
    );
}

export default Withdrawal;