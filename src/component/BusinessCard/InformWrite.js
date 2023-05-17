import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../mine_back.css"
import Topbar from "../main/topbar";
import "./card.css";

function InformWrite() {
  let history = useNavigate();
  let param = useParams();

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const[introduce, setIntroduce] = useState('');
  const[name, setName] = useState('');
  const[phoneNum, setPhoneNum] = useState('');
  const[email, setEmail] = useState(param.id);
  const[url, setUrl] = useState('');
  const[thumbnail, setThumbnail] = useState('');
  const [imgFile, setImgFile] = useState(`/Business-img/나에대해 알아보기.png`);
  const imgRef = useRef();  //useRef.current -> useRef는 무조건 current를 통해서 감


   // 이미지 업로드 input의 onChange
   function imageLoad() {
    const file= imgRef.current.files[0];
    const reader = new FileReader();  // FileReader API
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(imgRef.current.files[0].name);
      setThumbnail(imgRef.current.files[0].name);
      setImgFile(reader.result);
    }
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
     formData.append("id", param.id);
   } else {
    formData.append("uploadFile", thumbnail);
    formData.append("thumbnail", thumbnail);
    formData.append("name", document.frm.name.value);
    formData.append("introduce", document.frm.introduce.value);
    formData.append("phoneNum", document.frm.phoneNum.value);
    formData.append("email", param.id);
    formData.append("url", document.frm.url.value);
    formData.append("id", param.id);
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

  axios.post("http://localhost:3000/businessWrite", null,
                {params:{"id":param.id, "thumbnail": thumbnail, "name":name, "email":param.id,
                          "url":url, "phoneNum":phoneNum, "introduce":introduce}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('정보가 추가되었습니다.');
              history(`/informDetail/${param.id}`);
            } else {
              alert('정보를 추가하지 못했습니다.');
              history('/card');
            }
         })
         .catch(function(err){
            alert(err);
         })
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
    <div /*id="toolbox"*/>
    <div>

        <div id="addOnlineCard">
          <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
            <div style={{marginLeft:"-500px", marginTop:"70px"}}>
              <img src={`${imgFile}`} alt="프로필" id="circle"/>
              <br/>
              <br/>
              <input type="file" name='uploadFile' onChange={imageLoad} ref={imgRef} />
              <br/>
            </div>

              <div style={{ float:"left", marginLeft:"500px", marginTop:"-350px", textAlign:"left"}}>
                <div id="talk" style={{marginTop:"50px", width:"500px", padding:"50px"}}>
                  <h3 style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>소개글</h3>
                  <input className="input2" name="introduce" defaultValue={introduce} onChange={(e)=>setIntroduce(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"20px"}}/>
                </div>
                <br/>

                <div style={{marginLeft:"0px", marginTop:"20px"}}>
                    <div style={{fontFamily:"Do Hyeon", fontSize:"20px"}}> 
                      이름 : <input className="input2" name="name" defaultValue={name} onChange={(e)=>setName(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"20px"}}/>
                    </div>
                    <br/>
                    <div style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>
                      H/P: <input className="input2" name="phoneNum" defaultValue={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"20px"}}/>
                    </div>
                    <br/>
                    <div style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>
                      이메일: <input className="input2" name="email" defaultValue={email} onChange={(e)=>setEmail(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"20px", width:"250px"}}/>
                    </div>
                    <br/>
                    <div  style={{fontFamily:"Do Hyeon", fontSize:"20px"}}>
                        URL: <input className="input2" name="url" defaultValue={url} onChange={(e)=>setUrl(e.target.value)} style={{fontFamily:"Do Hyeon", fontSize:"20px", width:"250px"}}/>
                    </div>
                  </div>
                </div>

          

            <div className="middle" style={{clear:"left", paddingTop:"50px"}}>
              <button id="onlineBtn" type="submit" style={{fontSize:"30px", width:"250px"}}>
                추가완료
              </button>
            </div>
          
          </form>
        </div>
    </div>
    </div>
    </div>
  );
}
export default InformWrite;