import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';

function TodoList() {
  const[todolist, setTodolist] = useState([]);
  const[today, setToday] = useState(new Date()); //오늘 날짜로 설정
  
  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  function getTodolist() {
    axios.get("http://localhost:3000/todoList", {params:{}})
        .then(function(resp){
          // console.log(resp.data.list[1].rdate);
          // alert(JSON.stringify(resp.data[0]));
          setTodolist(resp.data.list);

          let nottoday = []; //오늘이랑 다른 날짜
          for(let i=0; i<resp.data.list.length; i++){
            if((resp.data.list[i].rdate).substr(0,10) !== format(today, 'yyyy-MM-dd')){
                nottoday.push(resp.data.list[i]);
            }
          }
        //  console.log(nottoday);
          setTotalCnt(resp.data.cnt - nottoday.length);
        })
        .catch(function(err){
            alert(err);
        })
  }

  function pageChange(page){ 
    setPage(page);
    getTodolist(page-1);
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
                  <Pagination
                    activePage={page} 
                    itemsCountPerPage={10}
                    totalItemsCount={totalCnt}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange} />

                    <Link to='/todoWrite'>
                      <button type='submit'> +할일 추가 </button>
                    </Link>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
export default TodoList;



