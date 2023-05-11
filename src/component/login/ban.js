
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
        Check();
    }, [])

    return(
        <div>
            <h1>정지된 계정입니다</h1>
            <a href={kakaologout}>로그아웃</a>
        </div>
    )
}

export default Ban;