import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import "./card.css";
//import face from './img/얼굴.png';

function Inform() {
  let history = useNavigate();

  const[businessList, setBusinessList] = useState([]);
  const[seq, setSeq] = useState('');

  function business() {
    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //  console.log(resp.data.list);
          setBusinessList(resp.data.list);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }


  //뒷면페이지 이동
  function backLink(){
    history('/backPage');
  }



  useEffect(function(){
    business();
  },[]);
  
  return(
    <div>
      <div className="circle"style={{position: "relative", left:"-70px", height:"300px", width:"300px"}}/>
      {//글정보
          businessList.map(function(business, idx){
            var thumbnail = `./Business-img/${business.thumbnail}`;
            return(
              <div key={idx}>
                <img src={thumbnail} alt="" style={{position: "relative", left:"-765px", marginTop:"-500px", width:"220px", marginBottom:"60px"}}/>
                <div style={{ float:"left", marginLeft:"300px", marginTop:"-300px"}}>
                  <div value={business.introduce} style={{backgroundColor:"white", textAlign:"center", padding:"10px"}}>
                    <h3>소개글</h3>
                    <div>{business.introduce}</div>
                  </div>
                  <br/>
                  <div>
                    <span>이름: {business.name}</span>
                  </div>
                  <br/>
                  <div>
                    <span>H/P: {business.phoneNum}</span>
                  </div>
                  <br/>
                  <div>
                    <span>이메일: {business.email}</span>
                  </div>
                  <br/>
                  <div>
                    <span>
                      URL: <Link to={business.url}> {business.url} </Link>
                    </span>
                  </div>
                </div>
              
                <div style={{marginLeft:"150px", marginBottom:"-500px", marginTop:"100px"}}>
                  <Link to={`/customUpdate/${business.id}/${business.thumbnail}/${business.introduce}/${business.name}/${business.phoneNum}/${business.email}/${business.url}`}>
                    <button style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                      Custom/수정
                    </button>
                  </Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={backLink} style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                    뒷면보기
                  </button>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
export default Inform;