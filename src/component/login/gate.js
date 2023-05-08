import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Gate() {
    const history = useNavigate();

    useEffect(function () {
        const jwt = localStorage.getItem("token");

        document.getElementById("backtop").style.visibility = "hidden";

        if(jwt !== null){
            document.getElementById("backtop").style.visibility = "visible";
            history("/main");
        }
    }, []);

    return (
        <div>
            <h1>Mine에 오신것을 환영합니다</h1>
            <a href="/google">구글로 접속</a>
            <br />
            <a href="/microsoft">마소로 접속</a>
            <br />
            <a href="/kakao">카카오로 접속</a>
            <br />
            <a href="/naver">네이버로 접속</a>
        </div>
    );
}

export default Gate;