import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./App.css";

import ModalBasic from './component/chatbot/chatbot';
import logo from './component/mine/images/logo.png';
import Gate from './component/login/gate';
import GoogleLogin from './component/login/googleLogin';
import MicrosoftLogin from './component/login/microsoftLogin';
import KakaoLogin from './component/login/kakaoLogin';
import KakaoWait from './component/login/kakaoWait';
import MainPage from './component/login/mainPage';
import LogoutAfter from './component/login/logoutAfter';
import Withdrawal from './component/login/withdrawal';
import Edit from './component/login/edit';
import Admin from './component/login/admin';
import UserList from './component/login/userList';
import ReportList from './component/login/reportList';
import Ban from './component/login/ban';

import Main from "./component/main/main";
import Mine from "./component/mine/mine_main";
import Fullmine from "./component/mine/mine_full";
import MineEdi from "./component/mine/mine_edi";
import Chatbot from "./component/chatbot/chatbot";

import Me from "./component/Me/Me";
import DiaryWrite from "./component/Me/DiaryWrite";
import TodoWrite from './component/Me/TodoWrite';
import DiaryUpdate from './component/Me/DiaryUpdate';
import TodoUpdate from './component/Me/TodoUpdate';

import Card from "./component/BusinessCard/Card";
import InformUpdate from './component/BusinessCard/InformUpdate';
import Back from './component/BusinessCard/Back';
import BackUpdate from './component/BusinessCard/BackUpdate';
import InformDetail from './component/BusinessCard/InformDetail';
import BackWrite from './component/BusinessCard/BackWrite';

import Imain from "./component/I/Imain";
import Iadd from "./component/I/Iadd";
import Idetail from "./component/I/Idetail";
import Iupdate from "./component/I/Iupdate";
import Qna10 from "./component/I/Qna10";
import Place from "./component/I/search/place";
import Book from "./component/I/search/book";
import Movie from "./component/I/search/movie";
import Drama from "./component/I/search/drama";
import Gbmain from "./component/Guestbook/Gbmain";
import Gbadd from "./component/Guestbook/Gbadd";
import Gbupdate from "./component/Guestbook/Gbupdate";
import Gbvoice from "./component/Guestbook/Gbvoice";

import ReactPlayer from "react-player/youtube";
import Bgm from "./component/Bgm/bgm";
import Bgmadd from "./component/Bgm/bgmadd";
import axios from "axios";

import FileListSample from "./component/My/FileListSample";
import FileLobby from "./component/My/FileLobby";
import UpdateFile from "./component/My/UpdateFile";
import FileUpload from "./component/My/FileUpload";


function App() {

  const [state, setState] = useState(false);
  const [bgmlist, setBgmlist] = useState([]);
  const [seq, setSeq] = useState(0);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const jwt = localStorage.getItem("token");

  const showModal = () => {
    setModalOpen(true);
  };

  const fetchData = async () => {
    const resp = await axios.get('http://localhost:3000/bgm_list', { params: { "id": "test" } });
    setBgmlist(resp.data);
    console.log(resp);
  }

  const kakaologout = "https://kauth.kakao.com/oauth/logout?client_id=746d748ae3421ccabe20af6703c55dac&logout_redirect_uri=http://localhost:9001/kakao/logout";

  function Option(props) {
    return (
      <option value={`${props.obj.seq}`}>🎶 {props.obj.artist} - {props.obj.title}</option>
    );
  }

  function music_change(seq) {
    setSeq(seq);

    axios.get('http://localhost:3000/bgm_detail', { params: { "seq": seq } })
      .then(function (resp) {
        setArtist(resp.data.artist);
        setTitle(resp.data.title);
        setUrl(resp.data.url);
      })
      .catch(function (err) {
        alert(err);
      })
  }

  useEffect(() => {
    fetchData();

    if (jwt === null) {
      document.getElementById("backtop").style.visibility = "hidden";
    } else {
      document.getElementById("backtop").style.visibility = "visible";
    }
  }, []);

  function go() {
    setState(true);
  }

  function stop() {
    setState(false);
  }

  useEffect(function () {
    const jwt = localStorage.getItem("token");

    if (jwt == null) {
      document.getElementById("logShow").style.display = "none";
      document.getElementById("brLink").style.display = "none";
    } else {
      alert('로그인되었습니다.');
      document.getElementById("logShow").style.display = "visible";
      document.getElementById("brLink").style.display = "visible";
    }

  }, []);


  return (
    <div id="back">

      <div id="backtop">
        <button onClick={go}>재생</button>
        <button onClick={stop}>정지</button>
        <select onChange={(e) => { music_change(e.target.value) }}>
          <option value="">bgm을 선택하세요.</option>
          {
            bgmlist.map(function (object, i) {
              return (
                <Option obj={object} key={i} cnt={i + 1} />
              )
            })
          }
        </select>
        <button onClick={() => window.open('http://localhost:9001/bgm', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>bgm 관리</button>
        <p id="pwhite">현재 플레이중인 음악 : 🎶 {artist} - {title}</p>

        <div id="logo" onClick={(e) => { window.location.href = "/main" }}>
          <img src={logo} alt="no" height="80px" />
        </div>

        <div id="topbtns">
          <button onClick={(e) => { window.location.href = "/edit" }}>내 정보 수정</button>
          <button onClick={(e) => { window.location.href = "/kakao/withdrawal" }}>회원탈퇴</button>
          <button><a href={kakaologout}>로그아웃</a></button>
          <button onClick={showModal}>상담챗봇</button>
          {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
        </div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Gate />} />
          <Route path='/google' element={<GoogleLogin />} />
          <Route path='/microsoft' element={<MicrosoftLogin />} />
          <Route path='/kakao' element={<KakaoLogin />} />
          <Route path='/callback/kakao/*' element={<KakaoWait />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/kakao/logout' element={<LogoutAfter />} />
          <Route path='/kakao/withdrawal' element={<Withdrawal />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/reportlist" element={<ReportList />} />
          <Route path='/ban' element={<Ban />} />

          <Route path="/i" element={<Imain />} />
          <Route path="/i_add" element={<Iadd />} />
          <Route path="/i_detail/:classify" exact element={<Idetail />} />
          <Route path="/i_update/:classify" exact element={<Iupdate />} />
          <Route path="/place" element={<Place />} />
          <Route path="/book" element={<Book />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/drama" element={<Drama />} />

          <Route path="/qna10" exact element={<Qna10 />} />

          <Route path="/bgm" element={<Bgm />} />
          <Route path="/bgmadd" element={<Bgmadd />} />

          <Route path="/gbmain" element={<Gbmain />} />
          <Route path="/gbadd" element={<Gbadd />} />
          <Route path="/gbvoice" element={<Gbvoice />} />
          <Route path="/gbupdate/:seq" element={<Gbupdate />} />


          {/* me ,명함 */}
          <Route path="/me" element={<Me></Me>} />

          <Route path="/diaryWrite/:rdate" element={<DiaryWrite />} />
          <Route path="/todoWrite/:rdate" element={<TodoWrite />} />

          <Route path="/me/:rdate" element={<Me />} />
          <Route path="/me/:year/:month" element={<Me />} />

          <Route path="/diaryUpdate/:seq/:title/:content/:rdate" element={<DiaryUpdate />} />
          <Route path="/todoUpdate/:seq/:title/:content/:rdate" element={<TodoUpdate />} />

          <Route path="/card" element={<Card></Card>} />

          <Route path="/informDetail/:id" element={<InformDetail />} />
          <Route path="/informDetail/:id/:imgFile" element={<InformDetail />} />
          <Route path="/informUpdate/:id" element={<InformUpdate />} />

          <Route path="/back/:id" element={<Back />} />
          <Route path="/backUpdate/:seq" element={<BackUpdate />} />
          <Route path="/backWrite/:id" element={<BackWrite />} />

          <Route path="/main" element={<Main />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/mine_full" element={<Fullmine />} />
          <Route path="/mine_edi/:pos" element={<MineEdi />} />
          <Route path="/chatbot" element={<Chatbot />} />

          {<Route path="/FileLobby" element={<FileLobby />} />}
          {<Route path="/Filelist" element={<FileListSample />} />}
          {<Route path="/Filelist/:choice/:search" element={<FileListSample />} />}
          {<Route path="/FileUpload/:project" exact element={<FileUpload />} />}
          {<Route path="/FileUpload/:certificate" exact element={<FileUpload />} />}
          {<Route path="/FileUpload/:portfolio" exact element={<FileUpload />} />}
          {<Route path="/FileUpload/:picture" exact element={<FileUpload />} />}
          {<Route path="/UpdateFile/:seq" exact element={<UpdateFile />} />}
          {<Route path="/FileLobby/:mfuserId" exact element={<updateFile />} />}
          {<Route path="/FileUpload/:mfuserId" exact element={<updateFile />} />}
        </Routes>

      </BrowserRouter>


      <ReactPlayer
        className="react-player"
        url={url}
        width="0%"
        height="0%"
        muted={false} //chrome정책으로 인해 자동 재생을 위해 mute 옵션을 true로 해주었다.
        playing={state}
        loop={true} />
    </div>
  );
}

export default App;
