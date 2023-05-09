import axios from "axios";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import "./page.css";

function Book() {

    const [book, setBook] = useState('');
    const [booklist, setBooklist] = useState([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    function findBook() {
        axios.get('http://localhost:3000/naverBook',
            {
                params: {
                    "search": encodeURIComponent(book),
                    "page" : 0
                }
            })
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

    function pageChange(page) {
        setPage(page);
        axios.get('http://localhost:3000/naverBook',
        {
            params: {
                "search": encodeURIComponent(book),
                "page" : page-1
            }
        })
        .then(function (resp) {
            console.log(resp);
            setBooklist(resp.data.items);
        })
        .catch(function (err) {
            alert(err);
        })
    }

    function TableRow(props) {
   
        return (
            <tr>
                <td>{props.cnt}</td>
                <td><img src={props.obj.image} width={"100px"} height={"100px"}/></td>
                <td>{props.obj.title}</td>
                <td>{props.obj.author}</td>
                <td>{props.obj.pubdate}</td>
                <td>{props.obj.publisher}</td>
            </tr>
        );
    }


    return (
        <div id="backwhite">
            <input placeholder="책 정보를 입력하세요." onChange={(e) => { setBook(e.target.value) }} />
            <button onClick={findBook}>검색</button>
            <br />
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>표지</td>
                        <td>제목</td>
                        <td>저자</td>
                        <td>출간일</td>
                        <td>출판사</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        booklist.map(function (object, i) {
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

export default Book;
