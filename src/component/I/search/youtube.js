import { useState } from "react";
import axios from "axios";

import { Button, Table, Input } from 'semantic-ui-react'
import "./page.css";
import "./search.css";

import redd from "../image/redd.png";
import ytlogo from "../image/youtube_logo.png";
import { useEffect } from "react";

function Youtube() {

    // 변수 선언
    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    // Youtube 영상 검색
    function yt_search() {
        axios.get('http://localhost:3000/ytSearch', { params: { "query": encodeURIComponent(search) } })
            .then(function (resp) {
                console.log(resp);
                setList(resp.data.items);
            })

            .catch(function (err) {
                alert(err);
            })
    }

    // Youtube 영상 데이터 정리
    function TableRow(props) {
        return (
            <Table.Row>
                <Table.Cell><img src={props.obj.snippet.thumbnails.high.url} width={"100px"} height={"100px"} /></Table.Cell>
                <Table.Cell>{props.obj.snippet.title}</Table.Cell>
                <Table.Cell>{props.obj.snippet.channelTitle}</Table.Cell>
                <Table.Cell>https://www.youtube.com/watch?v={props.obj.id.videoId}</Table.Cell>
            </Table.Row>
        );
    }

    useEffect(() => {
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);

    return (
        <div id="back">

            <img src={redd} width="70px" height="70px" style={{ position: "absolute", marginLeft: "20px", marginTop: "55px" }} />
            <div className="pwNavertitle">
                <h2 style={{ fontSize: "45px" }}>영상 검색</h2>
            </div>

            <div className="pwYoutube">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>

            <div>
                <img src={ytlogo} width="120px" height="31px" style={{ position: "absolute", marginLeft: "445px", marginTop: "87px" }} />
            </div>

            <div className="pwsearch">
                <Input style={{ width: "400px" }} size="large" placeholder="영상 정보를 입력하세요. " onChange={(e) => { setSearch(e.target.value); }} /> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" color="red" onClick={yt_search}>검색</Button>
            </div>

            <div className="blist">
                <Table color="red" textAlign="center" style={{ width: "750px" }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>썸네일</Table.HeaderCell>
                            <Table.HeaderCell>영상 제목</Table.HeaderCell>
                            <Table.HeaderCell>채널명</Table.HeaderCell>
                            <Table.HeaderCell>url</Table.HeaderCell>
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

        </div>
    );
}

export default Youtube;