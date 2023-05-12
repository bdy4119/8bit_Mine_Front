import React, { useState, useEffect } from "react";
import axios from "axios";
import "../main_back.css"
import ModalBasic from '../chatbot/chatbot';
import logo from './images/logo.png';
import mine_icon from './images/mine_icon.png';
import profile_img from './images/profileimg.png';
import "./main.css";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "./topbar";

function Main(){

    const [modalOpen, setModalOpen] = useState(false);
    const movePage = useNavigate();
    const [profMsg, setProfMsg] = useState('');
    const [profPic, setProfPic] = useState('');
    const [minenumber, setMinenumber] = useState('');
    const history = useNavigate();

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    const showModal = () => {
        setModalOpen(true);
    };

    const noticemine = async() => {
        const response = await axios.post('http://localhost:3000/noticemine', null, { params:{"id":id} });
        setMinenumber(response.data);
        console.log(response.data);
    }


    function hover_over(e) {
        document.getElementById("hover_i").style.visibility = "visible";
    }

    function hover_out(e) {
        document.getElementById("hover_i").style.visibility = "hidden";
    }

    function getUser() {
        if (token === null) {
            history("/");
        }
        else {
            axios.get("http://localhost:3000/show", { params: { "token": token } })
                .then(function (resp) {
                    setProfMsg(resp.data.profMsg);
                    setProfPic(resp.data.profPic);
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    function Check() {
        if (token === null) {
            window.location.href = "/";
        }
        else {
            axios.get("http://localhost:3000/authcheck", { params: { "token": token } })
                .then(function (resp) {
                    if (resp.data === 0) {
                        window.location.href = "/admin";
                    }
                    else if (resp.data === 2) {
                        window.location.href = "/ban";
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })

            axios.get("http://localhost:3000/jwtcheck", { params: { "token": token } })
                .then(function (resp) {
                    if (resp.data === "fail") {
                        localStorage.removeItem("token");
                        document.getElementById("backtop").style.visibility = "none";
                        window.location.href = "/";
                    }
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    useEffect(() => {
        getUser();
        Check();
        noticemine();
    }, []);

    return (
        <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => { window.location.href = "/main" }}>
                       <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>MAIN</p>
                    </div>
                </div>
            </div>
            <div /*id="toolbox"*/ style={{marginTop:"100px"}}>
                <div>
                    <div id="i_area" onMouseOver={hover_over} onMouseOut={hover_out} onClick={()=>{movePage('/i')}}>
                        <div id="inner">
                            <div id="profile"><img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="no"></img></div>
                            <div id="protext">{profMsg}</div>
                            <div id="hover_i">
                                “I” 를 채우며 “나” 에 대해 찾아가봐요
                                <br />
                                프로필 작성, N문 N답
                            </div>
                        </div>
                        <div>I</div>
                    </div>
                    <div id="me_area" onClick={() => { movePage('/me') }}>
                        <div id="inner"/>
                        ME
                    </div>
                    <div id="card_area" onClick={() => { movePage('/card') }}>
                        <div id="inner"/>
                        ONLINE CRAD
                    </div>
                    <div id="my_area" onClick={() => { movePage('/Filelist') }}>
                    <div id="inner"/>
                        MY
                    </div>
                    <div id="mine_area" onClick={(e) => {window.location.href = "/mine"}}>
                        <div id="inner">
                            {minenumber}
                        </div>
                        <div>MINE</div>
                    </div>
                    <div id="book_area" onClick={() => { movePage('/gbmain') }}>
                        <div id="inner"/>
                        GUEST BOOK
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;