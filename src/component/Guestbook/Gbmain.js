import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Pagination from "react-js-pagination";
import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns.js";

import { Button, Table } from 'semantic-ui-react'
import "../main_back.css"
import "./Gbmain.css"
import "./page.css";

import purpled from "./image/purpled.png";

function Gbmain() {

    // 변수 선언
    const history = useNavigate();

    const [gblist, setGblist] = useState([]);
    const [frielist, setFrielist] = useState([]);
    const [profPic, setProfPic] = useState('');
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);


    const id = localStorage.getItem("id");

    // 접속 권한 체크
    const getUser = async () => {
        const jwt = localStorage.getItem("token");

        if (jwt === null) {
            history("/");
        }
    }

    // 방명록 조회 axios
    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/gb_list', { params: { "toid": id, "start": 1, "end": 3 } });
        const respC = await axios.get('http://localhost:3000/gb_list_c', { params: { "toid": id } });
        setGblist(resp.data);
        setTotal(respC.data);
    }

    // 친구목록 조회
    const friendlist = async () => {
        const id = localStorage.getItem("id");
        const response = await axios.post("http://localhost:3000/friendlist", null, { params: { "id": id } });

        setFrielist(response.data);
    };

    useEffect(() => {
        getUser();
        fetchData();
        friendlist();
    }, []);

    // 삭제
    function gb_del(seq) {
        axios.get('http://localhost:3000/gb_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_del_OK') {
                    axios.post("http://localhost:3000/noticebookupdate", null, {params: { "id": id }});
                    alert('방명록을 삭제했습니다.');
                    window.location.reload();
                }
            })

            .catch(function (err) {
                alert(err);
            })
    }

    // 방명록 Data 정리
    function TableRow(props) {
        const id = props.obj.fromid;

        axios.get('http://localhost:3000/getItems', { params: { "email": id } })
            .then(function (resp) {
                setProfPic(resp.data.profPic);
            })
            .catch(function (err) {
                alert(err);
            })

        return (
            <div>

                <div style={{ position: "absolute", marginLeft: "120px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.rnum}</div>
                <div style={{ position: "absolute", marginLeft: "400px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.fromname} ({props.obj.fromid})</div>
                <div style={{ position: "absolute", marginLeft: "750px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.regdate}</div>
                <div style={{ position: "absolute", marginLeft: "70px", marginTop: "70px", fontWeight: "bold" }}>
                    <img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} width="110px" height="110px" /></div>

                <Table color="purple" border="1" textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="4" style={{ height: "50px" }} />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Cell style={{ height: "150px" }} />
                        <Table.Cell colSpan="2">
                            <div style={{ marginTop: "10px" }}><p style={{ fontSize: "17px" }}>{props.obj.comment}</p>
                                <div>{props.obj.isvoice === 1 ? <audio src={`${process.env.PUBLIC_URL}/voice/${props.obj.filename}`} controls />
                                    : <p style={{ color: "gray", fontStyle: "italic" }}>(음성파일이 없는 방명록)</p>}</div></div>
                        </Table.Cell>
                    </Table.Body>
                </Table>

                <div><Button color="red" size="large" style={{ position: "absolute", marginLeft: "780px", marginTop: "-120px" }}
                    onClick={() => gb_del(`${props.obj.seq}`)}>삭제</Button></div>

            </div>
        );
    }

    // 페이지 변경
    function pageChange(page) {
        setPage(page);

        axios.get('http://localhost:3000/gb_list', { params: { "toid": id, "start": (page - 1) * 3 + 1, "end": (page) * 3 } })
            .then(function (resp) {
                console.log(resp);
                setGblist(resp.data);
            })

            .catch(function (err) {
                alert(err);
            })
    }

     // 수정
     function go_upd(seq) {
        history(`/gbupdate/${seq}`)
    }

    // 친구 목록 삭제
    function deletefriend(seq) {

        axios.post("http://localhost:3000/deletefriend", null, { params: { "seq": seq } })
            .then(res => {
                if (res.data === "YES") {
                    alert("성공적으로 삭제되었습니다");
                    window.location.reload();
                } else {
                    alert("등록되지 않았습니다");
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    // 친구 Mine 방문하기
    function gomine(mineid) {
        window.location.href = "/guest_mine/" + mineid;
    }

    // 초대메세지 복사
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (error) {
            alert('복사 실패!');
        }
    };

    useEffect(() => {

        const noticebookupdate = async () => {
            await axios.post("http://localhost:3000/noticebookupdate", null, {params: { "id": id }});
        
        };

        noticebookupdate();

        fetchData();
        fetData();
        friendlist();
    }, []);

    return (
        <div id="back">

            <Topbar />
            <Barbtns />

            <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-750px", marginTop: "80px" }} />&nbsp;
            <div id="guestbooklist">
                <h3 style={{ position: "absolute", marginLeft: "100px", marginTop: "-60px", fontSize: "35px" }}>방명록</h3>
                {
                    gblist.map(function (object, i) {
                        return (
                            <TableRow obj={object} key={i} />
                        )
                    })
                }
            </div>

            <div id="friendlist">
                <div>
                    <h4>내 초대링크</h4>
                    <button onClick={() => handleCopyClipBoard('http://localhost:9001/friendcard/' + id)}>복사</button>
                </div>
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>Mine 방문</th>
                                <th>친구삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                frielist.map(function (object, i) {
                                    return (
                                        <tr>
                                            <td>{object.friendid}</td>
                                            <td><button type="button" onClick={() => gomine(object.friendid)}>Mine</button></td>
                                            <td><button type="button" onClick={() => deletefriend(object.seq)}>삭제</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ position: "absolute", marginLeft: "1400px", marginTop: "730px" }}>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={3}
                    totalItemsCount={total}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange}
                />
            </div>
        </div>
    );
}

export default Gbmain;