import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../guest_back.css"
import "./Gbmain.css"
import logo from '../mine/images/logo.png';
import purpled from "./image/purpled.png";


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
            <div>
                <div id="logo" onClick={() => {movePage('/main')}} style={{marginLeft:"-850px", marginTop:"-30px"}}>
                    <img src={logo} alt="no" width="300px" />
                </div>
            </div>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn" onClick={(e) => { window.location.href = "/guest_mine/" + mineid }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                      MINE
                      </p>
                    </div>
                    <div id="mybtn">
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                      CARD
                      </p>
                    </div>
                    <div id="mebtn" onClick={(e) => { window.location.href = "/guest_gbmain/" + mineid }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                      GUEST
                      </p>
                    </div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/gbmain" }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                      HOME
                      </p>
                    </div>
                </div>
            </div>
            <img src={purpled} width="70px" height="70px" style={{ position: "absolute", marginLeft: "-750px", marginTop: "80px" }} />&nbsp;
            <div id="guestbooklist">
                <h3 style={{ position: "absolute", marginLeft: "100px", marginTop: "-60px", fontSize: "35px" }}>방명록</h3>
                {
                    vilist.map(function (object, i) {
                        return (
                            <TableRow2 obj={object} key={i} cnt={i + 1} />
                        )
                    })
                }
            </div>
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
    );
}

export default Gbmain;