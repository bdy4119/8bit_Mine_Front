
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../mine/images/logo.png';
import ban from '../images/ban.png';

import './ban.css'

function Ban(){
    const history = useNavigate();

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    const token = localStorage.getItem("token");

    function Check(){
        if(token === null){
            history("/");
        }
        else{
            axios.get("http://localhost:3000/authcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === 0){
                    history("/admin");
                }
                else if(resp.data === 1){
                    history("/main");
                }
            })
            .catch(function(err){
                console.log(err);
            })
            
            axios.get("http://localhost:3000/jwtcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === "fail"){
                    localStorage.removeItem("token");

                    history("/");
                }
            })
            .catch(function(err){
                alert(err);
            })
        }
    }

    useEffect(function(){
        document.getElementById("backtop").style.visibility = "hidden";
        Check();
    }, [])

    return(
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => { window.location.href = "/ban" }}>
                       <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>Forbid</p>
                    </div>
                </div>
            </div>
            <div id="logo" onClick={() => {history('/ban')}} style={{marginLeft:"-850px", marginTop:"-30px"}}>
                <img src={logo} alt="no" width="300px" />
            </div>
            <div id="topbtns">
                <button><a href={kakaologout}>로그아웃</a></button>
            </div>
            <br /><br /><br /><br />
            <div>
                <h1 className="banWord1">해당 계정은 운영원칙 위반사항으로인해 정지된 계정입니다</h1>
            </div>
            <div>
                <img src={ban} alt="" className="banImg" />
            </div>
            <h2 className="banWord2">자세한 내용은 Mine으로 문의해주세요</h2>
        </div>
    )
}

export default Ban;