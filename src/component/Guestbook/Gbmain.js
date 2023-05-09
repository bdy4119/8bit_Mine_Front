import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../main_back.css"
import Topbar from "../main/topbar";

function Gbmain() {

    const [gblist, setGblist] = useState([]);
    const [vilist, setVilist] = useState([]);

    const movePage = useNavigate();

    function go_gbadd() {
        movePage('/gbadd')
    }

    // 변수 설정으로 유무 확인

    // Mine 본인 계정에 보이는 axios
    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3000/gb_list', { params: { "id": "snaro0123@gmail.com" } });
        console.log(resp);
        setGblist(resp.data);
    }

    // 삭제
    function gb_del(seq) {
        axios.get('http://localhost:3000/gb_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_del_OK') {
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
        movePage(`/gbupdate/${seq}`)
    }

    function TableRow(props) {
        return (
            <tr>
                <td>{props.cnt}</td>
                <td>{props.obj.fromid}</td>
                <td>{props.obj.comment}</td>
                <td><audio src={`${process.env.PUBLIC_URL}/voice/${props.obj.filename}`} controls /></td>
                <td><button onClick={() => gb_del(`${props.obj.seq}`)}>삭제</button></td>
            </tr>
        );
    }

    // 방문자에게 보이는(방문자 본인이 남긴 방명록) axios
    const fetData = async () => {
        const resp = await axios.get('http://localhost:3000/gb_visit', { params: { "id": "gbtest@abc.com" } });
        console.log(resp);
        setVilist(resp.data);
    }

    function TableRow2(props) {
        return (
            <tr>
                <td>{props.cnt}</td>
                <td>{props.obj.comment}</td>
                <td><audio src={`${process.env.PUBLIC_URL}/voice/${props.obj.filename}`} controls /></td>
                <td><button onClick={() => gb_del(`${props.obj.seq}`)}>삭제</button></td>
                <td><button onClick={() => go_upd(`${props.obj.seq}`)}>수정</button></td>
            </tr>
        );
    }

    useEffect(() => {
        fetchData();
        fetData();
    }, []);

    return (
        <div>
            <Topbar />

            <div id="backwhite">
                <h3>방명록 main</h3>
                <p>[1] Mine 주인한테 보이는 방명록들(타인이 나에게 쓴)</p>
                <table border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>작성자</th>
                            <th>내용</th>
                            <th>음성</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gblist.map(function (object, i) {
                                return (
                                    <TableRow obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                    </tbody>
                </table>
                <br /><br />

                <p>[2] 방문한 사람한테 보이는 방명록 (내가 해당 Mine 주인에게 쓴)</p>
                <table border="1">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>내용</th>
                            <th>음성</th>
                            <th colSpan="2">관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vilist.map(function (object, i) {
                                return (
                                    <TableRow2 obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                        <tr>
                            <td colSpan="4"><button onClick={go_gbadd}>방명록 쓰기</button></td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    );
}

export default Gbmain;