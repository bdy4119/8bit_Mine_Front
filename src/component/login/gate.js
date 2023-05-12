
import kakaoLogo from "../images/kakao.png";
import logo from '../mine/images/logo.png';

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import MicrosoftLogin from "react-microsoft-login";
import "./gate.css";

function Gate() {
    const history = useNavigate();

    const [showSocialIndex, setShowSocialIndex] = useState(0);

    const prevBtn = () => {
        setShowSocialIndex((showSocialIndex - 1 + 4) % 4);
    };

    const nextBtn = () => {
        setShowSocialIndex((showSocialIndex + 1) % 4);
    };

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
    }, [showSocialIndex]);

    return (
        <div>
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

            <br /><br /><br /><br /><br />

            <div className="loginArea">
                <h1>Mine에 오신것을 환영합니다</h1>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                <div>
                    <button onClick={prevBtn}>{'<<<'}</button>
                    {showSocialIndex === 0 && <GoogleLogin clientId={GoogleClientId} onSuccess={onSuccess} onFailure={onFailure} />}
                    {showSocialIndex === 1 && <MicrosoftLogin clientId={MicrosoftClientId} authCallback={callback} />}
                    {showSocialIndex === 2 && <span id="naverIdLogin" />}
                    {showSocialIndex === 3 && <a href={KAKAO_AUTH_URI}><img src={kakaoLogo} alt=""/></a>}
                    <button onClick={nextBtn}>{'>>>'}</button>
                </div>
            </div>


            {/* 랜더링될때마다 존재하지 않으면 오류 발생 */}
            {/* id를 사용하기 때문에 상단에 존재하면 먼저 호출되어 버그 발생 */}
            {/* hidden을 이용해 항상 존재하지만 감춤 */}
            <span hidden id="naverIdLogin" />
        </div>
    );
}

export default Gate;