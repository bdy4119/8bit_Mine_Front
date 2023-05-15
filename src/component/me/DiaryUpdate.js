import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../main/topbar";
import Diary from "./Diary";

import "../mine_back.css"
import "../main/main.css"


function DiaryUpdate() {
  let history = useNavigate();  // 변수에 useNavigate 할당

  let param = useParams(); //변수에 params의 정보를 저장해놓고 변수 호출해서 사용

  
  const [rdate, setRdate] = useState(param.rdate.toString());// 불러온 rdate 문자열로 변환해서 저장
  let rdateArr = [rdate.substring(0,10)]; // 문자열로 변환된 rdate 잘라오기
  
//  console.log(rdateArr);
  const [seq, setSeq] = useState(param.seq);
  const [title, setTitle] = useState(param.title);
  const [content, setContent] = useState(param.content);
  const [thumbnail, setThumbnail] = useState(param.thumbnail);

  const [imgFile, setImgFile] = useState('/Me-img/' + param.thumbnail);
  const imgRef = useRef();  //useRef.current -> useRef는 무조건 current를 통해서 감

  console.log(param.thumbnail);

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

  console.log(param.thumbnail)

  const handleSubmit = async(e) => {

    let formData = new FormData();
    if(document.frm.uploadFile.files[0]) {
       formData.append("id", "");
       formData.append("rdate", document.frm.rdate.value);
       formData.append("title", document.frm.title.value);
       formData.append("content", document.frm.content.value);
       formData.append("uploadFile", document.frm.uploadFile.files[0]);
       formData.append("thumbnail", thumbnail);
    } else {
       formData.append("id", "");
       formData.append("title", document.frm.title.value);
       formData.append("content", document.frm.content.value);
       formData.append("uploadFile", thumbnail);
       formData.append("thumbnail", thumbnail);
    }
 
   // console.log(document.frm.uploadFile.files[0].name);
 
    axios.post("http://localhost:3000/diaryUpload", formData)
         .then(function(res){
           console.log(JSON.stringify(res.data));
           if(res.data === "file upload success") {
             alert('업로드 성공');
            }
         })
         .catch(function(err){
           // alert(err);
         })

    axios.post("http://localhost:3000/diaryUpdate", null, {params:{ "seq":seq, "thumbnail": thumbnail, "title":title, "content" :content, "rdate": rdate}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('글이 수정되었습니다.');
              history('/me');
            } else {
              alert('글을 수정하지 못했습니다.');
              history('/me');
            }
         })
         .catch(function(err){
            alert(err);
         })

    /* preventDefault
      : 이벤트의 기본기능을 막는 것.
        >> 클릭했을때 href로 설정되어있는 주소로 바로 이동하는 것이 아니라,
           e.preventDefault(); 로 우선 이벤트를 멈춘 후
           js의 소스의 기능을 먼저 따른다.
    */
  //  e.preventDefault();
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
      <div id="diaryWrite" className="middle" style={{marginTop:"80px", marginLeft:"500px"}}>
        
         <form name="frm" onSubmit={handleSubmit} encType="multipart/form-data">
              <span style={{fontSize:"40px"}}>
                약속날짜 : <input name="rdate" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" defaultValue={rdateArr}
                              //리액트에서 input은 readonly가 기본값 -> defaultValue에 설정할 value값 넣으면 수정 가능하게 됨
                            onChange={(e)=>setRdate(e.target.value)}/>
              </span>
              <br/>
              <br/>
              <span style={{fontSize:"40px"}}>
                제목: <input name="title" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
              </span>
              <br/>

              <img src={`${imgFile}`} alt="" style={{width:"200px"}} />
              <br/>
              <input type="file" name='uploadFile' onChange={imageLoad} ref={imgRef} />
              <br/>
              <br/>

              <span style={{fontSize:"40px"}}>
                내용 : <input name="content" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" defaultValue={content} onChange={(e)=>setContent(e.target.value)}/>
              </span>


              <br/>
              <br/>
              <button type="submit" class="btn btn-success" style={{fontSize:"30px", marginTop:"20px", marginLeft:"50px", width:"170px", height:"60px"}}>작성완료</button>
          </form>
      </div>

    </div>
  )
}
export default DiaryUpdate;