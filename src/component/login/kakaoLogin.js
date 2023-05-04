
import logo from "../images/kakao.png";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function KakaoAPI(){
    const history = useNavigate();

    const KAKAO_AUTH_URI = "https://kauth.kakao.com/oauth/authorize?client_id=746d748ae3421ccabe20af6703c55dac&redirect_uri=http://localhost:9001/callback/kakao&response_type=code";

    useEffect(function(){
        const jwt = localStorage.getItem("token");

        if(jwt !== null){
            document.getElementById("backtop").style.visibility = "visible";
            history("/main");
        }
    }, []);

    return(
        <div>
            <a href={KAKAO_AUTH_URI}><img src={logo} alt=""/></a>
        </div>
    );
}

export default KakaoAPI;
