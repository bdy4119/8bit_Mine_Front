import axios from "axios";
import { format } from "date-fns";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../mine_back.css"
import Topbar from "../main/topbar";



function BackWrite() {
  let param = useParams();
  let history = useNavigate();  // 변수에 useNavigate 할당

  const[historyDate, setHistoryDate] = useState('');
  const[historyTitle, setHistoryTitle] = useState('');
  const[historyContent, setHistoryContent] = useState('');
  const[historyUrl, setHistoryUrl] = useState('');

  //작성완료 함수
  const handleSubmit = async(e) => {
    
    if(historyTitle === undefined || historyTitle.trim() === '') {
      alert('제목을 입력해주세요');
    }
    if(historyContent === undefined || historyContent.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }


    //글쓰기는 초기화 시켜줄 게 없으므로 useEffect를 사용하지 않아도 됨
    //작성완료 함수에서 한번에 처리해주기
    axios.post("http://localhost:3000/backWrite", null, {params:{"id":param.id, "historyDate":historyDate, "historyTitle":historyTitle,
                                                                  "historyContent":historyContent, "historyUrl":historyUrl}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('글이 등록되었습니다.');
              history(`/back/${param.id}`);
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
                    <div id="ibtn" onClick={(e) => { window.location.href = "/i" }}>I</div>
                    <div id="mybtn" onClick={(e) => { window.location.href = "/Filelist" }}>MY</div>
                    <div id="mebtn" onClick={(e) => { window.location.href = "/me" }}>ME</div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>MINE</div>

                    <div id="cardbtn" onClick={(e) => { window.location.href = "/card" }}>CARD</div>
                    <div id="bookbtn" onClick={(e) => { window.location.href = "/gbmain" }}>GUEST</div>
                </div>
            </div>
            <div id="toolbox">
    <div className="middle">
    <div style={{backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}}>
      <div style={{marginLeft:"320px", marginTop:"100px"}}>
        <div>
          <h3>
              날짜 : <input defaultValue={historyDate} onChange={(e)=>setHistoryDate(e.target.value)} placeholder="(ex)2023-04"/>
          </h3>
        </div>
        <br/>
        <div>
          <h3>
            제목: <input defaultValue={historyTitle} onChange={(e)=>setHistoryTitle(e.target.value)}/>
          </h3>
        </div>
        <br/>
        <div>
          <h3>
            내용: <input defaultValue={historyContent} onChange={(e)=>setHistoryContent(e.target.value)}/>
          </h3>
        </div>
        <br/>
        <div>
          <h3>
            URL: <input defaultValue={historyUrl} onChange={(e)=>setHistoryUrl(e.target.value)}/>
          </h3>
        </div>
      </div>

      <div style={{marginLeft:"350px", marginBottom:"-500px", marginTop:"100px"}}>
          <button onClick={handleSubmit} style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
            글추가
          </button>
      </div>

    </div>
  </div>
  </div>
  </div>
  )
}
export default BackWrite;