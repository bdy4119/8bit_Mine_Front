

import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";


import "./card.css";

function InformDetail() {

  let param = useParams();

  const[businessDetail, setbusinessDetail] = useState(); //객체로 접근하기 때문에 값을 넣지 않아도 됨
  
  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);


  function busiDetail() {
    axios.get("http://localhost:3000/businessDetail", {params:{"email": param.email}})
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
    busiDetail(param.email);

  },[param.email]);



  //딜레이 한번 주기
  if(loading === false) {
    return <div>Loading...</div>
  }
  
console.log("/Business-img/" + businessDetail.thumbnail);

  return(
    <div className="middle">
      
      <div style={{backgroundColor:"#9CA8F0", marginTop:"70px", height:"600px", width:"900px", fontSize:"20px"}}>
               
          <div style={{float:"left", position:"relative", marginLeft:"70px", marginTop:"70px"}}>
              <div>
                <form name="frm" encType="multipart/form-data">
                        
                  <img src={`${process.env.PUBLIC_URL}/Business-img/${businessDetail.thumbnail}`} alt="프로필 이미지" style={{width:"200px"}} />    
                  <br/>
                </form>
              </div>
          </div>

          <div style={{ marginLeft:"400px", marginTop:"70px"}}>
            <div style={{backgroundColor:"white", textAlign:"center", padding:"5px", width:"450px"}}>
              <h3>소개글</h3>
              <div>{businessDetail.introduce}</div>
            </div>
            <br/>
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
        
          <div className="middle" style={{marginTop:"100px"}}>
            <Link to={`/informUpdate/${param.email}`}>
              <button style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                명함수정
              </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to={`/back/${businessDetail.id}`}>
              <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                뒷면보기
              </button>
            </Link>
          </div>
        </div>
      </div>
  )
}
export default InformDetail;