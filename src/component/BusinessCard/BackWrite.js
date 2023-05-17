import axios from "axios";
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
            <div /*id="toolbox"*/>
    <div>
    <div id="onlineCard" style={{paddingBottom:"100px"}}>
      <div style={{marginTop:"-20px"}}>
        <div>
          <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
              날짜 : <input className="input2" defaultValue={historyDate} onChange={(e)=>setHistoryDate(e.target.value)} placeholder="(ex)2023-04" style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
          </h3>
        </div>
        <br/>
        <div>
          <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
            제목: <input className="input2" defaultValue={historyTitle} onChange={(e)=>setHistoryTitle(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
          </h3>
        </div>
        <br/>
        <div>
          <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
            내용: <input className="input2" defaultValue={historyContent} onChange={(e)=>setHistoryContent(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
          </h3>
        </div>
        <br/>
        <div>
          <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
            URL: <input className="input2" defaultValue={historyUrl} onChange={(e)=>setHistoryUrl(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
          </h3>
        </div>
      </div>

      <div className="middle" style={{clear:"left", paddingTop:"100px"}}>
          <button onClick={handleSubmit} id="onlineBtn" style={{fontSize:"30px", width:"250px"}}>
            정보 추가
          </button>
      </div>

    </div>
  </div>
  </div>
  </div>
  )
}
export default BackWrite;