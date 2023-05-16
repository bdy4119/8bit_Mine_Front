import { useState } from 'react';
import ModalBasic from '../chatbot/chatbot';
import logo from '../mine/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import "./main.css";

function Topbar() {

    const [modalOpen, setModalOpen] = useState(false);
    const movePage = useNavigate();

    const showModal = () => {
        setModalOpen(true);
    };

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    return (
        <div>
            <div id="logo" onClick={() => { movePage('/main') }} style={{ marginLeft: "-850px", marginTop: "-30px" }}>
                <img src={logo} alt="no" width="300px" />
            </div>

            <div id="topbtns" style={{position: "absolute", marginTop: "10px"}}>
                <Button onClick={(e) => { window.location.href = "/edit" }}>내 정보 수정</Button>
                <Button><a href={kakaologout} style={{textDecoration: "none"}}>로그아웃</a></Button>
                <Button onClick={showModal}>상담챗봇</Button>
                {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
            </div>
        </div>
    );
}

export default Topbar;