import React, {useState} from "react";

import "../main_back.css"
import ModalBasic from '../chatbot/chatbot';
import logo from './images/logo.png';
import mine_icon from './images/mine_icon.png';
import profile_img from './images/profileimg.png';
import "./main.css";
import { useNavigate } from "react-router-dom";

function Main(){

    const [modalOpen, setModalOpen] = useState(false);
    const movePage = useNavigate();

    const showModal = () => {
        setModalOpen(true);
    };

    function hover_over(e){
        document.getElementById("hover_i").style.visibility = "visible";
    }

    function hover_out(e){
        document.getElementById("hover_i").style.visibility = "hidden";
    }

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => {window.location.href = "/main"}}>MAIN</div>
                </div>
                <div id="logo">
                    <img src={logo} alt="no" height="80px"/>
                </div>
                <div id="topbtns">
                    <button>정보수정</button>
                    <button>로그아웃</button>
                    <button onClick={showModal}>상담챗봇</button>
                    {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
                </div>
            </div>
            <div id="toolbox">
                <div>
                    <div id="i_area" onMouseOver={hover_over} onMouseOut={hover_out} onClick={()=>{movePage('/i')}}>
                        <div>I</div>
                        <div id="profile"><img src={profile_img} alt="no"></img></div>
                        <div id="protext">안녕 여기는 I</div>

                        <div id="hover_i">
                            “I” 를 채우며 “나” 에 대해 찾아가봐요
                            <br/>
                            프로필 작성, N문 N답
                        </div>
                    </div>
                    <div id="me_area" onClick={()=>{movePage('/me')}}>
                        ME
                    </div>
                    <div id="card_area" onClick={()=>{movePage('/card')}}>
                        ONLINE CRAD
                    </div>
                    <div id="my_area" onClick={()=>{movePage('/Filelist')}}>
                        MY
                    </div>
                    <div id="mine_area" onClick={(e) => {window.location.href = "/mine"}}>
                        <div>MINE</div>
                        <div>
                            <img src={mine_icon} alt="no" width="200px"></img>
                        </div>
                    </div>
                    <div id="book_area" onClick={()=>{movePage('/gbmain')}}>
                        GUEST BOOK
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;