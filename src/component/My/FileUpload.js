
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./FileUpload.css" 
function FileUpload() {
       
  const [mfCategory , setMfCategory] = useState('')
  const [mfTitle , setMfTitle] = useState('')
  const [mfMemo , setMfMemo] = useState('')
  const [mfFileId, setMfFileId] = useState('')
  const history = useNavigate();
  const date = new Date();


  const onSubmit =(e)=>{
    e.preventDefault();
    //짐싸서 보내기
    let formData = new FormData();
    formData.append("mfCategory", mfCategory);
    formData.append("mfTitle", mfTitle);
    formData.append("mfMemo", mfMemo);
    formData.append("mfFileId", mfFileId);
    formData.append("fileLoad", document.frm.uploadFile.files[0]);
    console.log(`formData:${formData}`);
    // Upload
    axios.post("http://localhost:3000/uploadFile", formData)
    .then(function(resp){
      alert('파일이 업로드 되었습니다.');
      history('/Filelist')
    })
    .catch(function(err){
      alert(err);
    }) 
  }
  return(
    <>
      <form name="frm" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className='rwd-table' align="center">
          <table align="center" border="1">
            <thead/>
            <tbody>
              <tr>
                <th>카테고리</th>
                  <td>
                    <select value={mfCategory} onChange={(e) => setMfCategory(e.target.value)}>
                      <option value="">==선택==</option>
                      <option value="project">project</option>
                      <option value="certificate">certificate</option>
                      <option value="portfolio">portfolio</option>
                      <option value="picture">picture</option>
                    </select>
                  </td>
              </tr>
              <tr>
                <th>작성자</th>
                {/* TO-DO 작성자 ID 담기 */}
                <td><input type="text" value={mfFileId} onChange={(e)=>{setMfFileId(e.target.value)}}/></td>
              </tr>
              <tr>
                <th>파일이름</th>
                <td><input type="text" value={mfTitle} onChange={(e)=>{setMfTitle(e.target.value)}}/></td>
              </tr>
              <tr>
                <th>등록일</th>
                <td><input type='text' value={date}/></td>
              </tr>
              <tr>
                <th>메모</th>
                <td><input type="text" value={mfMemo} onChange={(e)=>{setMfMemo(e.target.value)}} /></td>
              </tr>
              <tr>
                <input type="file" name="uploadFile"></input>
              </tr>
            </tbody>
          </table >
          <input type="submit" value="file upload"/>
        </div>
      </form>
    </>
  );
}
export default FileUpload;
