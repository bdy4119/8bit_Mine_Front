import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TodoList() {
  const[todolist, setTodolist] = useState([]);
  const[today, setToday] = useState(new Date()); //오늘 날짜로 설정
  

  function getTodolist() {
    axios.get("http://localhost:3000/todoList", {params:{}})
        .then(function(resp){
          // console.log(resp.data.list[1].rdate);
          // alert(JSON.stringify(resp.data[0]));
          setTodolist(resp.data.list);
        })
        .catch(function(err){
            alert(err);
        })
  }

  useEffect(function(){
    getTodolist();
  },[]);

  return(
    <div>
      <div style={{border:"1px solid black", textAlign:"center"}}>
      <table border="1">
        <colgroup>
          <col width='70'/><col width='150'/><col width='600'/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan="3">TodoList</th>
            </tr>
            <tr>
              <th colSpan="3">{format(today, 'yyyy-MM-dd')}</th>
            </tr>
            <tr>
              <th>번호</th><th>제목</th><th>내용</th>
            </tr>
          </thead>
          <tbody>
             {
                todolist.map(function(todo, idx){
                  var rdateStr = todo.rdate;

                    //오늘 날짜와 같은 날짜인 것만 불러와라
                    if(format(today, 'yyyy-MM-dd') === todo.rdate
                        || format(today, 'yyyy-MM-dd') === rdateStr.substr(0,10)){
                    return (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>
                              {todo.title}                            
                            </td>
                            <td>{todo.content}</td>
                        </tr>
                    )
                    }
                  })
                }

                {/* {
                  function empty(todolist) {
                    for(let i=0; i<=todolist.length; i++) {

                      if((todolist.rdate[i] === format(today, 'yyyy-MM-dd')) === null){
                        return(
                          <tr>
                            <td colSpan="3">
                              todo목록이 비어있습니다
                            </td>
                          </tr>
                        )
                      }
                    }
                  }
                } */}
              <tr>
                <td colSpan="3">
                  <button type='submit'>
                    <Link to='/todoWrite'> +할일 추가 </Link>
                  </button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
export default TodoList;



