import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Pagination from 'react-js-pagination';
import { Link, useNavigate } from 'react-router-dom';

function TodoList() {
  let history = useNavigate();

  const[todolist, setTodolist] = useState([]);

  //체크박스
  const[checkBoxList, setCheckBoxList] = useState([]); // 체크된 리스트 배열에 넣기
  const[isChecked, setIsChecked] = useState(false);  //체크상태 확인

  const [cookies, setCookies] = useCookies('');
  const [saveCheck, setSaveCheck] = useState(false);

//  const[allChecked,setAllChecked] = useState(false);

  const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd')); //오늘 날짜로 설정
  let todayStr = today.toString(); // 문자열로 변환

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

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


   //체크박스 단일 선택
   const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckBoxList([...checkBoxList, item]);

      if(!saveCheck === true && checkBoxList !== null){            
        setCookies("checked", true);
      }else{            
       setCookies("checked", false);
      }
    } else if (!checked) {
      setCheckBoxList(checkBoxList.filter(el => el !== item));
   //   setCookies("checked", !checked);
    }
  };


/*
  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 isCheck 상태 업데이트
      const idArray = [];
      checkBoxList.forEach((el) => idArray.push(el.id));
      setIsChecked(idArray);
    }
    else {
      // 전체 선택 해제 시 isChecked 를 빈 배열로 상태 업데이트
      setIsChecked([]);
    }
  }
*/


  useEffect(function(){
    getTodolist();

    let checked = cookies.checked;
      if(checked === true){
        setIsChecked(checked);
        setSaveCheck(true);
      }else{
        setIsChecked('');
        setSaveCheck(false);
      }

  },[cookies]);



  return(
    <div>
      <div style={{border:"1px solid black", textAlign:"center"}}>
      <table border="1">
        <colgroup>
          <col width='70'/><col width='150'/><col width='500'/><col width='100'/><col width='100'/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan="5">TodoList</th>
            </tr>
            <tr>
              <th colSpan="5">{todayStr}</th>
            </tr>
            <tr>
              {/* <th>
                <input type='checkbox' value={checkBoxList} name='select-all'
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={isChecked.length === checkBoxList.length ? true : false}
                />
              </th> */}
              <th colSpan="2">제목</th><th colSpan="3">내용</th>
            </tr>
          </thead>
          <tbody>
             {
                todolist.map(function(todo, idx){
                  //오늘 날짜와 같은 날짜인 것만 불러와라
                  var rdateStr = todo.rdate.toString();
                  console.log(todo.rdate)
               //   let count = 0;
                  if(todayStr === rdateStr || todayStr === rdateStr.substr(0,10)){
                    
                    /*
                      //변수 선언해서 count++넣기
                      for(let i=idx; 0<i<idx; i--) {
                        count = i-1;
                        if(todayStr !== rdateStr || todayStr !== rdateStr.substr(0,10)) {
                          count -= i;
                        }
                      //  console.log(count);
                     }
                    */

                    return (
                        <tr key={idx}>
                            <td colSpan="2" align='left'>
                              <input type='checkbox' id={todo} value={`${todo.title}/${todo.content}/${todo.rdate}`}
                              onChange={(e) => {onCheckedElement(e.target.checked, e.target.value)}}
                              // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
                              checked={checkBoxList.includes(`${todo.title}/${todo.content}/${todo.rdate}`) ? true : false}/>
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
                    console.log(checkBoxList);
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
                <td colSpan="5">
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



