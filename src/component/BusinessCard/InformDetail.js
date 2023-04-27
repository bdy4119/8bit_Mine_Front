import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import "./card.css";
//import face from './img/얼굴.png';

function InformDetail() {

  let param = useParams();
  

  const[businessDetail, setbusinessDetail] = useState(); //객체로 접근하기 때문에 값을 넣지 않아도 됨
  
  
  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);


  function busiDetail() {
    axios.get("http://localhost:3000/businessDetail", {params:{"id": param.id}})
         .then(function(resp){
            console.log(resp.data.thumbnail);
            setbusinessDetail(resp.data);
            setLoading(true);   //렌더링 시작해주기

         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }


  useEffect(function(){
    busiDetail(param.id);
  },[param.id]);


  //딜레이 한번 주기
  if(loading === false) {
    return <div>Loading...</div>
  }
  
  return(
    <div className="middle">
      <div style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}} /*명함틀*/ />
      
      <div style={{position: "relative", marginLeft:"-780px", marginTop:"0px", fontSize:"20px"}}>
      
          <div className="circle" style={{position: "relative", left:"-70px", height:"300px", width:"300px"}}/>
          <img src={businessDetail.thumbnail} alt="" style={{position: "relative", left:"-765px", marginTop:"-500px", width:"220px", marginBottom:"60px"}}/>
          <div style={{ float:"left", marginLeft:"300px", marginTop:"-300px"}}>
            <div value={businessDetail.introduce} style={{backgroundColor:"white", textAlign:"center", padding:"10px"}}>
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
        
          <div style={{marginLeft:"150px", marginBottom:"-500px", marginTop:"100px"}}>
            {/* <Link to={`/customUpdate/${businessDetail.id}/${businessDetail.thumbnail}/${businessDetail.introduce}/${businessDetail.name}/${businessDetail.phoneNum}/${businessDetail.email}/${businessDetail.url}`}> */}
            <Link to={`/customUpdate/${businessDetail.id}`}>
              <button style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                Custom/수정
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