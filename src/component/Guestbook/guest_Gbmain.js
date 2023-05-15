import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../guest_back.css"
import "./Gbmain.css"


function Gbmain() {

    const [vilist, setVilist] = useState([]);

    const movePage = useNavigate();

    let params = useParams();

    let mineid = params.mineid;

    const id = localStorage.getItem("id");

    function go_gbadd() {
        movePage('/gbadd/' + mineid);
    }

    // 삭제
    function gb_del(seq) {
        axios.get('http://localhost:3000/gb_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'gb_del_OK') {
                    axios.post("http://localhost:3000/noticebookupdate", null, {params: { "id": id }});
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

    // 방문자에게 보이는(방문자 본인이 남긴 방명록) axios
    const fetData = async () => {
        const resp = await axios.get('http://localhost:3000/gb_visit', { params: { "toid": mineid, "fromid":id } });
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

        fetData();
    }, []);

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="guestminebtn" onClick={(e) => { window.location.href = "/guest_mine/" + mineid }}>MINE</div>
                    <div id="guestcardbtn">CARD</div>
                    <div id="guestbookbtn" onClick={(e) => { window.location.href = "/guest_gbmain/" + mineid }}>GUEST</div>
                    <div id="gohomebtn" onClick={(e) => { window.location.href = "/gbmain" }}>HOME</div>
                </div>
            </div>
            <div id="toolbox">
                <div id="guestbooklist">
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
        </div>
    );
}

export default Gbmain;