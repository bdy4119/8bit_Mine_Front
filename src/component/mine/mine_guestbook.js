import React, {useState, useEffect} from "react";
import axios from "axios";

import "../mine_back.css"
import "./mine.css";
import Topbar from "../main/topbar";
import { useNavigate } from "react-router-dom";

function Mine_main(){

    const id = localStorage.getItem("id");
    const history = useNavigate();

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
                    <div id="ibtn" onClick={(e) => { history("/i") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        I
                      </p>
                    </div>
                    <div id="mybtn" onClick={(e) => { history("/Filelist") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        MY
                      </p>
                    </div>
                    <div id="mebtn" onClick={(e) => { history("/me") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        ME
                      </p>
                    </div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        MINE
                      </p>
                    </div>

                    <div id="cardbtn" onClick={(e) => { history("/card") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        CARD
                      </p>
                    </div>
                    <div id="bookbtn" onClick={(e) => { history("/gbmain") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        GUEST
                      </p>  
                    </div>
                </div>
            </div>
            <div id="minebox">
                <div id="modechange">
                    <div>
                        <button onClick={(e) => {window.location.href = "/mine"}}>사용자 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_edi/1"}}>에디터 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_guestbook"}}>방명록</button>
                    </div>
                </div>

                <div id="mineguestbook">
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