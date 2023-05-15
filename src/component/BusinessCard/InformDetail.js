

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../mine_back.css"
import Topbar from "../main/topbar";


import "./card.css";

function InformDetail() {
  let history = useNavigate();
  let param = useParams();

  const[businessDetail, setbusinessDetail] = useState(); //객체로 접근하기 때문에 값을 넣지 않아도 됨
  
  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);


  function busiDetail() {
    axios.get("http://localhost:3000/businessDetail", {params:{"email": param.id}})
         .then(function(resp){
            console.log(resp.data);
            setbusinessDetail(resp.data);
            setLoading(true);   //렌더링 시작해주기
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }
//console.log(businessDetail.thumbnail);


  useEffect(function(){
    busiDetail(param.id);

  },[param.id]);



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
    <div className="middle" id="addOnlineCard">
      <div>
          <div style={{float:"left", position:"relative", marginLeft:"50px", marginTop:"70px"}}>
              <div>
                <form name="frm" encType="multipart/form-data">
                        
                  <img src={businessDetail.thumbnail ? `${process.env.PUBLIC_URL}/Business-img/${businessDetail.thumbnail}`:'/Business-img/나에대해 알아보기.png'}
                        alt="프로필 이미지" id="circle" />    
                  <br/>
                </form>
              </div>
          </div>

          <div style={{ marginLeft:"400px", marginTop:"70px"}}>
            <div id="talk" style={{marginTop:"50px", width:"500px", padding:"50px"}}>
              <h3 style={{fontFamily:'Do Hyeon', fontSize:"25px"}}>소개글</h3>
              <div style={{fontFamily:'Do Hyeon', fontSize:"25px"}}>{businessDetail.introduce}</div>
            </div>
            <br/>

            <div style={{fontFamily:'Do Hyeon', fontSize:"25px", textAlign:"left", marginTop:"30px"}}>
              <div>
                <span>이름: {businessDetail.name}</span>
              </div>
              <br/>
              <div>
                <span>H/P: {businessDetail.phoneNum}</span>
              </div>
              <br/>
              <div>
                <span>이메일: {businessDetail.email}</span>
              </div>
              <br/>
              <div>
                <span>
                  URL: <Link to={businessDetail.url}> {businessDetail.url} </Link>
                </span>
              </div>
            </div>
          </div>
        
          <div className="middle" style={{marginTop:"60px", paddingBottom:"30px"}}>
            <Link to={`/informUpdate/${param.id}/${businessDetail.seq}`}>
              <button id="onlineBtn" style={{width:"250px"}}>
                명함수정
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`/back/${businessDetail.id}`}>
              <button id="onlineBtn" style={{width:"250px"}} type="submit" >
                뒷면보기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default InformDetail;