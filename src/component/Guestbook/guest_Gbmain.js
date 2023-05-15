import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import "../guest_back.css"
import "./Gbmain.css"
import "./page.css";
import logo from '../mine/images/logo.png';
import purpled from "./image/purpled.png";
import { Table, Button } from 'semantic-ui-react'

function Gbmain() {

    const [vilist, setVilist] = useState([]);
    const history = useNavigate();
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    let params = useParams();

    let mineid = params.mineid;

    const id = localStorage.getItem("id");

    function go_gbadd() {
        history('/gbadd/' + mineid);
    }

    const getUser = async () => {
        const jwt = localStorage.getItem("token");

        if (jwt === null) {
            history("/");
        }
    }

    // 삭제
    function gb_del(seq) {
        axios.get('http://localhost:3000/gb_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_del_OK') {
                    axios.post("http://localhost:3000/noticebookupdate", null, { params: { "id": mineid } });
                    alert('방명록을 삭제했습니다.');
                    window.location.reload();
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    // 수정
    function go_upd(seq) {
        history(`/gbupdate/${seq}`)
    }

    // 방문자에게 보이는(방문자 본인이 남긴 방명록) axios
    const fetData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/vi_list', { params: { "toid": mineid, "fromid": id, "start": 1, "end": 3 } });
        const respC = await axios.get('http://localhost:3000/gb_visit_c', { params: { "toid": mineid, "fromid": id } });
        setVilist(resp.data);
        setTotal(respC.data);
    }

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
                    <Button type="button" color="red" size="large" style={{ position: "absolute", marginLeft: "730px", marginTop: "-120px" }}
                        onClick={() => gb_del(`${props.obj.seq}`)}>삭제</Button>
                    <Button type="button" color="green" size="large" style={{ position: "absolute", marginLeft: "830px", marginTop: "-120px" }}
                        onClick={() => go_upd(`${props.obj.seq}`)}>수정</Button>
                </div>

            </div>
        );
    }

    function pageChange(page) {
        setPage(page);

        axios.get('http://localhost:3000/vi_list', { params: { "toid": mineid, "fromid": id, "start": (page - 1) * 3 + 1, "end": (page) * 3 } })
            .then(function (resp) {
                console.log(resp);
                setVilist(resp.data);
            })

            .catch(function (err) {
                alert(err);
            })
    }


    useEffect(() => {
        const noticebookupdate = async () => {
            await axios.post("http://localhost:3000/noticebookupdate", null, { params: { "id": id } });

        };

        getUser();
        fetData();
        noticebookupdate();
    }, []);

    return (
        <div id="back">
            <div>
                <div id="logo" onClick={() => { history('/main') }} style={{ marginLeft: "-850px", marginTop: "-30px" }}>
                    <img src={logo} alt="no" width="300px" />
                </div>
            </div>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn" onClick={(e) => { window.location.href = "/guest_mine/" + mineid }}>
                        <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                            MINE
                        </p>
                    </div>
                    <div id="mybtn">
                        <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                            CARD
                        </p>
                    </div>
                    <div id="mebtn" onClick={(e) => { history("/guest_gbmain/" + mineid) }}>
                        <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                            GUEST
                        </p>
                    </div>
                    <div id="minebtn" onClick={(e) => { history("/gbmain") }}>
                        <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                            HOME
                        </p>
                    </div>
                </div>
            </div>
            <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-100px", marginTop: "80px" }} />&nbsp;
            <div id="guestverlist">
                <h3 style={{ position: "absolute", marginLeft: "100px", marginTop: "-60px", fontSize: "35px" }}>방명록</h3>
                {
                    vilist.map(function (object, i) {
                        return (
                            <TableRow obj={object} key={i} />
                        )
                    })
                }
            </div>

            <div>
                <Button color="purple" size="large" style={{ position: "absolute", marginLeft: "170px", marginTop: "80px" }}
                    onClick={go_gbadd}>방명록 작성</Button>
            </div>

            <div style={{ position: "absolute", marginLeft: "1190px", marginTop: "70px" }}>
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