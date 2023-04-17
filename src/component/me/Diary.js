import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
//import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import "./page.css";


//calendar DB사용
function Diary() {
  const[diarylist, setDiarylist] = useState([]);
  const[today, setToday] = useState(new Date());

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);

  function getDiarylist(page) {
    axios.get("http://localhost:3000/diaryList", {params:{"pageNumber":page}})
         .then(function(resp){
          //  console.log(resp.data.list[0].rdate);
          // console.log(today);
          console.log(resp.data.cnt);
            setDiarylist(resp.data.list);
          //  setTotalCnt(resp.data.cnt);
         })
         .catch(function(err){
            alert(err);
         })
  }


  function pageChange(page){
    setPage(page);
    getDiarylist(page-1);
}


  //클릭하면 글쓰기 함수 나오게
  const DiaryWrite = async(e) => {
    return(
     <div>

     </div>
    );
  }


  useEffect(function(){
    getDiarylist();
  }, [])


  return(
    <div>
      <div style={{border:"1px solid black", textAlign:"center"}}>
      <table border="1">
        <colgroup>
          <col width='70'/><col width='150'/><col width='600'/>
          </colgroup>
          <thead>
            <tr>
              <th colSpan="3">오늘의 일지</th>
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
                diarylist.map(function(diary, idx){
                   var rdateStr = diary.rdate;

                    //오늘 날짜와 같은 날짜인 것만 불러와라
                    if(format(today, 'yyyy-MM-dd') === rdateStr 
                        || format(today, 'yyyy-MM-dd') === rdateStr.substr(0,10)){ // 0번째부터 10전까지의 문자열만 가져와라
                        //  setTotalCnt(diary.cnt);
                    return (
                        <tr key={idx}>
                            <td>{idx+1}</td>
                            <td>
                              {diary.title}                            
                            </td>
                            <td>{diary.content}</td>
                        </tr>
                    )
                    }
                  })
              }
              <tr>
                <td colSpan="3">
                  <Pagination
                    activePage={page} 
                    itemsCountPerPage={5}
                    totalItemsCount={totalCnt}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange} />
                  <button type='submit' onClick={DiaryWrite}>+일지추가</button>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
}
export default Diary;
