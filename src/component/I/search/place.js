import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";
import "./search.css";
import yellowd from "../image/yellowd.png";
import kakaoy from "../image/kakaoy.png";

import { Button, Table, Input } from 'semantic-ui-react'

function Place() {

    const [place, setPlace] = useState('');
    const [placelist, setPlacelist] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(function () {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);


    function findPlace() {
        axios.get('http://localhost:3000/kakaoLocal', { params: { "query": encodeURIComponent(place), "page": 1 } })
            .then(function (resp) {
                setPlacelist(resp.data.documents);
                setTotal(resp.data.meta.pageable_count);
                setPage(1);
                console.log(resp);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function pageChange(page) {
        setPage(page);
        axios.get('http://localhost:3000/kakaoLocal', { params: { "query": encodeURIComponent(place), "page": page } })
            .then(function (resp) {
                setPlacelist(resp.data.documents);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function TableRow(props) {
        return (
            <Table.Row>
                <Table.Cell>{props.cnt}</Table.Cell>
                <Table.Cell>{props.obj.place_name}</Table.Cell>
                <Table.Cell>{props.obj.address_name}</Table.Cell>
            </Table.Row>
        );
    }


    return (
        <div id="back">
            <img src={yellowd} width="70px" height="70px" style={{ position: "absolute", marginLeft: "20px", marginTop: "35px" }} />
            <div className="bgmtitle">
                <h2 style={{ fontSize: "45px" }}>장소 검색</h2>
            </div>

            <div className="pwKakao">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>

            <div>
                <img src={kakaoy} width="100px" height="31px" style={{ position: "absolute", marginLeft: "440px", marginTop: "67px" }} />
            </div>

            <div className="plsearch">
                <Input style={{ width: "400px" }} size="large" placeholder="장소 정보를 입력하세요. (장소명, 주소 등)" onChange={(e) => { setPlace(e.target.value); }} /> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" color="yellow" onClick={findPlace}>검색</Button>
            </div>

            <div className="pllist">
            <p>검색결과는 최대 45개까지 표시됩니다.</p>
                <Table color="yellow" textAlign="center" style={{ width: "700px" }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>번호</Table.HeaderCell>
                            <Table.HeaderCell>장소명</Table.HeaderCell>
                            <Table.HeaderCell>주소</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            placelist.map(function (object, i) {
                                return (
                                    <TableRow obj={object} key={i} cnt={i + 1} />
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
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

export default Place;
