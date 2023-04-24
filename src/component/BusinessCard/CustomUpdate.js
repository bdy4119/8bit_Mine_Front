import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./card.css";

function CustomUpdate() {
  let history = useNavigate();
  let param = useParams();

  const[id, setId] = useState(param.id);
  const[name, setName] = useState(param.name);
  const[email, setEmail] = useState(param.email);
  const[url, setUrl] = useState(param.url);
  const[thumbnail, setThumbnail] = useState(param.thumbnail);
  const[phoneNum, setPhoneNum] = useState(param.phoneNum);
  const[introduce, setIntroduce] = useState(param.introduce);

  const handleSubmit = async(e) => {
    axios.post("http://localhost:3000/businessUpdate", null,
                {params:{"id":id, "name":name, "email":email,
                          "url":url, "thumbnail":thumbnail, "phoneNum":phoneNum, "introduce":introduce}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('정보가 수정되었습니다.');
              history('/card');
            } else {
              alert('정보를 수정하지 못했습니다.');
              history('/card');
            }
         })
         .catch(function(err){
            alert(err);
         })
  }

  return(
    <div className="middle">
      <div style={{position: "relative", backgroundColor:"#9CA8F0", height:"600px", width:"900px", marginTop:"100px"}} // 명함틀
      />

      <div style={{position: "relative", marginLeft:"-780px", marginTop:"-50px", fontSize:"20px"}}>    
        <div className="circle" style={{position: "relative", left:"-70px", height:"300px", width:"300px"}}/>
        <img src={`./Business-img/${thumbnail}`} defaultValue={thumbnail} alt="" style={{position: "relative", left:"-765px", marginTop:"-500px", width:"220px", marginBottom:"60px"}} onChange={(e)=>setThumbnail(e.target.value)}/>

        <div style={{ float:"left", marginLeft:"300px", marginTop:"-300px"}}>
          <div style={{backgroundColor:"white", textAlign:"center", padding:"10px"}}>
            <h3>소개글</h3>
            <input defaultValue={introduce} onChange={(e)=>setIntroduce(e.target.value)}/>
          </div>
          <br/>
          <div>
            이름 : <input defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          <br/>
          <div>
            H/P: <input defaultValue={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
          </div>
          <br/>
          <div>
            이메일: <input defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <br/>
          <div>
            <span>
              URL: <input defaultValue={url} onChange={(e)=>setUrl(e.target.value)}/>
            </span>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit}>수정완료</button>
    </div>
  );
}
export default CustomUpdate;