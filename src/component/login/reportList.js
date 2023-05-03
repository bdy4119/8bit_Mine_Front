
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReportList(){
    const history = useNavigate();

    const jwt = localStorage.getItem("token");

    function Check(){
        if(jwt === null){
            history("/");
        }
        else{
            const token = jwt.split('"')[3];

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
        Check();
    }, [])

    return(
        <div>
            <h1>신고 내역</h1>
            <a href="/admin">돌아가기</a>
        </div>
    );
}

export default ReportList;