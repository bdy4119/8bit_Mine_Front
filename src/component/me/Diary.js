import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import Pagination from "react-js-pagination";
import { Link, useNavigate, useParams } from 'react-router-dom';

import "./page.css";

//calendar DB사용
function Diary() {
  let history = useNavigate();
  let param = useParams();

  const[diarylist, setDiarylist] = useState([]);
  
  const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd')); //오늘 날짜로 설정
  let todayStr = today.toString(); // 문자열로 변환

 // console.log(param.year);

  // paging
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(0);


  const id = localStorage.getItem("id");
  console.log(id);

  function getDiarylist(page) {
    axios.get("http://localhost:3000/diaryList", {params:{"pageNumber":page, "id":id}})
         .then(function(resp){
          setDiarylist(resp.data.list);

          let nottoday = []; //오늘이랑 다른 날짜
          for(let i=0; i<resp.data.list.length; i++){
            if(resp.data.list[i].rdate !== todayStr
              || (resp.data.list[i].rdate).substr(0,10) !== todayStr){
                nottoday.push(resp.data.list[i]);
            }
          }
          setTotalCnt(resp.data.cnt - nottoday.length);
         })
         .catch(function(err){
          
         })
  }


  function pageChange(page){ 
    setPage(page);
    getDiarylist(page-1);
  }




  //삭제
  //같이 보낸 파라미터값 매개변수 하나 더 추가해서 받아주기
  const diaryDelete = async(seq, e) => {
    await axios.get("http://localhost:3000/deleteDiary", {params:{"seq":seq}})
          .then(function(resp){
            alert("게시물이 삭제되었습니다.");
            window.location.reload(); //삭제하고 리로딩
            history('/me');
          })
          .catch(function(err){
            console.log(seq);
            alert("삭제에 실패했습니다");
          })
  }



  useEffect(function(){
    getDiarylist();
  }, []);


  return(
    <div>
      <div id="diary" style={{textAlign:"center"}}>
        <p style={{textAlign:"center", fontSize:"40px", marginTop:"20px", marginLeft:"100px"}}>
            [다이어리] 
            <Link to={`/diaryWrite/${param.rdate || format(new Date(),'yyyy-MM-dd')}/${id}`}>
              <button id="addbtn" type='submit' style={{float:"right", marginRight:"30px", marginTop:"15px"}} />
            </Link>
          </p>
          <br/>
          <br/>
           <p style={{textAlign:"center", fontSize:"30px", marginTop:"-90px", marginLeft:"40px"}}>
               { //요거 없으면 ||이 뒤에 있는 값 넣으라는 뜻
                param.rdate || format(new Date(),'yyyy-MM-dd')}
           </p>
           <table style={{fontSize:"20px", textAlign:"center", marginLeft:"50px"}}>
             <colgroup>
                <col style={{width: '100px'}}/>
                <col style={{width: '500px'}}/>
                <col style={{width: '100px'}}/>
                <col style={{width: '100px'}}/>
             </colgroup>
             <thead>
              <tr>
                <th>제목</th>
                <th colSpan={2}>내용</th>
                <th></th>
              </tr>
             </thead>
             <tbody>
             {
                diarylist.map(function(diary, idx){
                  
                  var rdateStr = diary.rdate.toString();

                   //1. 클릭한 값이 있고, 이미지 추가를 안했을때
                    if((param.rdate === diary.rdate
                          || param.rdate === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10))) 
                          && diary.thumbnail === '') {
                      return (
                        <tr key={idx}>
                            <td>
                              {diary.title}
                            </td>
                            <td colSpan={2}>
                              {diary.content}
                            </td>
                            <td>
                              <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                <button id="editbtn" style={{marginLeft:"50px"}} type='submit'/>
                              </Link>
                            </td>
                            <td>
                              <button id="delbtn" type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                            </td>
                        </tr>   
                      ) 
                      //1-1. 클릭한 값이 있고, 이미지 추가를 했을때
                    } else if((param.rdate === diary.rdate
                                || param.rdate === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10))) 
                                && diary.thumbnail !== '') {
                          return (
                                <tr key={idx}>
                                    <td>
                                      {diary.title}
                                    </td>
                                    <td colSpan={2}>
                                      {diary.content}
                                      
                                      <img src={`/Me-img/${diary.thumbnail}`} alt="" style={{width:"80px", height:"80px"}} />
                                    </td>
                                    <td colSpan={2}>
                                      <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}/${diary.thumbnail}`}>
                                        <button id="editbtn" style={{marginRight:"-60px"}} type='submit'/>
                                      </Link>
                                      <button id="delbtn" type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                                    </td>
                                </tr>                              
                          )
                        
                      }  //2. 클릭한 값이 없을때, 오늘 날짜만 불러와라 (이미지 추가가 안된 경우)
                        else if(param.rdate === undefined
                                  && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                      || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                      || format(new Date(),'yyyy-MM-dd') === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10)))
                                      && diary.thumbnail === '') {
                            
                            return (
                              <tr key={idx}>
                                  <td>
                                    {diary.title}
                                  </td>
                                  <td>
                                    {diary.content}
                                  </td>
                                  <td>
                                    <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                      <button id="editbtn" style={{marginLeft:"50px"}} type='submit'/>
                                    </Link>
                                  </td>
                                  <td>
                                    <button id="delbtn" type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                                  </td>
                              </tr>   
                          )
                        }  //2-2. 클릭한 값이 없을때, 오늘 날짜만 불러와라 (이미지 추가된 경우)
                            else if(param.rdate === undefined
                                      && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                          || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                          || format(new Date(),'yyyy-MM-dd') === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10)))
                                          && diary.thumbnail !== '') {
                                
                                return (
                                  <tr key={idx}>
                                    <td>
                                      {diary.title}
                                    </td>
                                    <td colSpan={2}>
                                      {diary.content}
                                      
                                      <img src={`/Me-img/${diary.thumbnail}`} alt="" style={{width:"80px", height:"80px"}} />
                                    </td>
                                    <td colSpan={2}>
                                      <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}/${diary.thumbnail}`}>
                                        <button id="editbtn" style={{marginRight:"-60px"}} type='submit'/>
                                      </Link>
                                      <button id="delbtn" type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                                    </td>
                                </tr>        
                              )
                            }
                    } 
                  )
                  
                  
              }
              </tbody>
              </table>
                  <Pagination
                    activePage={page} //현재 페이지
                    itemsCountPerPage={1} //한 페이지당 보여줄 리스트 개수
                    totalItemsCount={totalCnt} //총 아이템 수
                    pageRangeDisplayed={1}   //paginator에서 보여줄 페이지 범위
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={pageChange} //페이지 핸들링
                     />
      </div>
    </div>
  );
}
export default Diary;
