
import kakaoLogo from "../images/kakao.png";
import logo from '../mine/images/logo.png';
import Glogo from '../images/googleLogo.png';
import Mlogo from '../images/microsoftLogo.png';
import Nlogo from '../images/naverLogo.png';
import Klogo from '../images/kakaoLogo.png';
import gateImg from '../images/gateImg.jpg';
import redStone from '../images/redStone.png';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import MicrosoftLogin from "react-microsoft-login";

import "./gate.css";

function Gate() {
    const history = useNavigate();

    const GoogleClientId = "1037718829981-9m6h7ccbotf8buufvbbjk4ictlfcf5d0.apps.googleusercontent.com";

    const onSuccess = (response) => {
        axios.get("http://localhost:3000/callback/google", {params:{"id":response.profileObj.googleId, "email":response.profileObj.email}})
        .then(function(resp){
        localStorage.setItem("token", JSON.stringify(resp.data.token).replace(/\"/gi, ""));
		localStorage.setItem("id", JSON.stringify(resp.data.email).replace(/\"/gi, ""));

          history("/main");
        })
        .catch(function(err){
          alert(err);

          history("/");
        })
    };

    const onFailure = (response) => {
        console.log(response);
    };

    const MicrosoftClientId = "580b25cd-a912-485f-b38e-f8da5e6cb448";

    const callback = (error, response) => {
        axios.get("http://localhost:3000/callback/microsoft", {params:{"id":response.uniqueId, "email":response.idTokenClaims.preferred_username}})
        .then(function(resp){
            localStorage.setItem("token", JSON.stringify(resp.data.token).replace(/\"/gi, ""));
			localStorage.setItem("id", JSON.stringify(resp.data.email).replace(/\"/gi, ""));
            
            history("/main");
        })
        .catch(function(err){
            alert(err);
        })
    };

    const { naver } = window;

	const NAVER_CLIENT_ID = 'K2bPoji_x6vFJZrVfW0g';
	const NAVER_CALLBACK_URL = 'http://localhost:9001/callback/naver';

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: NAVER_CLIENT_ID,
			callbackUrl: NAVER_CALLBACK_URL,         
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true
		})

        naverLogin.init();
	}

    const KAKAO_AUTH_URI = "https://kauth.kakao.com/oauth/authorize?client_id=746d748ae3421ccabe20af6703c55dac&redirect_uri=http://localhost:9001/callback/kakao&response_type=code";

    useEffect(function () {
        const token = localStorage.getItem("token");

        document.getElementById("backtop").style.visibility = "hidden";

        if(token !== null){
            document.getElementById("backtop").style.visibility = "visible";
            history("/main");
        }

        initializeNaverLogin();
    }, []);

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => { window.location.href = "/" }}>
                        <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>Welcome</p>
                    </div>
                </div>
            </div>
            <div id="logo" onClick={() => {history('/')}} style={{marginLeft:"-850px", marginTop:"-30px"}}>
                <img src={logo} alt="no" width="300px" />
            </div>
            {/* <div className="loginArea">
                <h1 className="gateWord">
                    해당 서비스 계정을 통해 간편하게 접속해보세요
                </h1>

                <span class="gateBorder"></span>
            </div> */}

            <img src={gateImg} alt="" className="gateImg" />
            <img src={redStone} alt="" className="gateStone1" />
            {/* <img src={redStone} alt="" className="gateStone2" /> */}

            <span className="socialG"><GoogleLogin clientId={GoogleClientId} onSuccess={onSuccess} onFailure={onFailure} /></span>
            <span className="socialM"><MicrosoftLogin clientId={MicrosoftClientId} authCallback={callback} /></span>
            <span className="socialN" id="naverIdLogin" />
            <span className="socialK"><a href={KAKAO_AUTH_URI}><img src={kakaoLogo} alt=""/></a></span>

            <img src={Glogo} alt="" className="Glogo" />
            <img src={Mlogo} alt="" className="Mlogo" />
            <img src={Nlogo} alt="" className="Nlogo" />
            <img src={Klogo} alt="" className="Klogo" />
            
            {/* 랜더링될때마다 존재하지 않으면 오류 발생 */}
            {/* id를 사용하기 때문에 상단에 존재하면 먼저 호출되어 버그 발생 */}
            {/* hidden을 이용해 항상 존재하지만 감춤 */}
            <span hidden id="naverIdLogin" />
        </div>
    );
}

export default Gate;