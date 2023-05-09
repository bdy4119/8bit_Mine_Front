
import axios from "axios";
import { useEffect} from "react";
import {useNavigate } from "react-router-dom";

function Admin(){
    const history = useNavigate();

    const token = localStorage.getItem("token");

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    function check(){
        if(token === null){
            history("/");
        }
        else{
            axios.get("http://localhost:3000/authcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === 1){
                    history("/mainpage");
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
        check();
    }, []);

    return(
        <div>
            <h1>관리자 페이지</h1>

            <a href="/userlist">사용자 목록</a>
            <br />
            <a href="/reportlist">신고 내역</a>
            <br />
            <a href={kakaologout}>로그아웃</a>
        </div>
    );
}

export default Admin;