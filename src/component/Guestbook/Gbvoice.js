import { ReactMediaRecorder } from "react-media-recorder";
import "../main_back.css"

function Gbvoice() {

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
        </div>

    );
}
export default Gbvoice;