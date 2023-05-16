import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function BackOrderflip() {
  let param = useParams();
  let history = useNavigate();

  const[businessbackList, setBusinessbackList] = useState([]);
  const[businessDetail, setbusinessDetail] = useState(); //객체로 접근하기 때문에 값을 넣지 않아도 됨

  const[seq, setSeq] = useState();


  const[id, setId] = useState(param.id);
  const login = localStorage.getItem("id"); //로그인한 아이디


  console.log(param.id)
  function businessback() {
    axios.get("http://localhost:3000/businesscardBack", {params:{"id":param.id}})
         .then(function(resp){
          console.log(resp.data.list);
          setBusinessbackList(resp.data.list);
        //  setId(param.id);
         })
         .catch(function(err){
            // alert("정보를 불러오지 못했습니다.");
         })
  
  }



  function busiDetail() {
    axios.get("http://localhost:3000/businessDetail", {params:{"email": param.id}})
         .then(function(resp){
            console.log(resp.data.seq);
            setSeq(resp.data.seq);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }



  useEffect(function(){
    businessback();
  },[busiDetail(), param.id]);



  //삭제
  //같이 보낸 파라미터값 매개변수 하나 더 추가해서 받아주기
  const historyDel = async(seq, e) => {
    await axios.post("http://localhost:3000/backDel", null,{params:{"seq":seq, "id": param.id}})
          .then(function(resp){
            alert("게시물이 삭제되었습니다.");
            window.location.reload(); //삭제하고 리로딩
            history('/back');
          })
          .catch(function(err){
            console.log(seq);
            alert("삭제에 실패했습니다");
          })
  }


  return(
    <div style={{ filter: "drop-shadow(10px 10px 10px #b3b2b2)"}}>
      <div style={{backgroundColor:"#998FFF", marginTop:"150px", height:"450px", width:"1000px", overflowY:"scroll", marginRight:"450px", borderRadius:"30px 30px 0px 0px"}}>
        {
          businessbackList.map(function(back, idx) {
            //짝수 오른쪽 정렬
            if(back.historyDate.slice(5,7)%2 === 0) {
              return(
                <div key={idx} style={{paddingRight:"470px", marginTop:"70px"}} >
                  <div key={idx} style={{textAlign:"right"}}>
                    <div id="jewel" style={{float:"right", marginLeft:"10px"}}/>
                    <h3 style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>{back.historyDate} {back.historyTitle}</h3>
                    <div style={{marginRight:"40px"}}>
                      <p style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>
                        {back.historyContent}
                        <br/>
                        <Link to={back.historyUrl}>{back.historyUrl}</Link>
                      </p>

                      <span>
                        <button id="delbtn" onClick={(e)=>{historyDel(back.seq, e)}} style={{marginRight:"5px"}} />
                        
                        <Link to={`/backUpdate/${back.seq}/${login}`}>
                          <button id="editbtn" />
                        </Link>
                      </span>
                      
                    </div>
                  </div>
                </div>
              )
            
            } else if(back.historyDate.slice(5,7)%2 === 1) {
              //홀수는 왼쪽정렬
              return(
                <div key={idx}style={{paddingLeft:"500px", marginTop:"70px"}}>
                  <div key={idx} style={{textAlign:"left"}}>
                      <div id="jewel" style={{float:"left", height:"15px", width:"15px", marginRight:"10px"}}/>
                      <h3 style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>{back.historyDate} {back.historyTitle}</h3>
                      <div style={{marginLeft:"40px"}}>
                        <p style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>
                          {back.historyContent}
                          <br/>
                          <Link to={back.historyUrl}>{back.historyUrl}</Link>
                        </p>
        
                        <span>
                          <button id="delbtn" onClick={(e)=>{historyDel(back.seq, e)}} style={{marginRight:"5px"}} />
                          <Link to={`/backUpdate/${back.seq}/${login}`}>
                            <button id="editbtn" />
                          </Link>
                        </span>
        
                      </div>
                  </div>
                </div>
                )
            }
          })
        }
        
      </div>
        <div className="middle" style={{backgroundColor:"#998FFF", height:"150px", width:"1000px", borderRadius:"0px 0px 30px 30px"}}>
          <Link to={`/informUpdate/${id}/${seq}`}>
            <button id="onlineBtn" style={{width:"250px"}}>
              명함수정
            </button>
          </Link>
          <Link to={`/backWrite/${id}`}>
          <button type="submit" id="onlineBtn" style={{width:"250px"}}>
            추가
          </button>
        </Link>
      </div>
  </div>
  );
}

export default BackOrderflip;