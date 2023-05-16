
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Table, Form, Input } from 'semantic-ui-react'
import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";
export default function UpdateFile() {
  let params = useParams();
  const[title, setTitle] = useState('');
  const [json, setJson] = useState('');
  const [memo, setMemo] = useState('');
  const [mfTitle, setMfTitle] = useState('')
  const [mfCategory, setMfCategory] = useState('')
  const [mfMemo, setMfMemo] = useState('')
  const [mfFileId, setMfFileId] = useState(localStorage.getItem("id"));
  const history = useNavigate();
  const date = new Date();
  
  
  
  
  console.log(params.seq);
  // 원본 데이터 가져오기
  const fetchData = async () => {
    axios.get("http://localhost:3000/fileDetail", { params: { "mfSeq": params.seq } })
      .then(function (res) {
        setJson(res.data);
        setMfCategory(res.data.mfCategory);
      })
      .catch(function (err) {
        console.log(err);
      })
  }

  const updateSubmit = async (e) => {
    e.preventDefault();
   
    //짐싸서 보내기
    let formData = new FormData();
    formData.append("mfSeq",params.seq);
    formData.append("mfCategory", mfCategory);
    formData.append("mfTitle", mfTitle);
    formData.append("mfMemo", mfMemo);
    formData.append("mfFileId", mfFileId);
    formData.append("fileLoad", document.frm.uploadFile.files[0]);
    console.log(`formData:${formData}`);
    // 
    axios.post("http://localhost:3000/updateFile", formData)
      .then(function (resp) {
        alert(resp.data);
        history('/Filelist')
      })
      .catch(function (err) {
        alert(err);
      })
    




  
  const memoChange = (e) => {
    setMemo(e.target.value);
  }
 
  }
  useEffect(() => {
    fetchData();
   
  }, [params.seq],)

  return (
    <div id="back">
      <Topbar />
      <Barbtns />
      <form name="frm" encType="multipart/form-data" onSubmit={updateSubmit}>
        <Table style={{ position: "absolute", marginLeft: "500px", marginTop: "200px", width: "800px" }}
          color="pink" textAlign="center">
          <Table.Header />
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell>카테고리</Table.HeaderCell>
              <Table.Cell>
                <select value={json.mfCategory} onChange={(e)=>{setMfCategory(e.target.value)}}>
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
              <Table.Cell>{json.mfFileId}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>파일이름</Table.HeaderCell>
              <Table.Cell><Input size="large" type="text" defaultValue={json.mfTitle} onChange={(e)=>{setMfTitle(e.target.value)}} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>등록일</Table.HeaderCell>
              <Table.Cell>{json.mfRegdate}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>메모</Table.HeaderCell>
              <Table.Cell><Input size="large" type="text" defaultValue={json.mfMemo} onChange={(e)=>{setMfMemo(e.target.value)}} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>파일</Table.HeaderCell>
              <Table.Cell><input type="file" name="uploadFile" /></Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2} style={{ textAlign: "right" }}>
              <Button  color="pink" className='uploadbtns'>파일 수정</Button>
            </Table.Cell>
          </Table.Row>
        </Table >
      </form>
    </div >
  )
}
