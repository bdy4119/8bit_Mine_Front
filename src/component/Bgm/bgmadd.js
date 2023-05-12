import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cglogo from "./ChatGptLogo.png";
import ytlogo from "./youtube_logo.png";

import redd from "../I/image/redd.png";
import greend from "../I/image/greend.png";

import "./bgmcss.css";

import { Table, Button, Input } from 'semantic-ui-react'

function Bgmadd() {

    const movePage = useNavigate();

    function getUser() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            movePage("/");
        }

    }

    useEffect(() => {
        getUser();
    }, []);

    const [artist, setArtist] = useState('');
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    function bgm_add() {
        const id = localStorage.getItem("id");
        axios.get('http://localhost:3000/bgm_add', { params: { "id": id, "artist": artist, "title": title, "url": url } })
            .then(function (resp) {
                if (resp.data === "bgm_add_OK") {
                    alert('BGM이 추가되었습니다. 메인화면을 새로고침해주세요.');
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
                'http://localhost:3000/ytSearch', { params: { "query": encodeURIComponent(search) } }
            )
            .then(function (resp) {
                console.log(resp);
                setList(resp.data.items);
                alert('검색을 완료했습니다.\n영상 제목을 누르면 아티스트, 노래 제목, url이 자동으로 입력됩니다.');
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
            <Table.Row>
                <Table.Cell><img src={props.obj.snippet.thumbnails.high.url} width={"100px"} height={"100px"} /></Table.Cell>
                <Table.Cell onClick={() => { chatgpt_bgm(`${props.obj.snippet.title}`, `${props.obj.id.videoId}`) }}>{props.obj.snippet.title}</Table.Cell>
                <Table.Cell>{props.obj.snippet.channelTitle}</Table.Cell>
            </Table.Row>
        );
    }

    return (
        <div id="back" style={{backgroundImage:{}}}>
            <img src={redd} width="60px" height="60px" style={{ marginTop: "0px", marginLeft: "20px" }} />
            <div className="bstitle">
                <h2 style={{ fontSize: "35px" }}>노래 검색</h2>
            </div>
            <div className="pwYt">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>
            <div className="ytlogo">
                <img src={ytlogo} width="120px" height="26px" />
            </div>
            <div className="ytSearch">
                <Input size="small" style={{ marginTop:"-8px", width: "380px", fontSize: "12px" }} placeholder="아티스트 / 노래 제목" onChange={(e) => { setSearch(e.target.value) }} />
                &nbsp; <Button size="tiny" color="red" onClick={yt_search}>검색</Button>
            </div>

            <div className="searchlist">
                <Table color="olive" textAlign="center" >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>썸네일</Table.HeaderCell>
                            <Table.HeaderCell>영상 제목</Table.HeaderCell>
                            <Table.HeaderCell>채널명</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            list.map(function (object, i) {
                                return (
                                    <TableRow obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            <img src={greend} width="60px" height="60px" style={{ position: "absolute", marginTop: "135px", marginLeft: "-60px" }} />
            <div className="addtitle">
                <h2 style={{ fontSize: "35px" }}>BGM 추가</h2>
            </div>
            <div className="pwCg">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>
            <div className="cglogo">
                <img src={cglogo} width="180px" height="108px" />
            </div>

            <div className="cgSearch">
                <Input size="mini" style={{ width: "150px", fontSize: "13px" }} placeholder="아티스트명" value={artist || ''} onChange={(e) => setArtist(e.target.value)} /> &nbsp;
                <Input size="mini" style={{ width: "220px", fontSize: "13px" }} placeholder="노래 제목" value={title || ''} onChange={(e) => setTitle(e.target.value)} /> &nbsp;
                <Input size="mini" style={{ width: "300px", fontSize: "13px" }} placeholder="Youtube URL" value={url || ''} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="addbutton">
                <Button size="small" color="green" onClick={bgm_add}>추가</Button>
            </div>
            [참고] 새로운 배경음악을 추가한 뒤에는, 반드시 메인화면을 새로고침해주세요 !!
            <br /><br />

        </div>
    );

}
export default Bgmadd;