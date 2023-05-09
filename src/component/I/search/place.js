import axios from "axios";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";

function Place() {

    const [place, setPlace] = useState('');
    const [placelist, setPlacelist] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

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
            <tr>
                <td>{props.cnt}</td>
                <td>{props.obj.place_name}</td>
                <td>{props.obj.address_name}</td>
            </tr>
        );
    }


    return (
        <div id="backwhite">
            <input placeholder="장소명을 입력하세요." onChange={(e) => { setPlace(e.target.value); }} />
            <button onClick={findPlace}>검색</button>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>장소명</td>
                        <td>주소</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        placelist.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                            )
                        })
                    }
                </tbody>
            </table>

            <p>[참고]검색결과는 최대 45개까지 표시됩니다.</p>

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
    );
}

export default Place;
