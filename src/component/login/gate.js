import kakaoLogo from "../images/kakao.png";
import logo from '../mine/images/logo.png';
import Glogo from '../images/googleLogo.png';
import Mlogo from '../images/microsoftLogo.png';
import Nlogo from '../images/naverLogo.png';
import Klogo from '../images/kakaoLogo.png';
import redStone from '../main/images/mine_icon.png';

import { useEffect } from "react";
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

    function hovergate(e){
        document.getElementsByClassName("Glogo")[0].style.visibility = "visible";
        document.getElementsByClassName("Mlogo")[0].style.visibility = "visible";
        document.getElementsByClassName("Nlogo")[0].style.visibility = "visible";
        document.getElementsByClassName("Klogo")[0].style.visibility = "visible";
        document.getElementsByClassName("socialG")[0].style.visibility = "visible";
        document.getElementsByClassName("socialM")[0].style.visibility = "visible";
        document.getElementsByClassName("socialN")[0].style.visibility = "visible";
        document.getElementsByClassName("socialK")[0].style.visibility = "visible";
    }

    function outgate(e){
        document.getElementsByClassName("Glogo")[0].style.visibility = "hidden";
        document.getElementsByClassName("Mlogo")[0].style.visibility = "hidden";
        document.getElementsByClassName("Nlogo")[0].style.visibility = "hidden";
        document.getElementsByClassName("Klogo")[0].style.visibility = "hidden";
        document.getElementsByClassName("socialG")[0].style.visibility = "hidden";
        document.getElementsByClassName("socialM")[0].style.visibility = "hidden";
        document.getElementsByClassName("socialN")[0].style.visibility = "hidden";
        document.getElementsByClassName("socialK")[0].style.visibility = "hidden";
    }

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

            <div id="geteimg" onMouseOver={hovergate} onMouseOut={outgate}>
                <div id="geteimgline">
                    <img src={redStone} alt="" className="gateStone1" />

                    <div id="textgate">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="textgate2">MINE</span>은 광산에서 <span className="textgate2">보석</span>을 찾아내는 것처럼,<br/><br/>
                        나의 내면에 있는 <span className="textgate2">매력</span>과 <span className="textgate2">가치</span>를 <span className="textgate2">발굴</span>하고
                        <span className="textgate2">기록</span>하는 서비스입니다.<br/><br/><br/><br/>

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="textgate2">MINE</span>을 통한 새로운 시선으로 나만의 <span className="textgate2">가치</span>를 발견해보세요!
                    </div>

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
            </div>
        </div>
    );
}

export default Gate;