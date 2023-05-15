import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ReactMediaRecorder } from "react-media-recorder";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";

import { Button, TextArea } from 'semantic-ui-react'
import "./Gbmain.css";
import "../main_back.css"

import purpled from "./image/purpled.png";
import greend from "./image/greend.png";
import redd from "./image/redd.png";
import blued from "./image/mine_icon.png";

function Gbupdate() {

    // 변수 선언
    let params = useParams();
    const history = useNavigate();
    const fileInput = useRef();

    const [toid, setToid] = useState('');
    const [fromid, setFromid] = useState('');
    const [comm, setComm] = useState('');
    const [filename, setFilename] = useState('');
    const [checkVal, setCheckVal] = useState(false);
    const [isvoice, setIsVoice] = useState(0);
    const [voiceStat, setVoiceStat] = useState(true);

    // 접속 권한 체크
    const getUser = async () => {
        const jwt = localStorage.getItem("token");

        if (jwt === null) {
            history("/");
        }
    }

    // 기존에 작성한 방명록 데이터 불러오기
    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3000/gb_detail', { params: { "seq": params.seq } });

        console.log(resp);

        setToid(resp.data.toid);
        setFromid(resp.data.fromid);
        setComm(resp.data.comment);
        setFilename(resp.data.filename);
        setIsVoice(resp.data.isvoice);

        if (localStorage.getItem("id") !== resp.data.fromid) {
            alert('방명록 수정 권한이 없습니다.');
            history('/main');
        }
    }

    useEffect(() => {
        getUser();
        fetchData()
    }, []);

    // 음성방명록 여부 체크
    function changeVal() {
        setCheckVal(!checkVal);
        if (!checkVal === true) {
            setIsVoice(1);
            window.open('http://localhost:9001/gbvoice', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes');
        } else {
            setIsVoice(0);
        }
    }

    // 음성파일 삭제
    function voice_del() {
        setFilename(null);
        setIsVoice(0);
        fileInput.current.value = "";
    }

    // 방명록 수정
    function gb_upd() {
        axios.get('http://localhost:3000/gb_upd', {
            params: {
                "seq": params.seq, "comment": comm,
                "isvoice": isvoice, "filename": filename
            }
        })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_upd_OK') {
                    alert('방명록이 수정되었습니다.');
                    history('/guest_gbmain/' + toid);
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
                alert('파일이 수정되었습니다.');
                setComm(text);
                setIsVoice(1);
                setFilename(answer.data.filename);
            })
            .catch(function (err) {
                alert(err);
            });
    }

    return (
        <div id="back">

            <Topbar />
            <Barbtns />

            <div className="gbaddTitle">

                <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-10px", marginTop: "20px" }} />&nbsp;

                <h2 style={{ fontSize: "40px", marginLeft: "80px" }}>방명록 수정</h2>
                <div className="vc">
                    <input type="checkbox" onChange={changeVal} value={checkVal} /> 음성방명록 여부<br />
                </div>
                <br />

                <TextArea value={comm} style={{ height: "200px", width: "700px", fontSize: "20px", resize: "none", padding: "20px" }}
                    placeholder=" 음성 파일을 업로드해보세요. 방명록이 자동으로 완성됩니다."
                    onChange={(e) => setComm(e.target.value)} /><br />

                <Button color="purple" size="large" style={{ marginTop: "15px", marginLeft: "565px" }} button onClick={gb_upd}>방명록 수정</Button>
            </div>

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
                                <a style={{ position: "absolute", marginLeft: "320px", marginTop: "10px" }} href={mediaBlobUrl} download="mysound.wav">다운로드</a>
                            </div>

                        )}

                    /></div>
                <br /><br /><br /><br /><hr /><br />

                <img src={greend} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-20px", marginTop: "px" }} />&nbsp;
                <h2 style={{ fontSize: "40px", marginLeft: "60px", marginTop: "-5px" }}>음성파일 업로드</h2>
                <br />

                <form name="frm" onSubmit={fileUpload} encType="multipart/form-data">
                    <input type="file" ref={fileInput} name="uploadFile" accept="*" />
                    <Button color="green" size="large" type="submit">업로드</Button>
                </form>
                <Button color="red" size="large" onClick={voice_del} style={{ position: "absolute", marginLeft: "460px", marginTop:"-42px" }} >삭제</Button>

            </div>

        </div>
    );
}

export default Gbupdate;