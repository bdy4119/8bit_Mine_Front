import { useState } from 'react';
import ModalBasic from '../chatbot/chatbot';
import logo from '../mine/images/logo.png';
import { useNavigate } from 'react-router-dom';
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

            <div id="topbtns">
                <button id="topbtnsImg" onClick={(e) => { movePage("/edit") }}>내 정보 수정</button>
                <button id="topbtnsImg"><a href={kakaologout}  id="topbtnsImg">로그아웃</a></button>
                <button id="topbtnsImg"onClick={showModal}>상담챗봇</button>
                {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
            </div>
        </div>
    );
}

export default Topbar;