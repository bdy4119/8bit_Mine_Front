import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../main/topbar";
import "../mine_back.css";

function BackOrder() {
  let param = useParams();
  let history = useNavigate();

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);

  const[id, setId] = useState('');

  const[historyDate, setHistoryDate] = useState('');
  const[historyTitle, setHistoryTitle] = useState('');
  const[historyContent, setHistoryContent] = useState('');
  const[historyUrl, setHistoryUrl] = useState('');




  //같은 seq번호이면 정보 불러오는 함수
  function backDetail(seq) {
    axios.get("http://localhost:3000/backDetail", {params:{"seq":param.seq}})
         .then(function(resp){
          setHistoryDate(resp.data.historyDate);
          setHistoryTitle(resp.data.historyTitle);
          setHistoryContent(resp.data.historyContent);
          setHistoryUrl(resp.data.historyUrl);

          setId(resp.data.id);

          setLoading(true);   //렌더링 시작해주기
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }



  //수정완료 버튼
  const handleSubmit = async(e) => {
    axios.post("http://localhost:3000/backUpdate", null,
                {params:{"id":param.id, "seq":param.seq, "historyDate":historyDate, "historyTitle":historyTitle,
                          "historyContent":historyContent, "historyUrl":historyUrl}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('정보가 수정되었습니다.');
              history(`/back/${id}`);
            } else {
              alert('정보를 수정하지 못했습니다.');
              history(`/back/${id}`);
            }
         })
         .catch(function(err){
            alert(err);
         })
  }



  useEffect(function(){
    backDetail(param.seq);
  },[param.seq]);


  //딜레이 한번 주기
  if(loading === false) {
    return <div>Loading...</div>
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
      <div id="onlineCard" style={{paddingBottom:"100px"}}>
     
        <div style={{marginTop:"-20px", marginLeft:"50px"}}>
            <div>
              <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
                  날짜 : <input defaultValue={historyDate} onChange={(e)=>setHistoryDate(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
              </h3>
            </div>
            <br/>
            <div>
              <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
                제목: <input defaultValue={historyTitle} onChange={(e)=>setHistoryTitle(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
              </h3>
            </div>
            <br/>
            <div>
              <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
                내용: <input defaultValue={historyContent} onChange={(e)=>setHistoryContent(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
              </h3>
            </div>
            <br/>
            <div>
              <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>
                URL: <input defaultValue={historyUrl} onChange={(e)=>setHistoryUrl(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
              </h3>
            </div>
        </div>

        <div className="middle" style={{clear:"left", paddingTop:"100px", marginLeft:"20px"}}>
            <button onClick={handleSubmit} id="onlineBtn" style={{fontSize:"30px", width:"250px"}}>
              수정완료
            </button>
        </div>

      </div>
    </div>
  );
}
export default BackOrder;