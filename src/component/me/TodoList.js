import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Pagination from 'react-js-pagination';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../main_back.css';

function TodoList() {
  let history = useNavigate();
  let param = useParams();

  const[todolist, setTodolist] = useState([]);

  const[del, setDel] = useState('0');  // 새로고침해도 배열 유지하기
  const[seq, setSeq] = useState('');
  const[check, setCheck] = useState();
  const[checkBoxList, setCheckBoxList] = useState([]); // 체크된 리스트 배열에 넣기


//  const[allChecked,setAllChecked] = useState(false);

  const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd')); //오늘 날짜로 설정
  let todayStr = today.toString(); // 문자열로 변환

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);



   



  //del이 0이면 체크 해제, del이 1이면 체크 유지
  const checkUpdate = (checked, item) => {
  //  console.log(item[0]); del
  //  console.log(item[1]); seq
  //  setDel(item[0]);
  //  setSeq(item[1]);

    

  setSeq(item.substring(1));
    axios.post("http://localhost:3000/updateCheck", null, {params:{"seq": item.substring(1), "del":del}})
    .then(function(resp){
      if(resp.data === "YES") {
        console.log(del);
        console.log(item.substring(1));
       // console.log(checked);

        if (checked) {
          setCheckBoxList([...checkBoxList, item]);
          console.log(checkBoxList);
          setDel(1);
        } else if (!checked) {
          setCheckBoxList(checkBoxList.filter(e => e !== item));
          setDel(0);
        }
      }
    })
    .catch(function(err){
      
    })
   

  }




  function getTodolist() {
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


  


  /*
  const checkedItemHandler = (e) => {
    setCheckBoxList(e.target.value);
    if(!isChecked && checkBoxList.includes(e.target.value)){
      //filter : true면 요소를 유지, false면 버림
        setCheckBoxList(checkBoxList.filter((todo) => todo !== e.target.value));
        return;
     }
   } 
   */


  
  useEffect(()=>{

    for(let i = 0; i<todolist.length; i++) {
      if(todolist[i].del === 1) {
        console.log(todolist);
        setCheck(true);
      } else if(todolist[i].del === 0) {
        setCheck(false);
      }
    }

    getTodolist();

  },[]);



  return(
    <div>
      <div style={{border:"1px solid black", textAlign:"center"}}>
      <table border="1" id="backwhite">
        <colgroup>
          <col width='70'/><col width='150'/><col width='450'/><col width='50'/><col width='50'/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan="5">TodoList</th>
            </tr>
            <tr>
              <th colSpan="5">
              {param.rdate || format(new Date(),'yyyy-MM-dd')}
              </th>
            </tr>
            <tr>
              <th colSpan="2">제목</th><th colSpan="3">내용</th>
            </tr>
          </thead>
          <tbody>
             {
                todolist.map(function(todo, idx){
                  var rdateStr = todo.rdate.toString();
          
                  //1. 달력 날짜를 클릭한 값이 있을때
                  if(param.rdate === rdateStr || param.rdate === rdateStr.substr(0,10)
                      || param.rdate === (todo.rdate.slice(0,8) + '0' + todo.rdate.slice(8, 10))){
                    return (
                        <tr key={idx}>
                            <td colSpan="2" align='left'>
                            <input type='checkbox' id={todo} value={`${todo.del}${todo.seq}`}
                                      onChange={(e) => {checkUpdate(e.target.checked, e.target.value)}}
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={check}/>
                              {todo.title}
                            </td>
                            <td>{todo.content}</td>
                            <td>
                              <Link to={`/todoUpdate/${todo.seq}/${todo.title}/${todo.content}/${todo.rdate}`}>
                                <button type='submit'>수정</button>
                              </Link>
                            </td>
                            <td>
                              <button type="submit" value={todo.seq} 
                                onClick={(e)=>{TodoDelete(todo.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/>
                                  삭제
                              </button>
                            </td>
                        </tr>
                    )

                    //2. 달력날짜를 클릭한 값이 없을때, 오늘 날짜만 불러와라
                  } else if(param.rdate === undefined
                            && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                || format(new Date(),'yyyy-MM-dd') === (todo.rdate.slice(0,8) + '0' + todo.rdate.slice(8, 10)))) {

                          return (
                            <tr key={idx}>
                                <td colSpan="2" align='left'>
                                   <input type='checkbox' id={todo} value={`${todo.del}${todo.seq}`}
                                      onChange={(e) => {checkUpdate(e.target.checked, e.target.value)}}
                                // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                                checked={check}/>
                                  {todo.title}
                                </td>
                                <td>{todo.content}</td>
                                <td>
                                  <Link to={`/todoUpdate/${todo.seq}/${todo.title}/${todo.content}/${todo.rdate}`}>
                                    <button type='submit'>수정</button>
                                  </Link>
                                </td>
                                <td>
                                  <button type="submit" value={todo.seq} 
                                    onClick={(e)=>{TodoDelete(todo.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/>
                                      삭제
                                  </button>
                                </td>
                            </tr>
                          )
                     }
                })
                  
                }

              <tr>
                <td colSpan="5">
                  <Pagination
                    activePage={page} 
                    itemsCountPerPage={10}
                    totalItemsCount={totalCnt}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange} />

                    <Link to={`/todoWrite/${param.rdate || format(new Date(),'yyyy-MM-dd')}`}>
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



