import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Icon } from '@iconify/react';
import "./card.css";


function Inform() {

  const[businessList, setBusinessList] = useState([]);
  const id = localStorage.getItem("id");
  console.log(id);
  
  function business() {
    const id = localStorage.getItem("id");
    console.log(id);

    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //  console.log(resp.data.list);
          setBusinessList(resp.data.list);
         })
         .catch(function(err){
            alert("정보를 추가해주세요");
         })
  }


  useEffect(function(){
    business();
  },[]);
  

  const renderAverage = () => {
    if(businessList.length === 0) {
       return(
        <div style={{position: "relative", marginLeft:"-550px", marginBottom:"0px", marginTop:"200px"}}>
           <Link to={`/informWrite/${id}`}>
             <div id="addOnlineBtn">
               명함추가
             </div>
           </Link>
        </div>
       );
    }
};
 
  return(
    <div className="middle" id="onlineCard" style={{marginLeft:"-650px"}}>
        {renderAverage()}
      {//글정보
          businessList.map(function(business, idx){
            return(
              <div style={{marginBottom:"-100px", marginRight:"-400px"}} key={idx}>
                <div style={{float:"left"}}>
                  <img src={business.thumbnail ? `${process.env.PUBLIC_URL}/Business-img/${business.thumbnail}`:'/Business-img/나에대해 알아보기.png'}
                        alt="프로필 이미지" id="circle" style={{marginLeft:"-500px", marginTop:"-50px"}} />    
                </div>

                <div style={{float:"inherit", marginTop:"-50px"}}>
                  <div id="talk">
                    <h3 style={{fontFamily:'Do Hyeon', fontSize:"25px"}}>소개글</h3>
                    <div>{business.introduce}</div>
                  </div>
                  <br/>
                  <div style={{marginLeft:"-200px"}}>
                    <div style={{fontFamily:'Do Hyeon', fontSize:"25px"}}>
                      <span>이름: {business.name}</span>
                    </div>
                    <br/>
                    <div>
                      <span style={{fontFamily:'Do Hyeon', fontSize:"25px"}}>
                        URL: <Link to={business.url}> {business.url} </Link>
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{float:"none", marginLeft:"-300px", marginTop:"100px"}}>
                  <Link to={`/informDetail/${id}`}>
                    <button id="onlineBtn" style={{width:"250px"}}>
                      상세보기
                    </button>
                  </Link>           
                </div>

              </div>
            )
          })
      }
    </div>
  )
}
export default Inform;