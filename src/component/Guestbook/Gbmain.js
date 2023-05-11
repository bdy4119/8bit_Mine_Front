import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../main_back.css"
import "./Gbmain.css"
import Topbar from "../main/topbar";


function Gbmain() {

    const [gblist, setGblist] = useState([]);
    const [vilist, setVilist] = useState([]);
    const [frielist, setFrielist] = useState([]);

    const movePage = useNavigate();

    function go_gbadd() {
        movePage('/gbadd')
    }

    const id = localStorage.getItem("id");

   // 변수 설정으로 유무 확인

    // Mine 본인 계정에 보이는 axios
    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/gb_list', { params: { "id": id } });
        console.log(resp);
        setGblist(resp.data);
    }

    const friendlist = async () => {
        const id = localStorage.getItem("id");
        const response = await axios.post("http://localhost:3000/friendlist", null, {params: { "id": id }});

        setFrielist(response.data);
    };


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

    function deletefriend(seq){

        axios.post("http://localhost:3000/deletefriend", null, { params:{ "seq":seq } })
                .then(res => {
                if(res.data === "YES"){
                    alert("성공적으로 삭제되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
                })
                .catch(function(err){
                alert(err);
                })   
    }

    function gomine(mineid){
        window.location.href = "/guest_mine/" + mineid;
    }

    const handleCopyClipBoard = async (text) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch (error) {
          alert('복사 실패!');
        }
    };

    useEffect(() => {
        fetchData();
        fetData();
        friendlist();
    }, []);

    return (
        <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn" onClick={(e) => { window.location.href = "/i" }}>I</div>
                    <div id="mybtn" onClick={(e) => { window.location.href = "/Filelist" }}>MY</div>
                    <div id="mebtn" onClick={(e) => { window.location.href = "/me" }}>ME</div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>MINE</div>

                    <div id="cardbtn" onClick={(e) => { window.location.href = "/card" }}>CARD</div>
                    <div id="bookbtn" onClick={(e) => { window.location.href = "/gbmain" }}>GUEST</div>
                </div>
            </div>
            <div id="toolbox">
                <div id="guestbooklist">
                <h3>방명록 main</h3>
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

                </div>
                <div id="friendlist">
                    <div>
                        <h4>내 초대링크</h4>
                        <button onClick={() => handleCopyClipBoard('http://localhost:9001/friendcard/' + id )}>복사</button>
                    </div>
                    <div>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>이름</th>
                                    <th>Mine 방문</th>
                                    <th>친구삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    frielist.map(function (object, i) {
                                        return (
                                            <tr>
                                                <td>{object.friendid}</td>
                                                <td><button type="button" onClick={() => gomine(object.friendid)}>Mine</button></td>
                                                <td><button type="button" onClick={() => deletefriend(object.seq)}>삭제</button></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Gbmain;