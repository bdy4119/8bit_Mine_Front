import React, {useState, useEffect} from "react";
import axios from "axios";

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

    const jwt = localStorage.getItem("token");

    const showModal = () => {
        setModalOpen(true);
    };

    function hover_over(e){
        document.getElementById("hover_i").style.visibility = "visible";
    }

    function hover_out(e){
        document.getElementById("hover_i").style.visibility = "hidden";
    }

    function Check(){
        if(jwt === null){
          window.location.href = "/";
        }
        else{
            const token = jwt.split('"')[3];
        
            axios.get("http://localhost:3000/authcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === 0){
                  window.location.href = "/admin";
                }
                else if(resp.data === 2){
                  window.location.href = "/ban";
                }
            })
            .catch(function(err){
                console.log(err);
            })
            
            axios.get("http://localhost:3000/jwtcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === "fail"){
                    localStorage.removeItem("token");
                    document.getElementById("backtop").style.visibility = "none";
                    window.location.href = "/";
                }
            })
            .catch(function(err){
                alert(err);
            })
        }
      }

    useEffect(() => {
        Check();
      }, []);

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="mainbtn" onClick={(e) => {window.location.href = "/main"}}>MAIN</div>
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