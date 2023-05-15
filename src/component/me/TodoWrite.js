import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../mine_back.css"
import Topbar from "../main/topbar";



function TodoWrite() {
  let history = useNavigate();  // 변수에 useNavigate 할당
  let param = useParams();

  const [rdate, setRdate] = useState(format(new Date(),'yyyy-MM-dd'));
  
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  //작성완료 함수
  const handleSubmit = async(e) => {
    
    if(title === undefined || title.trim() === '') {
      alert('제목을 입력해주세요');
    }
    if(content === undefined || content.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }


    //글쓰기는 초기화 시켜줄 게 없으므로 useEffect를 사용하지 않아도 됨
    //작성완료 함수에서 한번에 처리해주기
    axios.post("http://localhost:3000/todoWrite", null, {params:{"id":id, "rdate":param.rdate , "title": title, "content" :content}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('글이 등록되었습니다.');
              history('/me');
            } else {
              alert('글을 등록하지 못했습니다.');
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
    e.preventDefault();
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

      <div id="todoWrite">
        <div style={{marginTop:"-150px",marginLeft:"-150px"}}>
          <div>
             날짜 : <input style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive", width:"150px"}} defaultValue={param.rdate} onChange={(e)=>setRdate(e.target.value)}/>
          </div>
          <br/>
          <br/>
          <div>
              제목 : <input style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <br/>
          <br/>
          <div>
              내용 : <input style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} value={content} onChange={(e)=>setContent(e.target.value)}/>
          </div>
          <br/>
          <br/>
        </div>
         <button class="btn btn-success" style={{marginTop:"20px", marginLeft:"-80px", width:"170px", height:"60px"}} onClick={handleSubmit}>작성완료</button>
      </div>

    </div>
  )
}
export default TodoWrite;
