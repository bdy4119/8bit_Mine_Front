import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";



function TodoUpdate() {
  let history = useNavigate();  // 변수에 useNavigate 할당

  let param = useParams(); //변수에 params의 정보를 저장해놓고 변수 호출해서 사용

  const [rdate, setRdate] = useState(param.rdate.toString());
  let rdateArr = [rdate.substring(0,10)]; // 문자열로 바꾼 rdate를 잘라서 배열에 저장

  const [seq, setSeq] = useState(param.seq);
  const [title, setTitle] = useState(param.title);
  const [content, setContent] = useState(param.content);

  

  const handleSubmit = async(e) => {
    axios.post("http://localhost:3000/TodoUpdate", null, {params:{ "seq":seq, "title":title, "content" :content, "rdate": rdate}})
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
    <div>
      <h1>Todo 수정</h1>
      <hr/>

      <table border='1px' id="backwhite">
        <colgroup>
          <col width="100px"/>
          <col width="500px"/>
        </colgroup>
        <tbody>
          <tr>
            <th>Todo날짜</th>
            <td>
              <input defaultValue={rdateArr}
                //리액트에서 input은 readonly가 기본값 -> defaultValue에 설정할 value값 넣으면 수정 가능하게 됨
              onChange={(e)=>setRdate(e.target.value)}/>
            </td>
           </tr>
          <tr>
            <th>제목</th>
            <td>
              <input defaultValue={title} onChange={(e)=>setTitle(e.target.value)}/>
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <input defaultValue={content} onChange={(e)=>setContent(e.target.value)}/>
            </td>
          </tr>
        </tbody>
      </table>

      <br/>
      <button onClick={handleSubmit}>수정완료</button>
    </div>
  )
}
export default TodoUpdate;