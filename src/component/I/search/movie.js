import axios from "axios";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";

function Movie() {

    const [movie, setMovie] = useState('');
    const [movielist, setMovielist] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    function findMovie() {
        axios.get('http://localhost:3000/tmdb', {params:{"kind":"movie", "query": encodeURIComponent(movie), "page":1}})
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
        axios.get('http://localhost:3000/tmdb', {params:{"kind":"movie", "query": encodeURIComponent(movie), "page":page}})
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
            <tr>
                <td>{props.cnt}</td>
                <td><img src={`https://image.tmdb.org/t/p/original${props.obj.poster_path}`} 
                    alt="NO POSTER" width={"100px"} height={"100px"} /></td>
                <td>{props.obj.title}<br/>
                ({props.obj.original_title})</td>
                <td>{props.obj.original_language}</td>
                <td>{props.obj.release_date}</td>
            </tr>
        );
    }


    return (
        <div>
            <input placeholder="영화 정보를 입력하세요." onChange={(e) => { setMovie(e.target.value); }} />
            <button onClick={findMovie}>검색</button>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>포스터</td>
                        <td>제목(원제)</td>
                        <td>제작국가</td>
                        <td>개봉일</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        movielist.map(function (object, i) {
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

export default Movie;
