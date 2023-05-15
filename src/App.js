import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./App.css";

import ModalBasic from './component/chatbot/chatbot';
import logo from './component/mine/images/logo.png';
import Gate from './component/login/gate';
import NaverWait from './component/login/naverWait';
import KakaoWait from './component/login/kakaoWait';
import LogoutAfter from './component/login/logoutAfter';
import Withdrawal from './component/login/withdrawal';
import Edit from './component/login/edit';
import Admin from './component/login/admin';
import Ban from './component/login/ban';

import Main from "./component/main/main";
import Mine from "./component/mine/mine_main";
import GuestMine from "./component/mine/guest_mine";
import Fullmine from "./component/mine/mine_full";
import GuestFullmine from "./component/mine/guest_mine_full";
import MineEdi from "./component/mine/mine_edi";
import MineGuestbook from "./component/mine/mine_guestbook";
import Chatbot from "./component/chatbot/chatbot";

import Friendcard from "./component/friend/friendcard";

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
import InformWrite from './component/BusinessCard/InformWrite';
import BackWrite from './component/BusinessCard/BackWrite';

import Imain from "./component/I/Imain";
import Iadd from "./component/I/Iadd";
import Idetail from "./component/I/Idetail";
import Iupdate from "./component/I/Iupdate";
import Qna7 from "./component/I/Qna10";

import Qna7 from "./component/I/Qna7";
 db9fc32ed67a198bcaed31f4c17d1a1d09c9a299
import Place from "./component/I/search/place";
import Book from "./component/I/search/book";
import Movie from "./component/I/search/movie";
import Drama from "./component/I/search/drama";
import Gbmain from "./component/Guestbook/Gbmain";
import GuestGbmain from "./component/Guestbook/guest_Gbmain";
import Gbadd from "./component/Guestbook/Gbadd";
import Gbupdate from "./component/Guestbook/Gbupdate";

import ReactPlayer from "react-player/youtube";
import Bgm from "./component/Bgm/bgm";
import Bgmadd from "./component/Bgm/bgmadd";
import axios from "axios";

import FileMain from "./component/My/FileMain";
import UpdateFile from "./component/My/UpdateFile";
import FileUpload from "./component/My/FileUpload";
import WalletUpdate from './component/BCWallet/WalletUpdate';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

import 'semantic-ui-css/semantic.min.css'
import { Button, Select } from 'semantic-ui-react'

import './App.css';
import './component/main_back.css'
import Youtube from './component/I/search/youtube';
function App() {

  const [state, setState] = useState(false);
  const [bgmlist, setBgmlist] = useState([]);
  const [seq, setSeq] = useState(0);
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [music, setMusic] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const jwt = localStorage.getItem("token");

  const showModal = () => {
    setModalOpen(true);
  };

  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/bgm_list', { params: { "id": id } });
    setBgmlist(resp.data);
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
  }, []);

  function go() {
    if (document.getElementById("selbox").value === "0") {
      return;
    }
    setState(true);
    document.getElementById("selbox").setAttribute("style", "background-color: #c3cef1; width: 350px");
  }

  function stop() {
    setState(false);
    document.getElementById("selbox").setAttribute("style", "width: 350px");
  }
  // style={{position: "absolute", left: "1000px", top: "50px"}}
  return (
    <div id="back">
      <div id="backtop">
        <div className='playlist'>
          <Form.Select id="selbox" size="sm" value={music} onChange={(e) => { music_change(e.target.value); setMusic(e.target.value); stop() }}
            style={{ width: "350px", float: "right" }} >
            <option value="0">bgm을 선택하세요.</option>
            {
              bgmlist.map(function (object, i) {
                return (
                  <Option obj={object} key={i} cnt={i + 1} />
                )
              })
            }
          </Form.Select>
        </div>
        <div className="playbutton">
          <Button color="blue" size="mini" onClick={go}>▶</Button>
          <Button color="blue" size="mini" onClick={stop}>❚❚</Button>
          <Button color="blue" size="mini" onClick={() => window.open('http://localhost:9001/bgm',
            'window_name', 'width=800,height=800,location=no, status=no,scrollbars=yes')}>
            🛠️
          </Button>

        </div>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Gate />} />
          <Route path='/callback/kakao/*' element={<KakaoWait />} />
          <Route path='/callback/naver/*' element={<NaverWait />} />
          <Route path='/kakao/logout' element={<LogoutAfter />} />
          <Route path='/kakao/withdrawal' element={<Withdrawal />} />
          <Route path='/edit' element={<Edit />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/ban' element={<Ban />} />

          <Route path="/i" element={<Imain />} />
          <Route path="/i_add" element={<Iadd />} />
          <Route path="/i_detail/:classify" exact element={<Idetail />} />
          <Route path="/i_update/:classify" exact element={<Iupdate />} />
          <Route path="/place" element={<Place />} />
          <Route path="/book" element={<Book />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/drama" element={<Drama />} />

          <Route path="/qna7" exact element={<Qna7 />} />

          <Route path="/bgm" element={<Bgm />} />
          <Route path="/bgmadd" element={<Bgmadd />} />

          <Route path="/gbmain" element={<Gbmain />} />
          <Route path="/guest_gbmain/:mineid" element={<GuestGbmain />} />
          <Route path="/gbadd/:mineid" element={<Gbadd />} />
          <Route path="/gbupdate/:seq" element={<Gbupdate />} />


          {/* me ,명함 */}
          <Route path="/me" element={<Me></Me>} />
          <Route path="/me:seq/:title/:content/:rdate/:thumbnail" element={<Me></Me>} />

          <Route path="/diaryWrite/:rdate" element={<DiaryWrite />} />
          <Route path="/todoWrite/:rdate" element={<TodoWrite />} />

          <Route path="/me/:rdate" element={<Me />} />
          <Route path="/me/:year/:month" element={<Me />} />

          <Route path="/diaryUpdate/:seq/:title/:content/:rdate/:thumbnail" element={<DiaryUpdate />} />
          <Route path="/diaryUpdate/:seq/:title/:content/:rdate" element={<DiaryUpdate />} />
          <Route path="/todoUpdate/:seq/:title/:content/:rdate" element={<TodoUpdate />} />

          <Route path="/card" element={<Card></Card>} />

          <Route path="/informDetail/:id" element={<InformDetail />} />
          <Route path="/informUpdate/:id/:seq" element={<InformUpdate />} />
          <Route path="/informWrite/:id" element={<InformWrite />} />

          <Route path="/back/:id" element={<Back />} />
          <Route path="/backUpdate/:seq" element={<BackUpdate />} />
          <Route path="/backWrite/:id" element={<BackWrite />} />

          <Route path="/main" element={<Main />} />
          <Route path="/mine" element={<Mine />} />
          <Route path="/guest_mine/:mineid" element={<GuestMine />} />
          <Route path="/mine_full" element={<Fullmine />} />
          <Route path="/guest_mine_full/:mineid" element={<GuestFullmine />} />
          <Route path="/mine_edi/:pos" element={<MineEdi />} />
          <Route path="/mine_guestbook" element={<MineGuestbook />} />
          <Route path="/chatbot" element={<Chatbot />} />

          <Route path="/friendcard/:mineid" element={<Friendcard />} />

          <Route path="/walletupdate/:seq" element={<WalletUpdate />} />

          <Route path="/Filelist" element={<FileMain />} />
          <Route path="/Filelist/:choice/:search" element={<FileMain />} />
          <Route path="/FileUpload" exact element={<FileUpload />} />
          <Route path="/UpdateFile/:seq" exact element={<UpdateFile />} />
          <Route path="/FileLobby/:mfuserId" exact element={<updateFile />} />
          <Route path="/FileUpload/:mfuserId" exact element={<updateFile />} />

        </Routes>

      </BrowserRouter>


      <ReactPlayer
        className="react-player"
        url={url}
        width="0%"
        height="0%"
        muted={false}
        playing={state}
        loop={true} />
    </div>
  );
}

export default App;