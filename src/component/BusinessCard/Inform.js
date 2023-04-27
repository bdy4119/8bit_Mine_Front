import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


import "./card.css";
//import face from './img/얼굴.png';

function Inform() {
  let history = useNavigate();

  let param = useParams();

  const[businessList, setBusinessList] = useState([]);
  const[seq, setSeq] = useState('');
  const[id, setId] = useState('');

  function business() {
    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //  console.log(resp.data.list);
          setBusinessList(resp.data.list);
          setId(resp.data.id);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }


  useEffect(function(){
    business();
  },[]);
  
  return(
    <div className="middle">
      {//글정보
          businessList.map(function(business, idx){
            var thumbnail = `./Business-img/${business.thumbnail}`;
            return(
              <div className="middle">
                <div style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}} /*명함틀*/ />
              
                {/* 글정보 및 버튼 */}
                <div style={{position: "relative", marginLeft:"-780px", fontSize:"20px"}}>
                  <div className="circle" style={{position: "relative", left:"-70px", height:"300px", width:"300px"}} /*아바타 테두리 원*/ />
                  <img src={thumbnail} alt="" style={{position: "relative", left:"-30px", marginTop:"-500px", width:"220px", marginBottom:"60px"}}/*아바타*/ />

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
                        <span>
                          URL: <Link to={business.url}> {business.url} </Link>
                        </span>
                      </div>
                  </div>
                  
                  <div style={{marginLeft:"250px", marginBottom:"-500px", marginTop:"50px"}}>
                    <Link to={`/informDetail/${business.id}`}>
                      <button style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
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