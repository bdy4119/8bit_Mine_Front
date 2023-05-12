import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../main_back.css';

function TodoList() {
  let history = useNavigate();
  let param = useParams();

  const[todolist, setTodolist] = useState([]);

//  const[allChecked,setAllChecked] = useState(false);

  const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd')); //오늘 날짜로 설정
  let todayStr = today.toString(); // 문자열로 변환

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);



   



  //체크여부
  const checkUpdate = (checked, seq) => {
    if(!checked) { //체크 해제되면 del 0으로 설정
      axios.post("http://localhost:3000/updateCheck", null, {params:{"seq": seq, "del":0}})
          .then(function(resp){
            
          })
          .catch(function(err){
            
          })
    }
    if(checked) { //체크되면 del 1으로 설정
      axios.post("http://localhost:3000/updateCheck", null, {params:{"seq": seq, "del":1}})
      .then(function(resp){
        
      })
      .catch(function(err){
        
      })
    }

  }




  //todo리스트 받아오기
  function getTodolist(page) {
    axios.get("http://localhost:3000/todoList", {params:{"pageNumber":page}})
        .then(function(resp){
          setTodolist(resp.data.list);
          
          let nottoday = []; //오늘이랑 다른 날짜
          for(let i=0; i<resp.data.list.length; i++){
            if(resp.data.list[i].rdate !== todayStr
              || (resp.data.list[i].rdate).substr(0,10) !== todayStr){
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



  //삭제
  //같이 보낸 파라미터값 매개변수 하나 더 추가해서 받아주기
  const TodoDelete = async(seq, e) => {
    await axios.get("http://localhost:3000/deleteTodo", {params:{"seq":seq}})
          .then(function(resp){
            alert("게시물이 삭제되었습니다.");
            
            window.location.reload(); //삭제하고 리로딩 시키기
            history('/me');
          })
          .catch(function(err){
          //  console.log(seq);
            alert("삭제에 실패했습니다");
          })
  }


  
  useEffect(()=>{
    getTodolist();
  },[]);



  return(
    <div>
      
      <div id="todo" style={{marginBottom:"-200px"}}>
          <p style={{textAlign:"center", fontSize:"40px", marginTop:"30px", marginLeft:"70px"}}>
            [Todo리스트] 
            <Link to={`/todoWrite/${param.rdate || format(new Date(),'yyyy-MM-dd')}`}>
                <button id="addbtn" type='submit' style={{float:"right", marginRight:"50px", marginTop:"15px"}} />
            </Link>
          </p>
          <br/>
          <br/>
              <p style={{textAlign:"center", fontSize:"30px", marginTop:"-90px"}}>
                  { //요거 없으면 ||이 뒤에 있는 값 넣으라는 뜻
                      param.rdate || format(new Date(),'yyyy-MM-dd')
                    //   ( param.year + "-" + param.month + "-" + param.rdate.slice(7, 10))
                      }
              </p>
            <div>
             {
                todolist.map(function(todo, idx){
                  var rdateStr = todo.rdate.toString();
                  
                  //1. 달력 날짜를 클릭한 값이 있을때
                  if(param.rdate === rdateStr || param.rdate === rdateStr.substr(0,10)
                        || param.rdate === (todo.rdate.slice(0,8) + '0' + todo.rdate.slice(8, 10))){
                      return (
                            <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                              <input type="checkbox" onChange={(e) => {checkUpdate(e.target.checked,`${todo.seq}`)}} defaultChecked={todo.del === 1 ? true : false}>
                              </input>
                              &nbsp;&nbsp;
                              <span style={{fontSize:"25px"}}>
                                {todo.title} &nbsp;&nbsp;&nbsp;
                              </span>

                              <Link to={`/todoUpdate/${todo.seq}/${todo.title}/${todo.content}/${todo.rdate}`}>
                                <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                              </Link>
                              
                              <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={todo.seq} onClick={(e)=>{TodoDelete(todo.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                              
                              <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span style={{fontSize:"25px"}}>
                                : {todo.content}
                              </span>
                              
                            </div>
                      )
                    //2. 달력날짜를 클릭한 값이 없을때, 오늘 날짜만 불러와라
                  } else if(param.rdate === undefined
                            && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                || format(new Date(),'yyyy-MM-dd') === (todo.rdate.slice(0,8) + '0' + todo.rdate.slice(8, 10)))) {

                          return (
                            <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                              <input type='checkbox' onChange={(e) => {checkUpdate(e.target.checked,`${todo.seq}`)}} defaultChecked={todo.del === 1 ? true : false}/>
                              &nbsp;&nbsp;
                              <span style={{fontSize:"25px"}}>
                                {todo.title} &nbsp;&nbsp;&nbsp;
                              </span>

                              <Link to={`/todoUpdate/${todo.seq}/${todo.title}/${todo.content}/${todo.rdate}`}>
                                <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                              </Link>
                              
                              <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={todo.seq} onClick={(e)=>{TodoDelete(todo.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                              
                              <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span style={{fontSize:"25px"}}>
                                : {todo.content}
                              </span>
                              
                            </div>
                          )
                     }
                })
                  
                }
            </div>    

            
       <Pagination
         activePage={page} 
         itemsCountPerPage={10}
         totalItemsCount={totalCnt}
         pageRangeDisplayed={5}
         prevPageText={"이전"}
         nextPageText={"다음"}
         onChange={pageChange} />
                    
              
      </div>
    </div>
  )
}
export default TodoList;



