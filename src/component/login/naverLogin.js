
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const NaverLogin = () => {
	const history = useNavigate();

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

	useEffect(() => {
		const token = localStorage.getItem("token");

        if(token !== null){
            document.getElementById("backtop").style.visibility = "visible";
            history("/main");
        }

		initializeNaverLogin();
	}, [])

	return (
        <>
		    <div id="naverIdLogin" />
        </>
	)
}

export default NaverLogin;