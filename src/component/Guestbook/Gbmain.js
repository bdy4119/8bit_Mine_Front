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
import greend from "./image/greend.png";

function Gbmain() {

    // 변수 선언
    const history = useNavigate();

    const [gblist, setGblist] = useState([]);
    const [frielist, setFrielist] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [fpage, setFpage] = useState(0);
    const [ftotal, setFtotal] = useState(0);

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
        const response = await axios.post("http://localhost:3000/friendlist", null, { params: { "id": id, "start": 1, "end": 4 } });
        const responseC = await axios.post("http://localhost:3000/friendCount", null, { params: { "id": id } })

        setFrielist(response.data);
        setFtotal(responseC.data);
    };

    useEffect(() => {
        const noticebookupdate = async () => {
            await axios.post("http://localhost:3000/noticebookupdate", null, { params: { "id": id } });

        };

        getUser();
        fetchData();
        friendlist();
        noticebookupdate();
    }, []);

    // 삭제
    function gb_del(seq) {
        axios.get('http://localhost:3000/gb_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_del_OK') {
                    axios.post("http://localhost:3000/noticebookupdate", null, { params: { "id": id } });
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
        const profPic = props.obj.profpic;

        return (
            <div>
                <div style={{ position: "absolute", marginLeft: "120px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.rnum}</div>
                <div style={{ position: "absolute", marginLeft: "400px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.fromname} ({props.obj.fromid})</div>
                <div style={{ position: "absolute", marginLeft: "750px", marginTop: "15px", fontWeight: "bold" }}>{props.obj.regdate}</div>
                <div style={{ position: "absolute", marginLeft: "70px", marginTop: "70px", fontWeight: "bold" }}>
                    <img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} width="110px" height="110px" />
                </div>

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

                <div>
                    <Button color="red" type="button" size="large" style={{ position: "absolute", marginLeft: "780px", marginTop: "-120px" }}
                     onClick={() => gb_del(props.obj.seq)}>삭제</Button>
                </div>

            </div>
        );
    }

    // 친구목록 Data 정리
    function TableRow2(props) {
        return (
            <>
                <Table.Row>
                    <Table.Cell style={{ width: "150px" }}>{props.obj.friendname}({props.obj.friendid})</Table.Cell>
                    <Table.Cell><Button color="olive" size="small" type="button" onClick={() => gomine(props.obj.friendid)}>Mine</Button></Table.Cell>
                    <Table.Cell><Button color="red" type="button" size="small" onClick={() => deletefriend(props.obj.seq)}>삭제</Button></Table.Cell>
                </Table.Row>
            </>
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

    function fpageChange(page) {
        setFpage(page);

        axios.post("http://localhost:3000/friendlist", null, { params: { "id": id, "start": (page - 1) * 4 + 1, "end": (page) * 4 } })
            .then(function (resp) {
                setFrielist(resp.data);
                console.log(resp);
            })

            .catch(function (err) {
                alert(err);
            })
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

    return (
        <div id="back">

            <Topbar />
            <Barbtns />

            <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "200px", marginTop: "80px" }} />&nbsp;
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
                    <img src={greend} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-10px", marginTop: "20px" }} />&nbsp;
                    <h3 style={{ marginLeft: "80px", marginTop: "18px", fontSize: "30px" }}>친구목록 및 초대</h3>
                </div>

                <div>
                    <Button color="green" style={{ position: "absolute", marginLeft: "370px", marginTop: "-35px" }}
                        onClick={() => handleCopyClipBoard('http://localhost:9001/friendcard/' + id)}>초대 링크</Button>
                </div>

                <div>
                    <Table color={"green"} style={{ position: "absolute", marginLeft: "-20px", marginTop: "30px" }} textAlign="center">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>이름</Table.HeaderCell>
                                <Table.HeaderCell>Mine 방문</Table.HeaderCell>
                                <Table.HeaderCell>친구삭제</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {
                                frielist.map(function (object, i) {
                                    return (
                                        <TableRow2 obj={object} key={i} />)
                                })
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>

            <div style={{ position: "absolute", marginLeft: "1430px", marginTop: "450px" }}>
                <Pagination
                    activePage={fpage}
                    itemsCountPerPage={4}
                    totalItemsCount={ftotal}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={fpageChange}
                />
            </div>

            <div style={{ position: "absolute", marginLeft: "920px", marginTop: "70px" }}>
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