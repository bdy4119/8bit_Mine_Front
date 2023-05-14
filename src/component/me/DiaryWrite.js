import axios from "axios";
import { format } from "date-fns";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../main_back.css"
import Topbar from "../main/topbar";

function DiaryWrite() {
  let history = useNavigate();  // 변수에 useNavigate 할당
  let param = useParams();

  const [rdate, setRdate] = useState(format(new Date(),'yyyy-MM-dd'));
  console.log(rdate);
  let rdateStr = rdate.toString(); //rdate -> 문자열 변환
 // let rdateArr = [rdateStr.substring(0,10)];


  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const [imgFile, setImgFile] = useState();
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



  //작성완료 함수
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


    
    if(title === undefined || title.trim() === '') {
      alert('제목을 입력해주세요');
    }
    if(content === undefined || content.trim() === '') {
      alert('내용을 입력해주세요');
      return;
    }


    //글쓰기는 초기화 시켜줄 게 없으므로 useEffect를 사용하지 않아도 됨
    //작성완료 함수에서 한번에 처리해주기
    axios.post("http://localhost:3000/diaryWrite", null, {params:{"id":id, "thumbnail":thumbnail, "rdate":rdate , "title": title, "content" :content}})
         .then(function(resp){
            if(resp.data === "YES") {
              alert('글이 등록되었습니다.');
              history('/me');
            } else {
              alert('글을 등록하지 못했습니다.');
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
    e.preventDefault();
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
                  약속날짜 : <input name="rdate" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" defaultValue={param.rdate} onChange={(e)=>setRdate(e.target.value)}/>
                </span>
                <br/>
                <br/>
                <span style={{fontSize:"40px"}}>
                  제목: <input name="title" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </span>
                <br/>
                <br/>
                
                <img src={`${imgFile}`} alt="" style={{width:"200px"}} />
                <br/>
                <input type="file" name='uploadFile' onChange={imageLoad} ref={imgRef} />
                <br/>
                <br/>

                <span style={{fontSize:"40px"}}>
                  내용 : <input name="content" style={{backgroundColor:"rgb(0, 0, 0, 0.1)", fontFamily:"Nanum Pen Script, cursive"}} class="form-control-plaintext" id="staticEmail" value={content} onChange={(e)=>setContent(e.target.value)}/>
                </span>
              

                <br/>
                <button type="submit">작성완료</button>
              </form>
      
            </div>
    </div>
  )
}
export default DiaryWrite;