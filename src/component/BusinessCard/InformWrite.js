import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import "./card.css";

function InformWrite() {
  let history = useNavigate();
  let param = useParams();

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);

  const[seq, setSeq] = useState('');
  const[introduce, setIntroduce] = useState('');
  const[name, setName] = useState('');
  const[phoneNum, setPhoneNum] = useState('');
  const[email, setEmail] = useState(param.email);
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
     formData.append("seq", seq);
     formData.append("id", param.email);
   } else {
    formData.append("uploadFile", thumbnail);
    formData.append("thumbnail", thumbnail);
    formData.append("name", document.frm.name.value);
    formData.append("introduce", document.frm.introduce.value);
    formData.append("phoneNum", document.frm.phoneNum.value);
    formData.append("email", document.frm.email.value);
    formData.append("url", document.frm.url.value);
    formData.append("seq", seq);
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

  axios.post("http://localhost:3000/businessWrite", null,
                {params:{"id":email, "thumbnail": thumbnail, "name":name, "email":email,
                          "url":url, "phoneNum":phoneNum, "introduce":introduce}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('정보가 추가되었습니다.');
              history(`/informDetail/${email}`);
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
    <div className="middle">

        <div style={{backgroundColor:"#9CA8F0", marginTop:"70px", height:"600px", width:"900px", fontSize:"20px"}}>

          <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
            <div style={{float:"left", position:"relative", marginLeft:"70px", marginTop:"50px"}}>
              <div>
                  <img src={`${imgFile}`} alt="프로필" style={{width:"200px"}} />
                  <br/>
                  <input type="file" name='uploadFile' onChange={imageLoad} ref={imgRef} />
                  <br/>
              </div>
            </div>

              <div style={{ float:"left", marginLeft:"400px", marginTop:"-250px"}}>
                <div style={{backgroundColor:"white", textAlign:"center", padding:"5px", width:"450px"}}>
                  <h3>소개글</h3>
                  <input name="introduce" defaultValue={introduce} onChange={(e)=>setIntroduce(e.target.value)}/>
                </div>
                <br/>
                <div> 
                  이름 : <input  name="name" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <br/>
                <div>
                  H/P: <input name="phoneNum" defaultValue={phoneNum} onChange={(e)=>setPhoneNum(e.target.value)}/>
                </div>
                <br/>
                <div>
                  이메일: <input name="email" defaultValue={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <br/>
                <div>
                  <span>
                    URL: <input name="url" defaultValue={url} onChange={(e)=>setUrl(e.target.value)}/>
                  </span>
                </div>
              </div>

          

          <div className="middle" style={{clear:"left", paddingTop:"100px"}}>
            <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
              추가완료
            </button>
          </div>
          
          </form>
        </div>
    </div>
  );
}
export default InformWrite;