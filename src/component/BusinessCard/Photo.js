import axios from "axios";
import React, { useRef, useState } from "react";

function Photo() {
  const [resp, setResp] = useState();
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();  //useRef.current -> useRef는 무조건 current를 통해서 감


  // 이미지 업로드 input의 onChange
  function imageLoad() {
    const file= imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    }
  }





  function onSubmit(e) {
    e.preventDefault();
   
   let formData = new FormData();
   formData.append("uploadFile", document.frm.uploadFile.files[0]);
  // formData.append("inform", document.frm.inform.value);
   // formData.append("name", document.frm.inform.name.value);
   // formData.append("phoneNum", document.frm.inform.phoneNum.value);
   // formData.append("email", document.frm.inform.email.value);
   // formData.append("url", document.frm.inform.url.value);

   axios.post("http://localhost:3000/fileUpload", formData)
        .then(function(res){
          console.log(JSON.stringify(res.data));
           if(res.data === "file upload success") {
             alert('업로드 성공');
             let objArr = res.data.predictions[0].detection_names;
             console.log(objArr[0]);
 
             let objs = objArr.map((obj, idx) => <li key={idx}>{obj}</li>);
             console.log(objs);
 
             setResp(objs);
           }
        })
        .catch(function(err){
           alert(err);
        })
 }


  return(
    <div>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
              {/* <img src={imgFile} alt="" style={{width:"200px"}} /> */}
              
              <img
              src={imgFile ? imgFile :`/Business-img/얼굴.png`}
              alt="프로필 이미지" style={{width:"200px"}}
              />
             
             <br/>
              <input type="file" accept="Business-img/*" id="profileImg" name='uploadFile' onChange={imageLoad} ref={imgRef}/>

              <br/>
              <input type="submit" value="file upload"/>
            
      </form>
            <ul>
              {resp}
            </ul>
    </div>
  )
}
export default Photo;