import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../main_back.css"
import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";

import 'semantic-ui-css/semantic.min.css'
import { Table, Button, Input } from 'semantic-ui-react'

import kakao from "./image/kakao.png";
import naver from "./image/naver.png";
import youtube from "./image/youtube.png";
import tmdb from "./image/tmdb.png";

import purpled from "./image/purpled.png";
import redd from "./image/redd.png";
import greend from "./image/greend.png";

function I_update() {

    let params = useParams();
    const history = useNavigate();

    function getUser() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            history("/");
        }
    }

    const [classiList, setClassiList] = useState([]);
    const [detList, setDetList] = useState([]);

    const [classi, setClassi] = useState('');

    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    const [ans3, setAns3] = useState('');
    const [ans4, setAns4] = useState('');
    const [ans5, setAns5] = useState('');

    const [det1, setDet1] = useState('');
    const [det2, setDet2] = useState('');
    const [det3, setDet3] = useState('');
    const [det4, setDet4] = useState('');
    const [det5, setDet5] = useState('');

    const ans = [ans1, ans2, ans3, ans4, ans5];
    const det = [det1, det2, det3, det4, det5];

    // 데이터 불러오기
    const detailData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": id, "classify": params.classify } })

        setClassi(resp.data[0].classify);

        setAns1(resp.data[0].item);
        setAns2(resp.data[1].item);
        setAns3(resp.data[2].item);
        setAns4(resp.data[3].item);
        setAns5(resp.data[4].item);

        setDet1(resp.data[0].detail);
        setDet2(resp.data[1].detail);
        setDet3(resp.data[2].detail);
        setDet4(resp.data[3].detail);
        setDet5(resp.data[4].detail);
    }

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
        setClassiList(resp.data);
    }

    function TableRow1(props) {
        return (
            <Table.Row>
                <Table.Cell><Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link></Table.Cell>
            </Table.Row>
        );
    }

    // 데이터 테이블에 담기
    function TableRow2(props) {
        if (props.obj.item === "") {
            return;
        }
        return (
            <Table.Row>
                <Table.Cell>{props.obj.item}</Table.Cell>
                <Table.Cell>{props.obj.detail}</Table.Cell>
            </Table.Row>
        );
    }
    useEffect(() => {
        fetchData();
        detailData();
        getUser();
    }, []);

    function i_upd() {
        const id = localStorage.getItem("id");

        if (classi.trim() === "") {
            alert('분류명을 입력해주세요.');
            return;
        }

        if (ans1.trim() === "" && ans2.trim() === "" && ans3.trim() === "" && ans4.trim() === "" && ans5.trim() === "") {
            alert('반드시 하나 이상의 항목을 입력해주세요.');
            return;
        }

        axios.get('http://localhost:3000/i_del', { params: { "id": id, "classify": params.classify } })
            .then(function (resp) {

                for (let i = 0; i < ans.length; i++) {
                    axios.get('http://localhost:3000/i_add', { params: { "id": id, "classify": classi, "item": ans[i], "detail": det[i], "ref": i } })
                        .then(function () {
                        })
                        .catch(function (err) {
                            alert(err);
                        })
                }

                axios.get('http://localhost:3000/i_add_classi', { params: { "id": id, "classify": classi } })
                    .then(function () {
                        alert(classi + " 항목이 수정되었습니다.");
                        history(`/i_detail/${classi}`);
                    })
                    .catch(function (err) {
                        alert(err);
                    });
            })
            .catch(function (err) {
                alert(err);
            });
    }

    return (
        <div id="back">
            <Topbar />
            <Barbtns />

            <div className="tableAdd">
                <Table size="small" style={{ width: "250px", textAlign: "center", fontSize: "15px" }} color={"red"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <img src={redd} width="40px" height="40px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;
                                나의 분류
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            classiList.map(function (object, i) {
                                return (
                                    <TableRow1 obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                    </Table.Body>
                </Table>
            </div>
            <div className="tableAddC">
                <Table style={{ width: "700px", textAlign: "center", fontSize: "20px" }} color={"purple"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                <img src={purpled} width="50px" height="50px" style={{ marginLeft: "-30px", marginTop: "-10px" }} />&nbsp;&nbsp;
                                <Input placeholder="분류 내용 입력" style={{ width: "400px" }} defaultValue={classi} onChange={(e) => { setClassi(e.target.value) }} />
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><Input size="mini" placeholder="항목1" defaultValue={ans1} onChange={(e) => { setAns1(e.target.value) }} /></Table.Cell>
                            <Table.Cell><Input size="mini" placeholder="상세내용" style={{ width: "350px" }} defaultValue={det1} onChange={(e) => { setDet1(e.target.value) }} /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Input size="mini" placeholder="항목2" defaultValue={ans2} onChange={(e) => { setAns2(e.target.value) }} /></Table.Cell>
                            <Table.Cell><Input size="mini" placeholder="상세내용" style={{ width: "350px" }} defaultValue={det2} onChange={(e) => { setDet2(e.target.value) }} /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Input size="mini" placeholder="항목3" defaultValue={ans3} onChange={(e) => { setAns3(e.target.value) }} /></Table.Cell>
                            <Table.Cell><Input size="mini" placeholder="상세내용" style={{ width: "350px" }} defaultValue={det3} onChange={(e) => { setDet3(e.target.value) }} /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Input size="mini" placeholder="항목4" defaultValue={ans4} onChange={(e) => { setAns4(e.target.value) }} /></Table.Cell>
                            <Table.Cell><Input size="mini" placeholder="상세내용" style={{ width: "350px" }} defaultValue={det4} onChange={(e) => { setDet4(e.target.value) }} /></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell><Input size="mini" placeholder="항목5" defaultValue={ans5} onChange={(e) => { setAns5(e.target.value) }} /></Table.Cell>
                            <Table.Cell><Input size="mini" placeholder="상세내용" style={{ width: "350px" }} defaultValue={det5} onChange={(e) => { setDet5(e.target.value) }} /></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <div className="tacButtonU">
                <Button size="huge" color="purple" onClick={i_upd}>수정 완료</Button>
            </div>

            <div className="search">
                <Table size="small" style={{ width: "300px", textAlign: "center", fontSize: "17px" }} color={"olive"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                <img src={greend} width="40px" height="40px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;
                                검색도우미
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell style={{ width: "60px" }}>
                                <img src={kakao} width="50px" height="15px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/place', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>위치 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ width: "60px" }}>
                                <img src={naver} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/book', 'window_name', 'width=800,height=1000,location=no,status=no,scrollbars=yes')}>책 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={youtube} width="40px" height="20px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/youtube', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>Youtube 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={tmdb} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/movie', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>영화 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={tmdb} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/drama', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>TV/드라마/OTT 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default I_update;