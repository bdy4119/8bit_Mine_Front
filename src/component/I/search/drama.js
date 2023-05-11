import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";

function Drama() {

    const [tv, setTv] = useState('');
    const [tvlist, setTvlist] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(function () {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);


    function findTv() {
        axios.get('http://localhost:3000/tmdb', {params:{"kind":"tv", "query": encodeURIComponent(tv), "page":1}})
            .then(function (resp) {
                console.log(resp);
                setTvlist(resp.data.results)
                setTotal(resp.data.total_results);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function pageChange(page) {
        setPage(page);
        axios.get('http://localhost:3000/tmdb', {params:{"kind":"tv", "query": encodeURIComponent(tv), "page":page}})
            .then(function (resp) {
                console.log(resp);
                setTvlist(resp.data.results)
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function TableRow(props) {
        return (
            <tr>
                <td>{props.cnt}</td>
                <td><img src={`https://image.tmdb.org/t/p/original${props.obj.poster_path}`}
                    alt="NO POSTER" width={"100px"} height={"100px"} /></td>
                <td>{props.obj.name}<br />
                    ({props.obj.original_name})</td>
                <td>{props.obj.origin_country[0]}</td>
                <td>{props.obj.first_air_date}</td>
            </tr>
        );
    }


    return (
        <div id="backwhite">
            <input placeholder="영화 정보를 입력하세요." onChange={(e) => { setTv(e.target.value); }} />
            <button onClick={findTv}>검색</button>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>포스터</td>
                        <td>제목(원제)</td>
                        <td>제작국가</td>
                        <td>첫 방영일</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        tvlist.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                            )
                        })
                    }

                </tbody>
            </table>

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
    );
}

export default Drama;
