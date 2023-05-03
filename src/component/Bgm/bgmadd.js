import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Bgmadd() {

    const movePage = useNavigate();

    const [id, setId] = useState('');
    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    function bgm_add() {
        axios.get('http://localhost:3000/bgm_add', { params: { "id": "test", "artist": artist, "title": title, "url": url } })
            .then(function (resp) {
                if (resp.data === "bgm_add_OK") {
                    alert('배경음악이 추가되었습니다.');
                    movePage('/bgm');
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function yt_search() {
        axios
            .get(
                'http://localhost:3000/ytSearch', { params: { "query": search } }
            )
            .then(function (resp) {
                console.log(resp);
                setList(resp.data.items);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    const chatgpt_bgm = async (title, videoId) => {
        try {
            const resp = await axios.get('http://localhost:3000/chatgpt_bgm',
                { params: { "prompt": encodeURIComponent(title) } });
            console.log(resp);
            setArtist(resp.data.artist);
            setTitle(resp.data.title);
            setUrl(`https://www.youtube.com/watch?v=${videoId}`);
        } catch (e) {
            console.log(e);
        }

    }

    function TableRow(props) {

        return (
            <tr>
                <td>{props.cnt}</td>
                <td><img src={props.obj.snippet.thumbnails.high.url} width={"100px"} height={"100px"} /></td>
                <td onClick={() => { chatgpt_bgm(`${props.obj.snippet.title}`, `${props.obj.id.videoId}`) }}>{props.obj.snippet.title}</td>
                <td>{props.obj.snippet.channelTitle}</td>
                <td>https://www.youtube.com/watch?v={props.obj.id.videoId}</td>
            </tr>
        );
    }

    return (
        <div>
            <h2>bgm 추가</h2><h6>(Powered By ChatGPT)</h6>
            <input placeholder="아티스트명" value={artist || ''} onChange={(e) => setArtist(e.target.value)} /> &nbsp;
            <input placeholder="노래 제목" value={title || ''} onChange={(e) => setTitle(e.target.value)} /> &nbsp;
            <input placeholder="Youtube URL" value={url || ''} onChange={(e) => setUrl(e.target.value)} />
            <br />
            <button onClick={bgm_add}>완료</button>
            [참고] 새로운 배경음악을 추가한 뒤에는, 반드시 메인화면을 새로고침해주세요 !!
            <br /><br />
            <hr />
            <h2>Youtube 영상 검색</h2>
            <input placeholder="아티스트 / 노래 제목" onChange={(e) => { setSearch(e.target.value) }} /><button onClick={yt_search}>검색</button>
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>썸네일</td>
                        <td>영상 제목</td>
                        <td>채널명</td>
                        <td>url</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );

}
export default Bgmadd;