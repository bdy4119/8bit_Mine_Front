import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../mine_back.css"
import Topbar from "../main/topbar";


import "./card.css";

function CustomUpdate() {
  let history = useNavigate();
  let param = useParams();

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);

  const[seq, setSeq] = useState(param.seq);
  const[introduce, setIntroduce] = useState('');
  const[name, setName] = useState('');
  const[phoneNum, setPhoneNum] = useState('');
  const[email, setEmail] = useState(param.email);
  const[url, setUrl] = useState('');
  const[thumbnail, setThumbnail] = useState('');


  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();  //useRef.current -> useRef는 무조건 current를 통해서 감


   // 이미지 업로드 input의 onChange
   function imageLoad() {
    const file= imgRef.current.files[0];
    const reader = new FileReader();  // FileReader API
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      //console.log(imgRef.current.files[0].name);
      setThumbnail(imgRef.current.files[0].name);
      setImgFile(reader.result);
    }
  }


  //시퀀스,id로 불러올 수 있는 함수 넣기
  function busiDetail(id) {
    axios.get("http://localhost:3000/businessDetail", {params:{"email": param.id}})
    .then(function(resp){    
     // console.log(resp.data.)
      setSeq(resp.data.seq);
      setIntroduce(resp.data.introduce);
      setName(resp.data.name);
      setPhoneNum(resp.data.phoneNum);
      setEmail(resp.data.email);
      setUrl(resp.data.url);
      setImgFile('/Business-img/' + resp.data.thumbnail); 
      setThumbnail(resp.data.thumbnail);  // 보낼 수정 데이터

      setLoading(true);   //렌더링 시작해주기
    })
    .catch(function(err){
      alert("정보를 불러오지 못했습니다.");
    })
  }


  function onSubmit(e) {
    e.preventDefault();
   
   let formData = new FormData();
   if(document.frm.uploadFile.files[0]) {
     formData.append("uploadFile", document.frm.uploadFile.files[0]);
     formData.append("thumbnail", thumbnail);
     formData.append("name", document.frm.name.value);
     formData.append("introduce", document.frm.introduce.value);
     formData.append("phoneNum", document.frm.phoneNum.value);
     formData.append("email", document.frm.email.value);
     formData.append("url", document.frm.url.value);
     formData.append("seq", param.seq);
     formData.append("id", param.email);
   } else {
    formData.append("uploadFile", thumbnail);
    formData.append("thumbnail", thumbnail);
    formData.append("name", document.frm.name.value);
    formData.append("introduce", document.frm.introduce.value);
    formData.append("phoneNum", document.frm.phoneNum.value);
    formData.append("email", document.frm.email.value);
    formData.append("url", document.frm.url.value);
    formData.append("seq", param.seq);
    formData.append("id", param.email);
   }

  // console.log(document.frm.uploadFile.files[0].name);

   axios.post("http://localhost:3000/fileUpload", formData)
        .then(function(res){
          console.log(JSON.stringify(res.data));
          if(res.data === "file upload success") {
            alert('업로드 성공');
           }
        })
        .catch(function(err){
          // alert(err);
        })


  //수정 */
  axios.post("http://localhost:3000/businessUpdate", null,
                {params:{"seq":seq, "id":param.id, "thumbnail": thumbnail, "name":name, "email":param.id,
                          "url":url, "phoneNum":phoneNum, "introduce":introduce}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('정보가 수정되었습니다.');
              history(`/informDetail/${param.id}`);
            } else {
              alert('정보를 수정하지 못했습니다.');
              history('/card');
            }
         })
         .catch(function(err){
            alert(err);
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
    <div id="addOnlineCard">

        <div>
          <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
              <div style={{marginLeft:"-500px", marginTop:"70px"}}>     
                  <img src={`${imgFile} === ''` ? '/Business-img/나에대해 알아보기.png' :`${imgFile}`} alt="프로필" id="circle" />
                  <br/>
                  <br/>
                  <input type="file" name='uploadFile' onChange={imageLoad} ref={imgRef} />
                  <br/>
              </div>

              <div style={{ float:"left", marginLeft:"500px", marginTop:"-350px", textAlign:"left", fontFamily:"Do Hyeon", fontSize:"25px"}}>
                <div id="talk" style={{marginTop:"50px", width:"500px", padding:"50px"}}>
                  <h3 style={{fontFamily:"Do Hyeon", fontSize:"25px"}}>소개글</h3>
                  <input name="introduce" defaultValue={introduce} onChange={(e)=>setIntroduce(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
                </div>
                <br/>
                <div> 
                  이름 : <input  name="name" defaultValue={name} onChange={(e)=>setName(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
                </div>
                <br/>
                <div>
                  H/P: <input name="phoneNum" defaultValue={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
                </div>
                <br/>
                <div>
                  이메일: <input name="email" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
                </div>
                <br/>
                <div>
                  URL: <input name="url" defaultValue={url} onChange={(e)=>setUrl(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"25px"}}/>
                </div>
              </div>

          

          <div className="middle" style={{clear:"left", paddingTop:"100px"}}>
            <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
              수정완료
            </button>
          </div>
          
          </form>
        </div>
    </div>
    </div>
  );
}
export default CustomUpdate;