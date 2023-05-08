import React, {useState, useEffect} from "react";
import axios from "axios";

import "../mine_back.css"
import "./mine.css";
import Topbar from "../main/topbar";

function Mine_main(){

    const id = localStorage.getItem("id");

    const [ansList, setAnsList] = useState([]);

    useEffect(() => {
        const answerList = async () => {
            const response = await axios.post("http://localhost:3000/answerlist", null, {params: { "mineid": id }});

            console.log(response.data);
            setAnsList(response.data);
        };

        answerList();

    }, []);

    function deleteanswer(seq){

        axios.post("http://localhost:3000/deleteanswer", null, { params:{ "seq":seq } })
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

   
    
    return (
        <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn">I</div>
                    <div id="mybtn">MY</div>
                    <div id="mebtn">ME</div>
                    <div id="mine_btn">MINE</div>

                    <div id="cardbtn">CARD</div>
                    <div id="bookbtn">GUEST</div>
                </div>
            </div>
            <div id="toolbox">
                <div id="modechange">
                    <div>
                        <button onClick={(e) => {window.location.href = "/mine"}}>사용자 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_edi/1"}}>에디터 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_guestbook"}}>방명록</button>
                    </div>
                </div>

                <div>
                    <table border="1">
                        <thead>
                            <td>No.</td>
                            <td>방문자</td>
                            <td>answer1</td>
                            <td>answer2</td>
                            <td>answer3</td>
                        </thead>
                        <tbody>
                        {
                            ansList.map(function (object, i) {
                            return (
                                <tr>
                                    <td>{i+1}</td>
                                    <td>{object.userid}</td>
                                    <td>{object.answer1}</td>
                                    <td>{object.answer2}</td>
                                    <td>{object.answer3}</td>
                                    <td><button type="button" onClick={() => deleteanswer(object.seq)}>삭제</button></td>
                                </tr>
                            )
                            })
                        }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Mine_main;