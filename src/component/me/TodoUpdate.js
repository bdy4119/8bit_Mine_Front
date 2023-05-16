import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../main/topbar";

import "../mine_back.css"

function TodoUpdate() {
  let history = useNavigate();  // 변수에 useNavigate 할당

  let param = useParams(); //변수에 params의 정보를 저장해놓고 변수 호출해서 사용

  const [rdate, setRdate] = useState(param.rdate.toString());
  let rdateArr = [rdate.substring(0,10)]; // 문자열로 바꾼 rdate를 잘라서 배열에 저장

  const [seq, setSeq] = useState(param.seq);
  const [title, setTitle] = useState(param.title);
  const [content, setContent] = useState(param.content);

  

  const handleSubmit = async(e) => {
    axios.post("http://localhost:3000/TodoUpdate", null, {params:{ "seq":seq, "title":title, "content" :content, "rdate": rdate}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('글이 수정되었습니다.');
              history('/me');
            } else {
              alert('글을 수정하지 못했습니다.');
              history('/me');
            }
         })
         .catch(function(err){
            alert(err);
         })

    /* preventDefault
      : 이벤트의 기본기능을 막는 것.
        >> 클릭했을때 href로 설정되어있는 주소로 바로 이동하는 것이 아니라,
           e.preventDefault(); 로 우선 이벤트를 멈춘 후
           js의 소스의 기능을 먼저 따른다.
    */
  //  e.preventDefault();
  }

  return(
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
      <h1>Todo 수정</h1>

     
      <div id="todoWrite">
        <div style={{marginTop:"-180px",marginLeft:"-150px"}}>
          <div>
             날짜 : <input style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive", width:"150px", border:"none"}} defaultValue={rdateArr}
                //리액트에서 input은 readonly가 기본값 -> defaultValue에 설정할 value값 넣으면 수정 가능하게 됨
              onChange={(e)=>setRdate(e.target.value)}/>
          </div>
          <br/>
          <br/>
          <div>
              제목 : <input style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive", border:"none"}} defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <br/>
          <br/>
          <div>
              내용 : <textarea style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive", border:"none"}} defaultValue={content} onChange={(e)=>setContent(e.target.value)}/>
          </div>
          <br/>
          <br/>
        </div>
         <button class="btn btn-success" style={{ marginLeft:"-80px", width:"170px", height:"60px", fontSize:"25px"}} onClick={handleSubmit}>수정완료</button>
      </div>
    </div>
  )
}
export default TodoUpdate;