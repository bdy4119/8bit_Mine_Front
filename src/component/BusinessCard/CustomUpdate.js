import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./card.css";

function CustomUpdate() {
  let history = useNavigate();
  let param = useParams();

  let path = './Business-img/'; // 이미지 경로

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);

  const[seq, setSeq] = useState('');
  const[thumbnail, setThumbnail] = useState('');
  const[introduce, setIntroduce] = useState('');
  const[name, setName] = useState('');
  const[phoneNum, setPhoneNum] = useState('');
  const[email, setEmail] = useState('');
  const[url, setUrl] = useState('');
  
  const[hair, setHair] = useState([]);

  //시퀀스,id로 불러올 수 있는 함수 넣기
  function busiDetail(id) {
    axios.get("http://localhost:3000/businessDetail", {params:{"id": id}})
    .then(function(resp){    
     // console.log(resp.data.)
      setSeq(resp.data.seq);
      setThumbnail(resp.data.thumbnail);
      setIntroduce(resp.data.introduce);
      setName(resp.data.name);
      setPhoneNum(resp.data.phoneNum);
      setEmail(resp.data.email);
      setUrl(resp.data.url);

      setLoading(true);   //렌더링 시작해주기
    })
    .catch(function(err){
      alert("정보를 불러오지 못했습니다.");
    })
  }


  function Hair() {
    axios.get("http://localhost:3000/hair", {params:{}})
      .then(function(resp){    
        console.log(resp.data.list);
        setHair(resp.data.list);
      })
      .catch(function(err){
        alert("정보를 불러오지 못했습니다.");
      })
  }



  const handleSubmit = async(e) => {
    axios.post("http://localhost:3000/businessUpdate", null,
                {params:{"seq":seq, "id":param.id, "name":name, "email":email,
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




  function changeHair(e) {
    setThumbnail(e);
  }
  

  useEffect(function(){
    busiDetail(param.id);
    Hair();
  },[param.id]);


  //딜레이 한번 주기
  if(loading === false) {
    return <div>Loading...</div>
  }


  return(
    <div className="middle">

      <div style={{backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px", fontSize:"20px"}}>

        <div className="circle" style={{ position:"relative", left:"30px", marginTop:"50px", height:"300px", width:"300px"}}/>
        <img src={`/Business-img/${thumbnail}`} defaultValue={thumbnail} alt="" style={{position:"relative", left:"70px", marginTop:"-800px", width:"220px", marginBottom:"60px"}}
              onChange={(e)=>setThumbnail(e.target.src)}/>

        <div style={{marginLeft:"50px"}}>
          {
            hair.map(function(h, idx){
            // console.log(path + h.thumbnail);
              let altStr = "머리" + (idx+1);
              return(
                <span key={idx}>
                  <img src={`${h.thumbnail}`} alt={altStr} style={{width:"50px", padding:"10px"}} onClick={(e)=>setThumbnail(`${h.thumbnail}`)}/>
                </span>
              );
            })
          }
        </div>

        <div style={{ marginLeft:"400px", marginTop:"-350px"}}>
          <div style={{backgroundColor:"white", textAlign:"center", padding:"5px", width:"450px"}}>
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

        <div className="middle" style={{marginTop:"50px"}}>
          <button onClick={handleSubmit} style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
            수정완료
          </button>
        </div>
        
      </div>
    </div>
  );
}
export default CustomUpdate;