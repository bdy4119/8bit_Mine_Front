import { useState } from "react";
import axios from "axios";

import Pagination from "react-js-pagination";
import { Button, Table, Input } from 'semantic-ui-react'
import "./page.css";
import "./search.css";

import greend from "../image/greend.png";
import naver from "../image/naver.png";
import { useEffect } from "react";

function Book() {

    // 변수 선언
    const [book, setBook] = useState('');
    const [booklist, setBooklist] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    // 책 검색
    function findBook() {
        axios.get('http://localhost:3000/naverBook', { params: { "search": encodeURIComponent(book), "page": 0 } })
            .then(function (resp) {
                console.log(resp);
                setBooklist(resp.data.items);
                setTotal(resp.data.total);
                setPage(0);
            })

            .catch(function (err) {
                alert(err);
            })
    }

    // 페이지 변경
    function pageChange(page) {
        setPage(page);

        axios.get('http://localhost:3000/naverBook', { params: { "search": encodeURIComponent(book), "page": page - 1 } })
            .then(function (resp) {
                console.log(resp);
                setBooklist(resp.data.items);
            })

            .catch(function (err) {
                alert(err);
            })
    }

    // 책 데이터 정리
    function TableRow(props) {
        return (
            <Table.Row>
                <Table.Cell>{props.cnt}</Table.Cell>
                <Table.Cell><img src={props.obj.image} width={"100px"} height={"80px"} /></Table.Cell>
                <Table.Cell>{props.obj.title}</Table.Cell>
                <Table.Cell>{props.obj.author}</Table.Cell>
                <Table.Cell>{props.obj.pubdate.substr(0, 4)}.{props.obj.pubdate.substr(4, 2)}.{props.obj.pubdate.substr(6, 2)}.</Table.Cell>
                <Table.Cell>{props.obj.publisher}</Table.Cell>
            </Table.Row>
        );
    }

    useEffect(() => {
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);

    return (
        <div id="back">

            <img src={greend} width="70px" height="70px" style={{ position: "absolute", marginLeft: "20px", marginTop: "55px" }} />
            <div className="pwNavertitle">
                <h2 style={{ fontSize: "45px" }}>책 검색</h2>
            </div>

            <div className="pwNaver">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>

            <div>
                <img src={naver} width="134px" height="27px" style={{ position: "absolute", marginLeft: "390px", marginTop: "90px" }} />
            </div>

            <div className="bsearch">
                <Input style={{ width: "400px" }} size="large" placeholder="책 정보를 입력하세요. (책 제목, 작가 등)" onChange={(e) => { setBook(e.target.value) }} /> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" color="green" onClick={findBook}>검색</Button>
            </div>

            <div className="blist">
                <Table color="green" textAlign="center" style={{ width: "750px" }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>No.</Table.HeaderCell>
                            <Table.HeaderCell>표지</Table.HeaderCell>
                            <Table.HeaderCell>제목</Table.HeaderCell>
                            <Table.HeaderCell>저자</Table.HeaderCell>
                            <Table.HeaderCell>출간일</Table.HeaderCell>
                            <Table.HeaderCell>출판사</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            booklist.map(function (object, i) {
                                return (
                                    <TableRow obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                    </Table.Body>
                </Table>

                <Pagination
                    activePage={page}
                    itemsCountPerPage={5}
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

export default Book;
