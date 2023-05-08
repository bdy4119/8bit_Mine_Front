import React, {useState, useEffect, useLayoutEffect} from "react";
import axios from "axios";

import "../mine_back.css"
import "./mine.css";
import bgm from './images/bgm.mp3';
import blop from './images/blop.mp3';
import clear from './images/clear.mp3';
import stage1 from './images/stage1.png';
import stage2 from './images/stage2.png';
import stage3 from './images/stage3.png';
import logo from './images/logo.png';
import cat from './images/cat.png';
import Topbar from "../main/topbar";

function Mine_main(){

    const id = localStorage.getItem("id");

    const [b, setB] = useState({});
    const [a, setA] = useState({});
    const [answer1, setanswer1] = useState('');
    const [answer2, setanswer2] = useState('');
    const [answer3, setanswer3] = useState('');
    const [guestid, setguestid] = useState('');
    

    useEffect(() => {
        const mineList = async () => {
            const response = await axios.post("http://localhost:3000/minelist", null, {
              params: { "id": "123" },
            });
        
            const c = {};
            for (let i = 0; i < response.data.length; i++) {
              const d = response.data[i];
              c[d.position] = d;
            }
            setB(c);
            console.log(b);
        };

        const checkList = async () => {
          const yn = {};
    
          for (let i = 1; i <= 11; i++) {
            try {
              const res = await axios.post(
                "http://localhost:3000/checkmine",
                null,
                { params: { "id": "123", "position": i } }
              );
              if (res.data === "YES") {
                yn[i] = true;
              } else {
                yn[i] = false;
              }
            } catch (err) {
              alert(err);
            }
          }
          setA(yn);
          console.log(a);
        };
    
        mineList();
        checkList();
      }, []);

    function gostart(e){
        document.getElementsByClassName("child")[0].style.left = "20px";
        document.getElementsByClassName("child")[0].style.top = "200px";

        document.getElementsByClassName("start")[0].style.visibility = "hidden";
        document.getElementsByClassName("victory")[0].style.visibility = "hidden";
        document.getElementById("question").style.visibility = "hidden";

        if (a[9]){
            document.getElementsByClassName("textbox")[0].innerHTML = b[9].imgtext;
        } else{
            document.getElementsByClassName("textbox")[0].innerHTML = "아래 버튼을 눌러 이동하시거나 키보드 모드로 변경하세요"
        }

        var audio = document.getElementById("audio");
        audio.play();
    }

    function finish(e){
        let leftpx = document.getElementsByClassName("child")[0].style.left;
        let toppx = document.getElementsByClassName("child")[0].style.top;
        let toleft = parseInt(leftpx);
        let totop = parseInt(toppx);
        var blop = document.getElementById("blop");

        if (a[1] && toleft === 80 && totop === 110){
            document.getElementsByClassName("textbox")[0].innerHTML = b[1].imgtext;
            blop.play();
        }
        if (a[2] && toleft === 140 && totop === 290){
            document.getElementsByClassName("textbox")[0].innerHTML = b[2].imgtext;
            blop.play();
        }
        if (a[3] && toleft === 200 && totop === 80){
            document.getElementsByClassName("textbox")[0].innerHTML = b[3].imgtext;
            blop.play();
        }
        if (a[4] && toleft === 260 && totop === 320){
            document.getElementsByClassName("textbox")[0].innerHTML = b[4].imgtext;
            blop.play();
        }
        if (a[5] && toleft === 320 && totop === 140){
            document.getElementsByClassName("textbox")[0].innerHTML = b[5].imgtext;
            blop.play();
        }
        if (a[6] && toleft === 380 && totop === 50){
            document.getElementsByClassName("textbox")[0].innerHTML = b[6].imgtext;
            blop.play();
        }
        if (a[7] && toleft === 440 && totop === 110){
            document.getElementsByClassName("textbox")[0].innerHTML = b[7].imgtext;
            blop.play();
        }
        if (a[8] && toleft === 500 && totop === 260){
            document.getElementsByClassName("textbox")[0].innerHTML = b[8].imgtext;
            blop.play();
        }
        if (toleft >= 520 && totop === 200){
            var clear = document.getElementById("clear");
            clear.play();
            document.getElementsByClassName("victory")[0].style.visibility = "visible";
            document.getElementsByClassName("textbox")[0].innerHTML = "MINE!!!"

            setTimeout(function() {
                document.getElementById("question").style.visibility = "visible";
                document.getElementsByClassName("textbox")[0].innerHTML = id + "님이 설정하신 질문에 답변을 제출해주세요."
            }, 3000);
        }
    }

    function goleft(e){
        let leftpx = document.getElementsByClassName("child")[0].style.left;
        let toleft = parseInt(leftpx) - 30;
        if (toleft >= 10){
            document.getElementsByClassName("child")[0].style.left = toleft + "px";
        }
        finish();
    }

    function goright(e){
        let leftpx = document.getElementsByClassName("child")[0].style.left;
        let toright = parseInt(leftpx) + 30;
        if (toright <= 560){
            document.getElementsByClassName("child")[0].style.left = toright + "px";
        }
        finish();
    }

    function goup(e){
        let toppx = document.getElementsByClassName("child")[0].style.top;
        let totop = parseInt(toppx) - 30;
        if (totop >= 10){
            document.getElementsByClassName("child")[0].style.top = totop + "px";
        }
        finish();
    }

    function godown(e){
        let toppx = document.getElementsByClassName("child")[0].style.top;
        let todown = parseInt(toppx) + 30;
        if (todown <= 330){
            document.getElementsByClassName("child")[0].style.top = todown + "px";
        }
        finish();
    }

    function gokey(e){
        document.getElementById("keybutton").focus();
    }

    const handleKeyPress = e => {
        if(e.keyCode === 37) {
            goleft();
        }
        if(e.keyCode === 38) {
            goup();
        }
        if(e.keyCode === 39) {
            goright();
        }
        if(e.keyCode === 40) {
            godown();
        }
      }

    function play(e){
        var audio = document.getElementById("audio");
        audio.play();
    }
    
    function pause(e){
        var audio = document.getElementById("audio");
        audio.pause();
    }
    
    return (
        <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn">I</div>
                    <div id="mybtn">MY</div>
                    <div id="mebtn">ME</div>
                    <div id="mine_btn">MINE</div>

                    <div id="cardbtn">CARD</div>
                    <div id="bookbtn">GUEST</div>
                </div>
            </div>
            <div id="toolbox">
                <div id="modechange">
                    <audio id="audio" src={bgm} />
                    <audio id="blop" src={blop} />
                    <audio id="clear" src={clear} />

                    <div>
                        <button onClick={(e) => {window.location.href = "/mine"}}>사용자 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_edi/1"}}>에디터 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_guestbook"}}>방명록</button>
                    </div>
                </div>

                <div id="game">
                    <div className="left" onClick={goleft}></div>
                    <div className="up" onClick={goup}></div>
                    <div className="down" onClick={godown}></div>
                    <div className="right" onClick={goright}></div>
                    <div className="refresh" onClick={gostart}></div>
                    <div className="keybutton" onClick={gokey}></div>
                    <div className="play" onClick={play}></div>
                    <div className="pause" onClick={pause}></div>
                    <div className="showfull" onClick={(e) => {window.location.href = "/mine_full"}}></div>

                    <div className="container">
                        <div className="start" onClick={gostart}></div>
                        <div>
                            { !a[10] && (<img src={stage1} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '1' ) && (<img src={stage1} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '2' ) && (<img src={stage2} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '3' ) && (<img src={stage3} alt="" width="577px" height="347px" />)}
                        </div>

                        <div className="child">
                            { a[9] && (<img src={process.env.PUBLIC_URL + "/img/" + b[9].newfilename} alt="child" width="40px"/>)}
                            {!a[9] && (<img src={cat} alt="cat" width="40px"/>)}
                        </div>
                        <div className="portal"></div>
                        <div className="victory"><img src={logo} alt="vic"/></div>
                        <div>
                            {a[1] && (
                            <div className="point" id="first"><img src={process.env.PUBLIC_URL + "/img/" + b[1].newfilename} alt="point1" width="30px"/></div>
                            )}
                            {a[2] && (
                            <div className="point" id="second"><img src={process.env.PUBLIC_URL + "/img/" + b[2].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[3] && (
                            <div className="point" id="third"><img src={process.env.PUBLIC_URL + "/img/" + b[3].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[4] && (
                            <div className="point" id="fourth"><img src={process.env.PUBLIC_URL + "/img/" + b[4].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[5] && (
                            <div className="point" id="fifth"><img src={process.env.PUBLIC_URL + "/img/" + b[5].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[6] && (
                            <div className="point" id="sixth"><img src={process.env.PUBLIC_URL + "/img/" + b[6].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[7] && (
                            <div className="point" id="seventh"><img src={process.env.PUBLIC_URL + "/img/" + b[7].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {a[8] && (
                            <div className="point" id="eight"><img src={process.env.PUBLIC_URL + "/img/" + b[8].newfilename} alt="point2" width="30px"/></div>                        
                            )}                     
                        </div>

                        <div id="question">
                            {a[11] && (
                                <div>
                                    <div id="textquestion">
                                        방문자 : <input value={guestid} onChange={(e)=>setguestid(e.target.value)}></input><br/><br/>
                                        1. {b[11].filename}
                                        <br/><input value={answer1} onChange={(e)=>setanswer1(e.target.value)}></input><br/><br/>
                                        2. {b[11].newfilename}
                                        <br/><input value={answer2} onChange={(e)=>setanswer2(e.target.value)}></input><br/><br/>
                                        3. {b[11].imgtext}
                                        <br/><input value={answer3} onChange={(e)=>setanswer3(e.target.value)}></input><br/><br/>
                                    </div>
                                    <button>제출</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="textbox">START 버튼을 눌러주세요</div>
                    <div><input id="keybutton" onKeyDown={handleKeyPress} /></div>
                </div>

            </div>
        </div>
    )
}

export default Mine_main;