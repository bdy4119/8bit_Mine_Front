
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Edit(){
    const history = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userDate, setUserDate] = useState("");
    const [userSocial, setUserSocial] = useState("");

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

    function getUser(){
        if(jwt === null){
            history("/");
        }
        else{
            const token = jwt.split('"')[3];

            axios.get("http://localhost:3000/show", {params:{"token":token}})
            .then(function(resp){
                setUserEmail(resp.data.email);
                setUserName(resp.data.name);
                setUserDate(resp.data.regidate);
                setUserSocial(resp.data.social);
            })
            .catch(function(err){
                alert(err);
            })
        }
    }

    function editAf(){
        const token = jwt.split('"')[3];

        axios.get("http://localhost:3000/edit", {params:{"name":userName, "token":token}})
        .then(function(resp){
            alert(resp.data);
        })
        .catch(function(err){
            alert(err);
        })
    }

    function goback(){
        history("/main");
    }

    useEffect(function(){
        Check();
        getUser();
    }, [])

    return(
        <div>
            <h1>내 정보 수정</h1>
            이메일: &nbsp;
            <input type="text" value={userEmail} readOnly="readOnly" />
            <br />
            이름: &nbsp;
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            가입 날짜: &nbsp;
            <input type="text" value={userDate} readOnly="readOnly" />
            <br />
            최초 가입: &nbsp;
            <input type="text" value={userSocial} readOnly="readOnly" />
            <br />
            <button type="button" onClick={editAf}>수정</button>
            <br />
            <button type="button" onClick={goback}>돌아가기</button>
        </div>
    );
}

export default Edit;