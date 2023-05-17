import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Table, Form, Input } from 'semantic-ui-react'
import Barbtns from '../main/barbtns';
import Topbar from '../main/topbar';
import "./FileUpload.css"
function FileUpload() {

  const [mfCategory, setMfCategory] = useState('')
  const [mfTitle, setMfTitle] = useState('')
  const [mfMemo, setMfMemo] = useState('')
  const [mfFileId, setMfFileId] = useState(localStorage.getItem("id"));
  const history = useNavigate();
  const date = new Date();


  const onSubmit = (e) => {
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
      .then(function (resp) {
        alert('파일이 업로드 되었습니다.');
        history('/Filelist')
      })
      .catch(function (err) {
        alert(err);
      })
  
     
  
  
    }

  return (
    <div id="back">
      <Topbar />
      <Barbtns />
      <form name="frm" encType="multipart/form-data" onSubmit={onSubmit}>
        <Table style={{ position: "absolute", marginLeft: "500px", marginTop: "200px", width: "800px" }}
          color="pink" textAlign="center">
          <Table.Header />
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>카테고리</Table.HeaderCell>
              <Table.Cell>
                <select value={mfCategory} onChange={(e) => setMfCategory(e.target.value)}>
                  <option value="">==선택==</option>
                  <option value="project">project</option>
                  <option value="certificate">certificate</option>
                  <option value="portfolio">portfolio</option>
                  <option value="picture">picture</option>
                </select>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>작성자</Table.HeaderCell>
              {/* TO-DO 작성자 ID 담기 */}
              <Table.Cell>{mfFileId}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>파일이름</Table.HeaderCell>
              <Table.Cell><Input size="large" type="text" value={mfTitle} onChange={(e) => { setMfTitle(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>등록일</Table.HeaderCell>
              <Table.Cell>{<Input size="large" readOnly="readOnly" type='text' value={date} />}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>메모</Table.HeaderCell>
              <Table.Cell><Input size="large" type="text" value={mfMemo} onChange={(e) => { setMfMemo(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
            <Table.HeaderCell>파일</Table.HeaderCell>
              <Table.Cell><input type="file" name="uploadFile"></input></Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2} style={{ textAlign: "right" }}>
              <Button type="submit" color="pink" className='uploadbtns'>업로드</Button>
                </Table.Cell>
          </Table.Row>
        </Table >
      </form>
    </div >
  );
}
export default FileUpload;
