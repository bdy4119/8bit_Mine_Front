import React, { useState } from "react";
import axios from "axios";

import { ReactMediaRecorder } from "react-media-recorder";

import "../main_back.css"

function Gbtest() {

    const [resp, setResp] = useState('');

    const Uploadfile = (e) => {
        e.preventDefault();

        console.log("1");
        alert("1");

        let formData = new FormData();
        formData.append("uploadFile", document.frm.uploadFile.files[0]);
        console.log("2");

        axios.post("http://localhost:3000/gb_add", formData)
            .then(function (answer) {
                alert('success');
                console.log('success : ' + answer);
                console.log(answer.data);

                setResp(answer.data.text);
            })
            .catch(function (err) {
                console.log('err : ' + err);
                alert(err);
            });

    }

    return (
        <div id="backwhite">
            
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
            <form name="frm" onSubmit={Uploadfile} encType="multipart/form-data">
                <input type="file" name="uploadFile" accept="*" />
                <input type="submit" value="file upload"/>
            </form>
            
        </div>

    );
}

export default Gbtest;
