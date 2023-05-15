import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';
import "../main_back.css"
import icon from "./images/mine_icon.png";
import guest_icon from "./images/guest_icon.png";
import "./main.css";
import { useNavigate } from "react-router-dom";
import Topbar from "./topbar";

function Main(){

    const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd'));
    let todayStr = today.toString();

    const [totalCnt, setTotalCnt] = useState(0);
    const[todolist, setTodolist] = useState([]);

    const movePage = useNavigate();
    const [profMsg, setProfMsg] = useState('');
    const [profPic, setProfPic] = useState('');
    const [name, setName] = useState('');
    const [minenumber, setMinenumber] = useState('');
    const [booknumber, setBooknumber] = useState('');
    const history = useNavigate();

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");


    const noticemine = async() => {
        const response = await axios.post('http://localhost:3000/noticemine', null, { params:{"id":id} });
        setMinenumber(response.data);
    }

    const noticebook = async() => {
        const response = await axios.post('http://localhost:3000/noticebook', null, { params:{"id":id} });
        setBooknumber(response.data);
    }


    function hover_over_i(e) {
        document.getElementById("hover_i").style.visibility = "visible";
    }

    function hover_out_i(e) {
        document.getElementById("hover_i").style.visibility = "hidden";
    }

    function hover_over_me(e) {
        document.getElementById("hover_me").style.visibility = "visible";
    }

    function hover_out_me(e) {
        document.getElementById("hover_me").style.visibility = "hidden";
    }

    function hover_over_card(e) {
        document.getElementById("hover_card").style.visibility = "visible";
    }

    function hover_out_card(e) {
        document.getElementById("hover_card").style.visibility = "hidden";
    }

    function hover_over_my(e) {
        document.getElementById("hover_my").style.visibility = "visible";
    }

    function hover_out_my(e) {
        document.getElementById("hover_my").style.visibility = "hidden";
    }

    function hover_over_mine(e) {
        document.getElementById("hover_mine").style.visibility = "visible";
    }

    function hover_out_mine(e) {
        document.getElementById("hover_mine").style.visibility = "hidden";
    }

    function hover_over_book(e) {
        document.getElementById("hover_book").style.visibility = "visible";
    }

    function hover_out_book(e) {
        document.getElementById("hover_book").style.visibility = "hidden";
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
                    setName(resp.data.name);
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

    function getTodolist(page) {
        axios.get("http://localhost:3000/todoList", {params:{"pageNumber":page}})
            .then(function(resp){
              setTodolist(resp.data.list);
              
              let nottoday = []; //오늘이랑 다른 날짜
              for(let i=0; i<resp.data.list.length; i++){
                if(resp.data.list[i].rdate !== todayStr
                  || (resp.data.list[i].rdate).substr(0,10) !== todayStr){
                    nottoday.push(resp.data.list[i]);
                }
              }
            //  console.log(nottoday);
              setTotalCnt(resp.data.cnt - nottoday.length);
            })
            .catch(function(err){
                alert(err);
            })
      }

      

    useEffect(() => {
        Check();
        getUser();
        noticemine();
        noticebook();
        getTodolist();
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
                    <div id="i_area" onMouseOver={hover_over_i} onMouseOut={hover_out_i} onClick={()=>{movePage('/i')}}>
                        <div id="inner">
                            <div id="profile"><img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="no"></img></div>
                            <div id="proname">{name}</div>
                            <div id="protext">{profMsg}</div>
                            <div id="hover_i">
                                “I” 를 채우며 “나” 에 대해 찾아가봐요!
                                <br /><br/>
                                프로필 작성, 나의 분류, 7문 7답
                            </div>
                        </div>
                        <div id="caterlogo">I</div>
                    </div>

                    <div id="me_area" onMouseOver={hover_over_me} onMouseOut={hover_out_me} onClick={() => { movePage('/me') }}>
                        <div id="inner">
                            <p id="todaystyle">
                                {today}
                            </p>

                            {
                                todolist.map(function(todo, idx){
                                        return (
                                            <div id="medivbox" key={idx}>

                                                <span style={{fontSize:"25px"}}>
                                                    {todo.title} &nbsp;&nbsp;&nbsp;
                                                </span>
                                                <span style={{fontSize:"25px"}}>
                                                    : {todo.content}
                                                </span>
                                            </div>
                                        )
                                })
                            }

                            <div id="hover_me">
                                “ME” 를 작성하며 "나" 의 일정을 기록해봐요!
                                <br /><br/>
                                다이어리, to-do
                            </div>
                        </div>
                        <div id="caterlogo">ME</div>
                    </div>

                    <div id="card_area" onMouseOver={hover_over_card} onMouseOut={hover_out_card} onClick={() => { movePage('/card') }}>
                        <div id="inner">

                            <div id="hover_card">
                                "Online card" 를 꾸며 "나" 를 공유해봐요!
                                <br /><br/>
                                custom 온라인 명함
                            </div>
                        </div>
                        <div id="caterlogo">ONLINE CARD</div>
                    </div>

                    <div id="my_area" onMouseOver={hover_over_my} onMouseOut={hover_out_my} onClick={() => { movePage('/Filelist') }}>
                        <div id="inner">

                            <div id="hover_my">
                                "MY" 를 통해 "나" 의 문서를 정리해봐요!
                                <br /><br/>
                                File 정리함
                            </div>
                        </div>
                        <div id="caterlogo">MY</div>
                    </div>

                    <div id="mine_area" onMouseOver={hover_over_mine} onMouseOut={hover_out_mine} onClick={(e) => {window.location.href = "/mine"}}>
                        <div id="inner">

                            <div id="mineicon">
                                <img src={icon} alt="no" width="180px"></img>
                            </div>

                            {!(minenumber === 0) && (
                                <div id="minenumber">
                                    {minenumber}
                                </div>                    
                            )} 

                            <div id="hover_mine">
                                "MINE" 을 채워나가며 "나" 를 소개해봐요!
                                <br /><br/>
                                custom 게임, 질문 방명록
                            </div>
                        </div>
                        <div id="caterlogo">MINE</div>
                    </div>


                    <div id="book_area" onMouseOver={hover_over_book} onMouseOut={hover_out_book} onClick={() => { movePage('/gbmain') }}>
                        <div id="inner">
                            
                            <div id="guesticon">
                                <img src={guest_icon} alt="no" width="180px"></img>
                            </div>

                            {!(booknumber === 0) && (
                                <div id="guestnumber">
                                    {booknumber}
                                </div>          
                            )}          

                            <div id="hover_book">
                                "Guestbook" 을 통해 소통해봐요!
                                <br /><br/>
                                음성 방명록, 친구 목록
                            </div>
                        </div>
                        <div id="caterlogo">GUESTBOOK</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;