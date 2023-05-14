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

  function getDiarylist(page) {
    axios.get("http://localhost:3000/diaryList", {params:{"pageNumber":page}})
         .then(function(resp){
          //  console.log(resp.data.list[0].rdate);
          // console.log(today);
        //  console.log(resp.data.cnt);
       // console.log(resp.data.list);
          setDiarylist(resp.data.list);
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
    getDiarylist(page-1);
  }


  //클릭하면 글쓰기 함수 나오게
  const DiaryWrite = async(e) => {
    return(
     <div>

     </div>
    );
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
            <Link to={`/diaryWrite/${param.rdate || format(new Date(),'yyyy-MM-dd')}`}>
              <button id="addbtn" type='submit' onClick={DiaryWrite} style={{float:"right", marginRight:"30px", marginTop:"15px"}} />
            </Link>
          </p>
          <br/>
          <br/>
           <p style={{textAlign:"center", fontSize:"30px", marginTop:"-90px", marginLeft:"40px"}}>
               { //요거 없으면 ||이 뒤에 있는 값 넣으라는 뜻
                param.rdate || format(new Date(),'yyyy-MM-dd')}
           </p>
             {
                diarylist.map(function(diary, idx){
                  
                  var rdateStr = diary.rdate.toString();

                   //1. 클릭한 값이 있고, 이미지 추가를 안했을때
                    if((param.rdate === diary.rdate
                          || param.rdate === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10))) 
                          && diary.thumbnail === '') {
                      return (
                          <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                              <span style={{fontSize:"25px"}}>
                                {diary.title}
                              </span>
                              <span style={{fontSize:"25px"}}>
                                {diary.content}
                              </span>

                              <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                              </Link>
                              <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                              
                          </div>
                      ) 
                      //1-1. 클릭한 값이 있고, 이미지 추가를 했을때
                    } else if((param.rdate === diary.rdate
                                || param.rdate === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10))) 
                                && diary.thumbnail !== '') {
                          return (
                              <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                                  
                                  <img src={`/Me-img/${diary.thumbnail}`} alt="" style={{width:"100px", height:"100px"}} />
                                  <span style={{fontSize:"25px"}}>
                                    {diary.title}
                                  </span>
                                  <span style={{fontSize:"25px"}}>
                                    {diary.content}
                                  </span>

                                  <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                    <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                                  </Link>
                                  <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                                  <br/>
                              </div>
                          )
                        
                      }  //2. 클릭한 값이 없을때, 오늘 날짜만 불러와라 (이미지 추가가 안된 경우)
                        else if(param.rdate === undefined
                                  && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                      || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                      || format(new Date(),'yyyy-MM-dd') === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10)))
                                      && diary.thumbnail === '') {
                            
                            return (
                              <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                                  <span style={{fontSize:"25px"}}>
                                    {diary.title}
                                  </span>
                                  <span style={{fontSize:"25px"}}>
                                    {diary.content}
                                  </span>

                                  <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                    <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                                  </Link>
                                  <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                              </div>
                          )
                        }  //2-2. 클릭한 값이 없을때, 오늘 날짜만 불러와라 (이미지 추가된 경우)
                            else if(param.rdate === undefined
                                      && (format(new Date(),'yyyy-MM-dd') === rdateStr
                                          || format(new Date(),'yyyy-MM-dd') === rdateStr.substr(0,10)
                                          || format(new Date(),'yyyy-MM-dd') === (diary.rdate.slice(0,8) + '0' + diary.rdate.slice(8, 10)))
                                          && diary.thumbnail !== '') {
                                
                                return (
                                  <div key={idx} style={{marginBottom:"10px", marginLeft:"50px"}}>
                                      <img src={`/Me-img/${diary.thumbnail}`} alt="" style={{width:"100px", height:"100px"}} />
                                      <span style={{fontSize:"25px"}}>
                                        {diary.title}
                                      </span>
                                      <span style={{fontSize:"25px"}}>
                                        {diary.content}
                                      </span>

                                      <Link to={`/diaryUpdate/${diary.seq}/${diary.title}/${diary.content}/${diary.rdate}`}>
                                        <button id="editbtn" style={{float:"right", marginRight:"11px"}} type='submit'/>
                                      </Link>
                                      <button id="delbtn" style={{float:"right", marginRight:"10px"}} type="submit" value={diary.seq} onClick={(e)=>{diaryDelete(diary.seq, e)}} /*함수(param, e) -> 파라미터값 같이 보내는 방법*/ />
                                  </div>
                              )
                            }
                    } 
                  )
                  
                  
              }
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
