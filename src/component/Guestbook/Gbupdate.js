import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactMediaRecorder } from "react-media-recorder";

import "../main_back.css"
import Topbar from "../main/topbar";

function Gbupdate() {

    let params = useParams();

    const [id, setId] = useState('');
    const [mineid, setMineid] = useState('');
    const [regdate, setRegdate] = useState('');
    const [comm, setComm] = useState('');
    const [filename, setFilename] = useState('');
    const [checkVal, setCheckVal] = useState(false);
    const [isvoice, setIsVoice] = useState(0);

    const movePage = useNavigate();

    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3000/gb_detail', { params: { "seq": params.seq } });

        setMineid(resp.data.toid);
        setId(resp.data.fromid);
        setRegdate(resp.data.regdate);
        setComm(resp.data.comment);
        setFilename(resp.data.filename);
        setIsVoice(resp.data.isvoice);
    }

    useEffect(() => {
        fetchData()
    }, []);

    function changeVal() {
        setCheckVal(!checkVal);
        if (!checkVal === true) {
            setIsVoice(1);
            window.open('http://localhost:9001/gbvoice', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes');
        } else {
            setIsVoice(0);
        }
    }

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
                    movePage('/guest_gbmain/' + mineid);
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function voice_del() {
        setFilename(null);
        setIsVoice(0);
    }

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
            <div id="topbar">
                <div id="barbtns">
                    <div id="guestminebtn" onClick={(e) => { window.location.href = "/guest_mine/" + mineid }}>MINE</div>
                    <div id="guestcardbtn">CARD</div>
                    <div id="guestbookbtn" onClick={(e) => { window.location.href = "/guest_gbmain/" + mineid }}>GUEST</div>
                    <div id="gohomebtn" onClick={(e) => { window.location.href = "/gbmain" }}>HOME</div>
                </div>
            </div>
            <div id="toolbox">
                <h2>방명록 수정</h2>
                <table border="1">
                    <thead />
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th>작성일시</th>
                            <td>{regdate}</td>
                        </tr>
                        <tr>
                            <th>내용</th>
                            <td><textarea defaultValue={comm} onChange={(e) => { setComm(e.target.value) }}></textarea></td>
                        </tr>
                        <tr>
                            <th>음성파일</th>
                            <td><audio id="aud" src={`${process.env.PUBLIC_URL}/voice/${filename}`} controls /></td>
                        </tr>
                        <tr>
                            <th>음성파일 관리</th>
                            <td><button onClick={voice_del}>파일 삭제</button><br />
                                <form name="frm" onSubmit={fileUpload} encType="multipart/form-data">
                                    <input type="file" name="uploadFile" accept="*" />
                                    <input type="submit" value="파일 수정" />
                                </form>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button onClick={gb_upd}>수정하기</button></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <p onClick={changeVal}>음성 파일을 새로 녹음하고 싶어요.</p>
            </div>
        </div>
    );
}

export default Gbupdate;