
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../mine/images/logo.png';

function Admin(){
    const history = useNavigate();

    const [list, setList] = useState([]);
    const [search, setSearch] = useState("");
    const [email, setEmail] = useState("");
    const [auth, setAuth] = useState("");
    const [cause, setCause] = useState("");

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    const token = localStorage.getItem("token");

    function Check(){
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

    const userList = async() => {
        await axios.get("http://localhost:3000/userlist")
        .then(function(resp){
            setList(resp.data.list);
        })
        .catch(function(err){
            alert(err);
        })
    }

    function searchUser(){
        axios.get("http://localhost:3000/searchlist", {params:{"search":search}})
        .then(function(resp){
            setSearch("");
            setList(resp.data.list);
        })
        .catch(function(err){
            alert(err);
        })
    }

    function updateState(){
        axios.get("http://localhost:3000/updateState", {params:{"email":email, "auth":auth, "cause":cause}})
        .then(function(resp){
            setEmail("");
            setAuth("");
            setCause("");
            alert("설정 완료");
        })
        .catch(function(err){
            console.log(err);
            alert("설정 내용을 입력해 주세요");
        })
    }

    useEffect(function(){
        Check();
        userList();
    }, [auth, cause]);

    return(
        <>
        <div id="topbar">
            <div id="barbtns">
                <div id="mainbtn" onClick={(e) => { window.location.href = "/admin" }}>
                    <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>Admin</p>
                </div>
            </div>
        </div>
        <div id="logo" onClick={() => {history('/admin')}} style={{marginLeft:"-850px", marginTop:"-30px"}}>
            <img src={logo} alt="no" width="300px" />
        </div>
        <div id="topbtns">
            <button><a href={kakaologout}>로그아웃</a></button>
        </div>
        <br /><br /><br />
        <div>
            <h1>사용자 목록</h1>

            <hr />

            <input type="text" placeholder="이메일로 사용자 검색" value={search} onChange={(e) => setSearch(e.target.value)} />
            &nbsp;
            <button type="button" onClick={searchUser}>검색</button>
        
            <br /><br />
            
            <input type="text" placeholder="설정할 사용자의 이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            &nbsp;
            <select value={auth} onChange={(e) => setAuth(e.target.value)}>
                <option value="">선택</option>
                <option value="1">활성</option>
                <option value="2">비활성</option>
                <option value="0">관리자</option>
            </select>
            &nbsp;
            <input type="text" placeholder="비고" value={cause} onChange={(e) => setCause(e.target.value)} />
            &nbsp;
            <button type="button" onClick={updateState}>설정</button>
            
            <br />

            <table border="">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>최초 가입</th>
                        <th>가입 날짜</th>
                        <th>상태</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                {list.map(function(dto, i){
                    return(
                    <tr key={i}>
                        <td>{dto.name}</td>
                        <td>{dto.email}</td>
                        <td>{dto.social}</td>
                        <td>{dto.regidate}</td>
                        <td>{dto.auth === 0 ? '관리자' : dto.auth === 1 ? '활성' : '비활성'}</td>
                        <td>{dto.cause}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default Admin;