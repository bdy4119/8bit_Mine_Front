
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Table, Form, Input } from 'semantic-ui-react'
export default function UpdateFile() {
  let params = useParams();
  const [json, setJson] = useState('');
  const [memo, setMemo] = useState('');
  console.log(params.seq);
  // 원본 데이터 가져오기
  const fetchData = async() => {
    axios.get("http://localhost:3000/fileDetail", {params:{"mfSeq":params.seq}} )
    .then(function(res){
      console.log(res);
      setJson(res.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }
  const memoChange = (e) => {
    setMemo(e.target.value);
  }
   //함수
  const submitBtn = (e) => {
  
  }
  useEffect(()=>{
    fetchData();
  },[params.seq])
  
  return (
    <div className="rwd-table2" style={{marginLeft:"350px"}}>
  <form name="frm" onSubmit={submitBtn}>
    <table align="center" border="1">
      <thead/>
      <tbody>
   
      <tr>
                <th>카테고리</th>
                  <td>
                    <select value={json.mfCategory} onChange={(e) => setJson(e.target.value)}>
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
          <td>{json.mfFileId}</td>
          </tr>
          <tr>
          <th>파일이름</th>
          <td>{json.mfFilename}</td>
          </tr>
          <tr>
          <th>등록일</th>
          <td>{json.mfRegdate}</td>
          </tr>
          <tr>
          <th>메모</th>
          <td><input defaultValue={json.mfMemo}/></td>
          </tr>
          <tr>
            <input type="file" ></input>
           <tr>
          </tr>
        </tr>
      </tbody>
    </table>
    <tr/><tr/>
    <tr/><tr/>
    <button  style={{marginLeft:"1040px",backgroundColor:"#E81C88",color:"white",width: "110px", height:"60px"}} align="right" type="submit">수정완료</button>
    
   </form>
    </div>
    
  )
}
