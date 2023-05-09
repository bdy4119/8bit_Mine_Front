import React, { useState } from "react";
import axios from "axios";

import { ReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from "react-router-dom";

import "../main_back.css"
import Topbar from "../main/topbar";

function Gbadd() {

  const [checkVal, setCheckVal] = useState(false);
  const [comm, setComm] = useState('');
  const [isvoice, setIsVoice] = useState(0);
  const [fromid, setFromid] = useState('');
  const [toid, setToid] = useState('');
  const [filename, SetFilename] = useState('');

  const movePage = useNavigate();

  function changeVal() {
    setCheckVal(!checkVal);
    if (!checkVal === true) {
      setIsVoice(1);
    } else {
      setIsVoice(0);
    }
  }

  function gb_add() {
    axios.get('http://localhost:3000/gb_add', {
      params: {
        "toid": "snaro0123@gmail.com", "toname": "준", "fromid": "gbtest@abc.com", "fromname": "테스트",
        "comment": comm, "isvoice": isvoice, "filename": filename
      }
    })
      .then(function (resp) {
        if (resp.data === 'gb_add_OK') {
          alert('방명록이 작성되었습니다.');
          movePage('/gbmain');
        }
      })
      .catch(function (err) {
        alert(err);
      })
  }

  function VoiceComm() {
    if (checkVal === true) {
      return (
        <div style={{ marginLeft: "20px", backgroundColor: "white" }}>

          <br />
          <ReactMediaRecorder
            audio
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
              <div>
                {/* 녹음상태 */}
                <p>{status}</p>
                {/* 녹음시작 */}
                <button onClick={startRecording}>start Recording</button><br />
                {/* 녹음종료 */}
                <button onClick={stopRecording}>stop Recording</button><br />
                {/* 녹음된 내용 재생bar */}
                <audio src={mediaBlobUrl} controls></audio><br />
                {/* 녹음파일 Chrome에서 다운로드 */}
                <a href={mediaBlobUrl} download="mysound.wav">download</a>
              </div>

            )}
          />


          <hr />
          <h2>음성 파일 upload</h2>
          <form name="frm" onSubmit={fileUpload} encType="multipart/form-data">
            <input type="file" name="uploadFile" accept="*" />
            <input type="submit" value="file upload" />
          </form>
          <p>[참고] 음성파일 내용이 자동으로 방명록에 작성됩니다. (수정 가능)</p>

        </div>
      );
    } else {
      return;
    }
  }

  const fileUpload = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("uploadFile", document.frm.uploadFile.files[0]);

    axios.post("http://localhost:3000/sttUpload", formData)
      .then(function (answer) {
        let text = answer.data.resp.substring(9, answer.data.resp.length - 2);
        setComm(text);
        SetFilename(answer.data.filename);
      })
      .catch(function (err) {
        alert(err);
      });
  }


  return (
    <div>
      <Topbar />
      <div id="backwhite">

        <h2>방명록 작성</h2>
        <textarea value={comm} onChange={(e) => setComm(e.target.value)}></textarea><br />
        <input type="checkbox" onChange={changeVal} value={checkVal} /> 음성방명록 여부<br />
        <button onClick={gb_add}>방명록 작성</button>
        {/* <button onClick={gb_add}>방명록 작성</button> */}
        <VoiceComm />
      </div>
    </div>
  );
}

export default Gbadd;