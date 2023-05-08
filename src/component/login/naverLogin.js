
// index.html <head></head> 사이에 <script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"charset="utf-8"></script> 추가
//import axios from 'axios';
import { useEffect } from 'react'
//import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
	//const history = useNavigate();

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

		/*naverLogin.getLoginStatus(async function (status) {
			if (status) {
			    const email = naverLogin.user.getEmail()
                
                axios.get("http://localhost:3000/callback/naver", {params:{"email":email}})
                .then(function(resp){
                    localStorage.setItem("token", JSON.stringify(resp));
                    
                    history("/mainpage");
                })
                .catch(function(err){
                    alert(err);
                })
			}
		});*/
	}

	useEffect(() => {
		initializeNaverLogin();
	}, [])

	return (
        <>
		    <div id="naverIdLogin" />
        </>
	)
}

export default NaverLogin;