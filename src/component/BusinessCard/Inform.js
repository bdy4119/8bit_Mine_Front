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
    
    // const jwt = localStorage.getItem("token");
    // console.log(jwt);
    const id = localStorage.getItem("id");
    console.log(id);
    // axios.get("http://localhost:3000/show", {params:{"token":jwt}})
    //         .then(function(resp){
    //         //    console.log(resp.data.email);
    //             setUserEmail(resp.data.email);
    //         })
    //         .catch(function(err){
    //             alert(err);
    //         })

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
           <Link to={`/informWrite/${id}`}>
             <div id="addOnlineBtn">
               명함추가
             </div>
           </Link>
       );
    }
};
 
  return(
    <div className="middle">
      {/* <div id="shadow" style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px", marginLeft:"-600px", borderRadius: "1.5%"}} /> */}
      <div style={{position: "relative", marginLeft:"-550px", marginBottom:"0px", marginTop:"200px"}}>
        {renderAverage()}
      </div>
      {//글정보
          businessList.map(function(business, idx){
            return(
              <div className="middle" key={{idx}}>
                <div style={{float:"left", position:"relative", marginLeft:"-600px", marginTop:"-120px"}}>
                 
                    <form name="frm" encType="multipart/form-data">
                      <img src={business.thumbnail ? `${process.env.PUBLIC_URL}/Business-img/${business.thumbnail}`:'/Business-img/나에대해 알아보기.png'}
                           alt="프로필 이미지" id="circle" />    
                      <br/>
                    </form>
                </div>
                {/* 글정보 및 버튼 */}
                <div style={{position: "relative", marginTop:"150px", marginLeft:"-200px", fontSize:"20px"}}>

                  <div style={{ float:"left", marginLeft:"300px", marginTop:"-50px"}}>
                      <div id="talk">
                        <h3>소개글</h3>
                        <div>{business.introduce}</div>
                      </div>
                      <br/>
                      <div id="inform">
                        <div>
                          <span>이름: {business.name}</span>
                        </div>
                        <br/>
                        <div>
                          <span>
                            URL: <Link to={business.url}> {business.url} </Link>
                          </span>
                        </div>
                      </div>
                  </div>
                  
                  <div style={{marginLeft:"250px", marginBottom:"0px", marginTop:"350px"}}>
                    <Link to={`/informDetail/${id}`}>
                      <button className="btn btn-outline-warning" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                        상세보기
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })
      }
      </div>
  )
}
export default Inform;