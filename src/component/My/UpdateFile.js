
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
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
    <>
  <form name="frm" onSubmit={submitBtn}>
    <table align="center" border="1">
      <thead/>
      <tbody>
        <tr>
        <th>카테고리</th>
          <td>{json.mfCategory}</td>
          </tr>
          <tr>
          <th>작성자</th>
          <td>{json.mfUserId}</td>
          </tr>
          <tr>
          <th>파일이름</th>
          <td>{json.mfFileId}</td>
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
            <input type="file"></input>
           <tr>
          </tr>
        </tr>
      </tbody>
    </table>
    <button align="right" type="submit">수정완료</button>
    
   </form>
    </>
    
  )
}
