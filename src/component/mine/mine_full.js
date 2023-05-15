import axios from "axios";
import React, {useState, useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";

import "./mine_full.css";
import bgm from './images/bgm.mp3';
import blop from './images/blop.mp3';
import clear from './images/clear.mp3';
import stage1 from './images/stage1.png';
import stage2 from './images/stage2.png';
import stage3 from './images/stage3.png';
import logo from './images/logo.png';
import cat from './images/cat.png';

function Mine_full(){

    const [b, setB] = useState('');
    const [a, setA] = useState('');
    const [answer1, setanswer1] = useState('');
    const [answer2, setanswer2] = useState('');
    const [answer3, setanswer3] = useState('');
    const [guestid, setguestid] = useState('');

    const id = localStorage.getItem("id");

    const history = useNavigate();

    const getUser = async () => {
        const jwt = localStorage.getItem("token");

        if (jwt === null) {
            history("/");
        }
    }

    const close = () => {
        window.location.href = "/mine"
    };

    const mineList = async() => {
        const response = await axios.post('http://localhost:3000/minelist', null, { params:{"id":id} });

        const c = {};
        for (let i = 0; i < response.data.length; i++) {
            const d = response.data[i];
            c[d.position] = d; 
        }
        setB(c);
    }

    const checkList = () => {

        const yn = {};

        for(let i = 1; i <= 11; i++){
            axios.post("http://localhost:3000/checkmine", null, { params:{ "id":id, "position":i} })
            .then(res => {
                if(res.data === "YES"){
                    yn[i] = true;
                }else{
                    yn[i] = false;
                }
                })
                .catch(function(err){
                alert(err);
                }) 
        }

        setA(yn);
    }

    useLayoutEffect(()=>{
        getUser();
        mineList();
        checkList();
    }, []);


    function gostart(e){

        document.getElementsByClassName("fullchild")[0].style.left = "40px";
        document.getElementsByClassName("fullchild")[0].style.top = "340px";

        document.getElementsByClassName("fullvictory")[0].style.visibility = "hidden";
        document.getElementById("fullquestion").style.visibility = "hidden";

        if (a[9]){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[9].imgtext;
        } else{
            document.getElementsByClassName("fulltextbox")[0].innerHTML = "아래 버튼을 눌러 이동하시거나 키보드 모드로 변경하세요"
        }

        var audio = document.getElementById("audio");
        audio.currentTime = 0;
        audio.play();
    }

    function finish(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let toleft = parseInt(leftpx);
        let totop = parseInt(toppx);
        var blop = document.getElementById("blop");

        if (a[1] && toleft === 100 && totop === 100){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[1].imgtext;
            blop.play();
        }
        if (a[2] && toleft === 220 && totop === 400){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[2].imgtext;
            blop.play();
        }
        if (a[3] && toleft === 340 && totop ===220){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[3].imgtext;
            blop.play();
        }
        if (a[4] && toleft === 400 && totop === 520){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[4].imgtext;
            blop.play();
        }
        if (a[5] && toleft === 520 && totop === 160){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[5].imgtext;
            blop.play();
        }
        if (a[6] && toleft === 640 && totop === 460){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[6].imgtext;
            blop.play();
        }
        if (a[7] && toleft === 760 && totop === 40){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[7].imgtext;
            blop.play();
        }
        if (a[8] && toleft === 880 && totop === 580){
            document.getElementsByClassName("fulltextbox")[0].innerHTML = b[8].imgtext;
            blop.play();
        }
        if (toleft === 940 && totop === 340){
            var clear = document.getElementById("clear");
            clear.play();
            document.getElementsByClassName("fullvictory")[0].style.visibility = "visible";
            document.getElementsByClassName("fulltextbox")[0].innerHTML = "MINE!!!"

            setTimeout(function() {
                document.getElementById("fullquestion").style.visibility = "visible";
                document.getElementsByClassName("fulltextbox")[0].innerHTML = id + "님이 설정하신 질문에 답변을 제출해주세요."
            }, 3000);
        }
    }

    function goleft(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toleft = parseInt(leftpx) - 60;
        if (toleft >= 10){
            document.getElementsByClassName("fullchild")[0].style.left = toleft + "px";
        }
        finish();
    }

    function goright(e){
        let leftpx = document.getElementsByClassName("fullchild")[0].style.left;
        let toright = parseInt(leftpx) + 60;
        if (toright <= 960){
            document.getElementsByClassName("fullchild")[0].style.left = toright + "px";
        }
        finish();
    }

    function goup(e){
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let totop = parseInt(toppx) - 60;
        if (totop >= 10){
            document.getElementsByClassName("fullchild")[0].style.top = totop + "px";
        }
        finish();
    }

    function godown(e){
        let toppx = document.getElementsByClassName("fullchild")[0].style.top;
        let todown = parseInt(toppx) + 60;
        if (todown <= 600){
            document.getElementsByClassName("fullchild")[0].style.top = todown + "px";
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
        <div id="fulltoolbox">
            <button id="close" onClick={close}>X</button>
            <div id="fullgame">
                <div className="fullstart" onClick={gostart}></div>
                <div className="fullleft" onClick={goleft}></div>
                <div className="fullup" onClick={goup}></div>
                <div className="fulldown" onClick={godown}></div>
                <div className="fullright" onClick={goright}></div>
                <div className="fullkeybutton" onClick={gokey}></div>
                <div className="fullplay" onClick={play}></div>
                <div className="fullpause" onClick={pause}></div>

                <audio id="audio" src={bgm} />
                <audio id="blop" src={blop} />
                <audio id="clear" src={clear} />

                <div className="fullcontainer">
                    <div>
                        { !a[10] && (<img src={stage1} alt="" width="990px" height="640px" />)}
                        { a[10] && (b[10].imgtext === '1' ) && (<img src={stage1} alt="" width="990px" height="640px" />)}
                        { a[10] && (b[10].imgtext === '2' ) && (<img src={stage2} alt="" width="990px" height="640px" />)}
                        { a[10] && (b[10].imgtext === '3' ) && (<img src={stage3} alt="" width="990px" height="640px" />)}
                    </div>

                    <div className="fullchild">
                        { a[9] && (<img src={process.env.PUBLIC_URL + "/img/" + b[9].newfilename} alt="child" width="70px"/>)}
                        { !a[9] && (<img src={cat} alt="cat" width="70px"/>)}
                    </div>
                    <div className="fullportal"></div>
                    <div className="fullvictory"><img src={logo} alt="vic"/></div>
                    <div>
                        {a[1] && (
                        <div className="fullpoint" id="fullfirst"><img src={process.env.PUBLIC_URL + "/img/" + b[1].newfilename} alt="point1" width="70px"/></div>
                        )}
                        {a[2] && (
                        <div className="fullpoint" id="fullsecond"><img src={process.env.PUBLIC_URL + "/img/" + b[2].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[3] && (
                        <div className="fullpoint" id="fullthird"><img src={process.env.PUBLIC_URL + "/img/" + b[3].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[4] && (
                        <div className="fullpoint" id="fullfourth"><img src={process.env.PUBLIC_URL + "/img/" + b[4].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[5] && (
                        <div className="fullpoint" id="fullfifth"><img src={process.env.PUBLIC_URL + "/img/" + b[5].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[6] && (
                        <div className="fullpoint" id="fullsixth"><img src={process.env.PUBLIC_URL + "/img/" + b[6].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[7] && (
                        <div className="fullpoint" id="fullseventh"><img src={process.env.PUBLIC_URL + "/img/" + b[7].newfilename} alt="point2" width="70px"/></div>                        
                        )}
                        {a[8] && (
                        <div className="fullpoint" id="fulleight"><img src={process.env.PUBLIC_URL + "/img/" + b[8].newfilename} alt="point2" width="70px"/></div>                        
                        )}                     
                    </div>

                    <div id="fullquestion">
                            {a[11] && (
                                <div>
                                    <div id="fulltextquestion">
                                        1. {b[11].filename}
                                        <br/><input value={answer1} onChange={(e)=>setanswer1(e.target.value)}></input><br/><br/>
                                        2. {b[11].newfilename}
                                        <br/><input value={answer2} onChange={(e)=>setanswer2(e.target.value)}></input><br/><br/>
                                        3. {b[11].imgtext}
                                        <br/><input value={answer3} onChange={(e)=>setanswer3(e.target.value)}></input><br/><br/>
                                    </div>
                                    <div id="fullsubquestion">
                                        방문자 : <input value={guestid} onChange={(e)=>setguestid(e.target.value)}></input>
                                        <button>제출</button>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>

                <div className="fulltextbox">START 버튼을 눌러주세요</div>
                <div><input id="keybutton" onKeyDown={handleKeyPress} /></div>
            </div>
        </div>
    )
}

export default Mine_full;