import React, {useState, useLayoutEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import "C:/react/8bit_Mine_Front/src/component/mine_back.css"
import ModalBasic from 'C:/react/8bit_Mine_Front/src/component/chatbot/chatbot';
import "./mine.css";
import pre from './images/pre.png';
import logo from './images/logo.png';

function Mine_main_two(){

    const [modalOpen, setModalOpen] = useState(false);
    const [key1, setkey1] = useState('');
    const [key2, setkey2] = useState('');
    const [key3, setkey3] = useState('');
    const [key4, setkey4] = useState('');
    const [key5, setkey5] = useState('');
    const [key6, setkey6] = useState('');


    const showModal = () => {
        setModalOpen(true);
    };

    const keylist = async() => {
        const response = await axios.post('http://localhost:3000/keylist', null, { params:{"id":"123"} });

        console.log(response.data);
        setkey1(response.data.key1);
        setkey2(response.data.key2);
        setkey3(response.data.key3);
        setkey4(response.data.key4);
        setkey5(response.data.key5);
        setkey6(response.data.key6);
    }


    useLayoutEffect(()=>{
        keylist();
    }, []);

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn">I</div>
                    <div id="mybtn">MY</div>
                    <div id="mebtn">ME</div>
                    <div id="mine_btn">MINE</div>

                    <div id="cardbtn">CARD</div>
                    <div id="bookbtn">GUEST</div>
                </div>
                <div id="logo" onClick={(e) => {window.location.href = "/"}}>
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
                <div id="modechange">
                    <div><Link to={`/mine`}>사용자 모드</Link></div>
                    <div><Link to={`/mine_edi/${1}`}>에디터 모드</Link></div>
                </div>

                <div id="pre" onClick={(e) => {window.location.href = "/mine"}}>
                    <img src={pre} alt="" width="50px"></img>
                </div>

                <div id="gameboxs">
                    <div id="gametext1">
                        "OOO"님을 대표한다고 생각하는 명사, 형용사, 동사 각 하나씩 선택해주세요.
                    </div>
                    <div>
                        <button>{key1}</button>
                        <button>{key2}</button>
                        <button>{key3}</button>
                        <button>{key4}</button>
                        <button>{key5}</button>
                        <button>{key6}</button>
                    </div>
                    <div>
                        
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Mine_main_two;