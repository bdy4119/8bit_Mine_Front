import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Me.css";
/* 
  아이콘 관련
  : npm install react-icons
    npm install --save-dev @iconify/react
*/
import { Icon } from '@iconify/react';

/*
    날짜 관련 함수 라이브러리
    : npm install date-fns 
*/
import { format, addMonths, subMonths, subYears, addYears, subWeeks, addWeeks, subDays, parseJSON } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import * as getDiaryList from './Diary.js';
import { Link, useNavigate } from 'react-router-dom';


//현재 연월표시& 연월이동 함수
export const RenderHeader = ({currentMonth, currentYear, preMonth, nextMonth, preYear, nextYear}) => {
    return(
        <div className='middle'>
            <button id="preYear" onClick={preYear}/> &nbsp;
            <button id="preMonth" onClick={preMonth}/> &nbsp;&nbsp;&nbsp;
            <span>
                
                {/*
                    format(변수, "날짜형태")
                    : 원하는 형태의 날짜형태로 문자열로 받을 수 있음
                */}
                <p style={{fontFamily:"Nanum Pen Script", fontSize:"30px"}}>
                {format(currentYear, 'yyyy')}년 &nbsp;&nbsp;
                {format(currentMonth, 'M')}월
                </p>
            </span>
            &nbsp;&nbsp;&nbsp;
            <button id="nextMonth" onClick={nextMonth}/> &nbsp;
            <button id="nextYear" onClick={nextYear}/>  
        </div>
    );
}



//요일 함수
export const RenderDays = () => {
    const week = []; //일주일 배열 생성
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    for(let i=0; i<7; i++) {
        week.push(
            <div key={i} style={{ display:"inline-block", backgroundColor:"#8D98FF", height:"40px", width:"130px", textAlign:"center", fontFamily:"Nanum Pen Script", fontSize:"30px", paddingTop:"10px", marginTop:"10px"}} >
                {days[i]}
            </div>
        );
    }
    return (
        <div>
            {week}
        </div>
    );
}







export const Calendar = () => {


    // new Date() : 오늘 날짜 가져오기
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(new Date());

    //이전달 이동
    // sub() : 숫자를 입력하면 그 숫자만큼 원하는 날짜나 시간을 뺄 수 있음
    const preMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
      //  history(`/date/${format(subMonths(currentMonth, 1), 'M')}`);
    }
    //다음달 이동
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    //이전연도 이동
    const preYear = () => {
        setCurrentYear(subYears(currentYear, 1));
        setCurrentMonth(subMonths(currentMonth, 12));

    //    history(`/me/${format(subYears(currentYear, 1), 'yyyy')}/${format(subMonths(currentMonth, 12), 'M')}`);
    }

    //다음연도 이동
    const nextYear = () => {
        setCurrentYear(addYears(currentYear, 1));
        setCurrentMonth(addMonths(currentMonth, 12));
    }




    useEffect(function(){
        
      }, []);
   

    return(
        <div>
            <div style={{backgroundColor:"#A7BEFC", paddingTop:"10px", borderRadius:"15px"}}>
                <RenderHeader currentYear={currentYear} currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} preYear={preYear} nextYear={nextYear} />
                <RenderDays /*요일*/ />
            </div>
            <div style={{marginLeft:"7px"}}>
                <RenderCells currentYear={currentYear}  currentMonth={currentMonth} selectedDate={selectedDate} currentWeek={format(currentWeek, 'd')} />
            </div>
        </div>
    );
};
export default Calendar;



//날짜 함수
export const RenderCells = ({ currentYear, currentMonth, selectedDate, onDateClick, currentWeek}) => {

    const monthStart = startOfMonth(currentMonth); // 이번달의 시작일, 시작요일
    const startDate = startOfWeek(monthStart);     // 이번주의 시작일, 시작요일

    const monthEnd = endOfMonth(monthStart); // 이번달의 마지막 날짜, 마지막 요일
    const endDate = endOfWeek(monthEnd);     // 이번주의 마지막 날짜, 마지막 요일


    const[diarylist, setDiarylist] = useState([]);
    const[todolist, setTodolist] = useState([]);

    const [dateName, setDateName] = useState([]);   //기념일 이름
    const [locdate, setLocdate] = useState([]);   //기념일 날짜

  //데이터를 모두 읽을 때까지 rendering을 조절하는 변수
  const [loading, setLoading] = useState(false);


    //다이어리 리스트
    function getCalList() {
        axios.get("http://localhost:3000/diaryCalList", {params:{}})
         .then(function(resp){
            setDiarylist(resp.data.list);
         })
         .catch(function(err){

         })
    }

    //todo리스트
    function getTodoCallist() {
        axios.get("http://localhost:3000/getCalTodo", {params:{}})
            .then(function(resp){
              setTodolist(resp.data.list);
            })
            .catch(function(err){

            })
      }


    function getHoliday() {
        axios.get("http://localhost:3000/CalendarApi", {params:{"year":format(currentYear, 'yyyy')}})
                 .then(function(resp){
               //  console.log(JSON.stringify(resp.data.response.body.items));
                 setLoading(true);   //렌더링 시작해주기
                    for(let i=0; i<JSON.stringify(resp.data.response.body.items.item.length); i++) {
                        locdate[i] = JSON.stringify(resp.data.response.body.items.item[i].locdate);
                        dateName[i] = JSON.stringify(resp.data.response.body.items.item[i].dateName);
                    //  console.log(locdate[1] + dateName[1]);
                    }
                })
                .catch(function(err){

                })
    }

    const rows = []; // 1주 * 4 or 주
    let days = [];  // 1주
    let day = startDate; //이번달 시작날짜, 시작요일 넣어놓기
    let formatedDate = ''; //설정날짜 초기화
    
    while(day <= endDate) { //day가 endDate보다 커지면 종료
        for(let i = 0; i < 7; i++) {
            formatedDate = format(day, 'd');
            days.push(
                <div key={day} style={{float:"left", display:"inline-block", backgroundColor:"rgb(0, 0, 0, 0.05)", margin:"4px", height:"90px", width:"120px", verticalAlign:"top", borderRadius:"10px"}}>
                    <span>
                        <Link to={`/me/${format(day,'yyyy-MM-dd')}`} style={{textDecoration: "none", fontFamily:"Do Hyeon", fontSize:"20px", padding:"7px"}}>
                            {formatedDate}
                        </Link>
                        <br/>
                        {
                            dateName.map(function(dn, idx){
                                if( locdate[idx].substring(4,9) === format(day,'MMdd')) {
                                    return(
                                        <span key={idx} style={{fontFamily:"Do Hyeon", fontSize:"15px", padding:"5px"}}>
                                            {dn.replace(/\"/gi, "")}
                                        </span>
                                    );
                                }
                            })
                        }
                        {  
                            diarylist.map(function(diary, idx){
                                if(diary.rdate === format(day,'yyyy-MM-dd') || diary.rdate === format(day,'yyyy-MM-d')){
                                    return (
                                        <span key={idx} style={{color:'orange',fontFamily:"Nanum Pen Script", fontSize:"22px"}}>
                                            <div>
                                                <span style={{fontSize:"15px"}}>📔</span> {diary.title}
                                            </div>
                                        </span>
                                    );
                                }
                            })
                            
                        }
                        {
                            todolist.map(function(todo, idx){
                                if(todo.rdate === format(day,'yyyy-MM-dd') || todo.rdate === format(day,'yyyy-MM-d')){
                                    return (
                                        <span key={idx} style={{color:'green', fontFamily:"Nanum Pen Script", fontSize:"22px"}}>
                                            <div>
                                                <span style={{fontSize:"12px"}}>✅</span> {todo.title}
                                            </div>
                                        </span>
                                    );
                                }
                            })
                        }
                    </span>
                </div>,

            );

            day = addDays(day,1); // 시작날짜, 시작 요일 계속해서 늘어남
        }

        let Sunday = days[0].key[0] + days[0].key[1] + days[0].key[2];
        if(Sunday === "Sun"){
            rows.push(
                <div key={day} style={{font:"red"}}>
                    {days}
                </div>          
            );
        } else {
            rows.push(
                <div key={day}>
                    {days}
                </div>          
            );
        }
        days=[];
    }

  
    useEffect(function(){
        getCalList();
        getTodoCallist();

        }, [getHoliday()]);

    //딜레이 한번 주기
    if(loading === false) {
        return <div>Loading...</div>
    }
  return (
       <span>
            {rows}
        </span>
    );    
}




