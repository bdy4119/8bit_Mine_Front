
import logo from "../images/kakao.png";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import MicrosoftLogin from "react-microsoft-login";


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
        <div>
            <h1>Mine에 오신것을 환영합니다</h1>
            <GoogleLogin
                clientId={GoogleClientId}
                onSuccess={onSuccess}
                onFailure={onFailure}
            />
            <br />
            <MicrosoftLogin clientId={MicrosoftClientId} authCallback={callback} />
            <br />
            <div id="naverIdLogin" />
            <br />
            <a href={KAKAO_AUTH_URI}><img src={logo} alt=""/></a>
        </div>
    );
}

export default Gate;