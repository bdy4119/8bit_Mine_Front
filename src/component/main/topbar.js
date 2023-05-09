import { useState } from 'react';
import ModalBCW from '../BCWallet/WalletMain';
import ModalBasic from '../chatbot/chatbot';
import logo from '../mine/images/logo.png';
import { useNavigate } from 'react-router-dom';

function Topbar() {

    const [modalOpen, setModalOpen] = useState(false);
    const [bcwOpen, setBcwOpen] = useState(false);
    const movePage = useNavigate();

    const showModal = () => {
        setModalOpen(true);
    };

    const showBcwModal = () => {
        setBcwOpen(true);
    };

    const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

    return (
        <div>
            <div id="logo" onClick={() => {movePage('/main')}}>
                <img src={logo} alt="no" width="190px" height="80px" />
            </div>

            <div id="topbtns">
                <button onClick={(e) => { window.location.href = "/edit" }}>내 정보 수정</button>
                <button><a href={kakaologout}>로그아웃</a></button>
                <button onClick={showModal}>상담챗봇</button>
                {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
                <button onClick={showBcwModal}>명함지갑</button>
                {bcwOpen && <ModalBCW setModalOpen={setBcwOpen} />}
            </div>
        </div>
    );
}

export default Topbar;