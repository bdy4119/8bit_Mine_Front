import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";

import { Button, TextArea } from 'semantic-ui-react'
import "./Gbmain.css";
import "../main_back.css"

import purpled from "./image/purpled.png";
import greend from "./image/greend.png";
import redd from "./image/redd.png";
import blued from "./image/mine_icon.png";

function Gbadd() {

  let params = useParams();
  const history = useNavigate();

  const [checkVal, setCheckVal] = useState(false);
  const [comm, setComm] = useState('');
  const [isvoice, setIsVoice] = useState(0);
  const [toname, setToname] = useState('');
  const [fromname, setFromname] = useState('');
  const [filename, setFilename] = useState('');
  const [voiceStat, setVoiceStat] = useState(true);

  // 접속 권한 체크
  const getUser = async () => {
    const jwt = localStorage.getItem("token");

    if (jwt === null) {
      history("/");
    }
  }

  // Mine 주인과 방명록 작성자 지정
  const fetchData = async () => {
    const tid = params.mineid;
    const fid = localStorage.getItem("id");

    const resp1 = await axios.get('http://localhost:3000/getItems', { params: { "email": tid } });
    setToname(resp1.data.name);

    const resp2 = await axios.get('http://localhost:3000/getItems', { params: { "email": fid } });
    setFromname(resp2.data.name);

    if (tid === fid) {
      alert('나의 방명록에는 글을 남길 수 없습니다.');
    }
  }

  useEffect(() => {
    getUser();
    fetchData();
  }, []);

  // 음성방명록 여부 체크
  function changeVal() {
    setCheckVal(!checkVal);
    if (!checkVal === true) {
      setIsVoice(1);
    } else {
      setIsVoice(0);
    }
  }

  // 음성파일 삭제
  function voice_del() {
    setFilename(null);
    setIsVoice(0);
  }

  // 방명록 추가
  function gb_add() {
    const tid = params.mineid;
    const fid = localStorage.getItem("id");

    axios.get('http://localhost:3000/gb_add', {
      params: {
        "toid": tid, "toname": toname, "fromid": fid, "fromname": fromname,
        "comment": comm, "isvoice": isvoice, "filename": filename
      }
    })

      .then(function (resp) {
        if (resp.data === 'gb_add_OK') {
          alert('방명록이 작성되었습니다.');
          history('/guest_gbmain/' + tid);
        }
      })

      .catch(function (err) {
        alert(err);
      })
  }

  // Naver STT
  const fileUpload = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("uploadFile", document.frm.uploadFile.files[0]);

    axios.post("http://localhost:3000/sttUpload", formData)
      .then(function (answer) {
        let text = answer.data.resp.substring(9, answer.data.resp.length - 2);
        setComm(text);
        setFilename(answer.data.filename);
      })
      .catch(function (err) {
        alert('파일 업로드 오류입니다. 파일이 존재하지 않거나, 크기가 너무 큽니다.')
      });
  }

  // 음성 녹음 및 등록, 업로드
  function VoiceComm() {
    return (
      <div className="vocom" style={{ width: "600px" }}>
        <img src={greend} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-20px", marginTop: "20px" }} />&nbsp;
        <h2 style={{ fontSize: "40px", marginLeft: "60px" }}>음성 녹음 및 등록</h2>
        <br />

        <div style={{ marginLeft: "60px" }}>
          <ReactMediaRecorder
            audio
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (

              <div>
                {/* 녹음된 내용 재생bar */}
                <audio src={mediaBlobUrl} controls ></audio><br />

                {/* 녹음상태 */}
                <div className="aud">{status === 'recording' ?
                  <p style={{ color: "red", fontWeight: "bold" }}><img src={redd} width="40px" height="40px" style={{ position: "absolute", marginTop: "-10px", marginLeft: "-30px" }} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;녹음 중</p>
                  : <p style={{ color: "blue", fontWeight: "bold" }}><img src={blued} width="40px" height="40px" style={{ position: "absolute", marginTop: "-10px", marginLeft: "-30px" }} />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;녹음 대기</p>}</div><br />

                <div style={{ position: "absolute", marginLeft: "60px" }}>
                  {/* 녹음시작 */}
                  <Button size="large" color="red" onClick={startRecording}>녹음 시작</Button>

                  {/* 녹음종료 */}
                  <Button size="large" color="green" onClick={() => { stopRecording(); setVoiceStat(false) }}>녹음 완료</Button><br /><br />
                </div>

                {/* 녹음파일 Chrome에서 다운로드 */}
                <Link><a style={{ position: "absolute", marginLeft: "320px", marginTop:"10px" }} href={mediaBlobUrl} download="mysound.wav">다운로드</a></Link>
              </div>

            )}
          /></div>
        <br /><br /><br /><br /><hr /><br />

        <img src={greend} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-20px", marginTop: "px" }} />&nbsp;
        <h2 style={{ fontSize: "40px", marginLeft: "60px", marginTop: "-5px" }}>음성파일 업로드</h2>
        <br />
        <form name="frm" onSubmit={fileUpload} encType="multipart/form-data">
          <input type="file" name="uploadFile" accept="*" />
          <Button color="green" size="large" type="submit">업로드</Button>
          <Button color="red" size="large" onClick={voice_del} style={{ position: "absolute", marginLeft: "10px" }} >삭제</Button>
        </form>

      </div>
    );
  }

  return (
    <div id="back">

      <Topbar />
      <Barbtns />

      <div className="gbaddTitle">

        <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-10px", marginTop: "20px" }} />&nbsp;

        <h2 style={{ fontSize: "40px", marginLeft: "80px" }}>방명록 작성</h2>
        <div className="vc">
          <input type="checkbox" onChange={changeVal} value={checkVal} /> 음성방명록 여부<br />
        </div>
        <br />

        <TextArea value={comm} style={{ height: "200px", width: "700px", fontSize: "20px", resize: "none", padding: "20px" }}
          placeholder=" 음성 파일을 업로드해보세요. 방명록이 자동으로 완성됩니다."
          onChange={(e) => setComm(e.target.value)} /><br />



        <Button color="purple" size="large" style={{ marginTop: "15px", marginLeft: "565px" }} onClick={gb_add}>방명록 작성</Button>
      </div>

      <VoiceComm />

    </div>
  );
}

export default Gbadd;