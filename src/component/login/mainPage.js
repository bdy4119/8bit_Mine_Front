
import axios from "axios";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

function Main(){

    const history = useNavigate();

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    const jwt = localStorage.getItem("token");
    
    function Check(){
        if(jwt === null){
            history("/");
        }
        else{
            const token = jwt.split('"')[3];
        
            axios.get("http://localhost:3000/authcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === 0){
                    history("/admin");
                }
                else if(resp.data === 2){
                    history("/ban");
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
    }, [jwt]);

    return(
        <div>
            <h1>Main Page</h1>
            <a href={kakaologout}>로그아웃</a>
            <br />
            <a href="/kakao/withdrawal">회원탈퇴</a>
            <br />
            <a href="/edit">내 정보 수정</a>
            <br />
        </div>
    );
}

export default Main;