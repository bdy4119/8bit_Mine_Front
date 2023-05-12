import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";

import blued from "../image/mine_icon.png";
import tmdb from "../image/tmdb_rmv.png";
import { Button, Table, Input } from 'semantic-ui-react'

function Movie() {

    const [movie, setMovie] = useState('');
    const [movielist, setMovielist] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(function () {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);


    function findMovie() {
        axios.get('http://localhost:3000/tmdb', { params: { "kind": "movie", "query": encodeURIComponent(movie), "page": 1 } })
            .then(function (resp) {
                console.log(resp);
                setMovielist(resp.data.results)
                setTotal(resp.data.total_results)
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function pageChange(page) {
        setPage(page);
        axios.get('http://localhost:3000/tmdb', { params: { "kind": "movie", "query": encodeURIComponent(movie), "page": page } })
            .then(function (resp) {
                console.log(resp);
                setMovielist(resp.data.results)
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function TableRow(props) {
        return (
            <Table.Row>
                <Table.Cell>{props.cnt}</Table.Cell>
                <Table.Cell><img src={`https://image.tmdb.org/t/p/original${props.obj.poster_path}`}
                    alt="NO POSTER" width={"100px"} height={"100px"} /></Table.Cell>
                <Table.Cell>{props.obj.title}<br />
                    ({props.obj.original_title})</Table.Cell>
                <Table.Cell>{props.obj.original_language}</Table.Cell>
                <Table.Cell>{props.obj.release_date}</Table.Cell>
            </Table.Row>
        );
    }


    return (
        <div id="back">
            <img src={blued} width="70px" height="70px" style={{ position: "absolute", marginLeft: "20px", marginTop: "35px" }} />
            <div className="bgmtitle">
                <h2 style={{ fontSize: "45px" }}>영화 검색</h2>
            </div>

            <div className="pwTmdbM">
                <h4 style={{ fontSize: "17px" }}>POWERED BY</h4>
            </div>

            <div>
                <img src={tmdb} width="160px" height="33px" style={{ position: "absolute", marginLeft: "430px", marginTop: "70px" }} />
            </div>

            <div className="pwsearch">
                <Input style={{ width: "400px" }} size="large" placeholder="영화 정보를 입력하세요. " onChange={(e) => { setMovie(e.target.value); }} /> &nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="large" color="blue" onClick={findMovie}>검색</Button>
            </div>

            <div className="blist">
                <Table color="blue" textAlign="center" style={{ width: "750px" }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>번호</Table.HeaderCell>
                            <Table.HeaderCell>포스터</Table.HeaderCell>
                            <Table.HeaderCell>제목(원제)</Table.HeaderCell>
                            <Table.HeaderCell>제작국가</Table.HeaderCell>
                            <Table.HeaderCell>개봉일</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            movielist.map(function (object, i) {
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
                    itemsCountPerPage={20}
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

export default Movie;
