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
import { format, addMonths, subMonths, subYears, addYears, subWeeks, addWeeks, subDays } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import { isSameMonth, isSameDay, addDays, parse } from 'date-fns';

import * as getDiaryList from './Diary.js';
import { Link } from 'react-router-dom';






//현재 연월표시& 연월이동 함수
const RenderHeader = ({currentMonth, currentYear, preMonth, nextMonth, preYear, nextYear}) => {
    return(
        <div className='middle'>
            <Icon icon="bi:arrow-left-circle-fill" onClick={preYear}/> &nbsp;
            <Icon icon="bi:arrow-left-circle-fill" onClick={preMonth}/> &nbsp;&nbsp;&nbsp;
            <span>
                
                {/*
                    format(변수, "날짜형태")
                    : 원하는 형태의 날짜형태로 문자열로 받을 수 있음
                */}
                {format(currentYear, 'yyyy')}년
                {format(currentMonth, 'M')}월
            </span>
            &nbsp;&nbsp;&nbsp;
            <Icon icon="bi:arrow-right-circle-fill" onClick={nextMonth}/> &nbsp;
            <Icon icon="bi:arrow-right-circle-fill" onClick={nextYear}/>
        </div>
    );
}



//요일 함수
const RenderDays = () => {
    const week = []; //일주일 배열 생성
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    for(let i=0; i<7; i++) {
        week.push(
            <div key={i} style={{ display:"inline-block", border:"1px solid black", height:"30px", width:"100px", textAlign:"center"}} >
                {days[i]}
            </div>
        );
    }
    return (
        <div style={{}}>
            {week}
        </div>
    );
}







function Calendar() {
    

    

//    const[today, setToday] = useState(new Date()); //오늘 날짜로 설정
    const[today, setToday] = useState(format(new Date(),'yyyy-MM-dd'));
    let todayStr = today.toString(); // 문자열로 변환



    // new Date() : 오늘 날짜 가져오기
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentYear, setCurrentYear] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(new Date());

    const [selectedDate, setSelectedDate] = useState(new Date());



    //이전달 이동
    // sub() : 숫자를 입력하면 그 숫자만큼 원하는 날짜나 시간을 뺄 수 있음
    const preMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    }
    //다음달 이동
    const nextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    }

    //이전연도 이동
    const preYear = () => {
        setCurrentYear(subYears(currentYear, 1));
        setCurrentMonth(subMonths(currentMonth, 12));
    }

    //다음연도 이동
    const nextYear = () => {
        setCurrentYear(addYears(currentYear, 1));
        setCurrentMonth(addMonths(currentMonth, 12));
    }


   

    return(
        <div>
            <div>
                <RenderHeader currentYear={currentYear} currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} preYear={preYear} nextYear={nextYear} />
                <br/>
                 <RenderDays //요일
                 />

                <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} currentWeek={format(currentWeek, 'd')} />
            </div>
        
            {/* 
                <div>
                    <Icon icon="bi:arrow-left-circle-fill" onClick={preWeek}/>
                    <Icon icon="bi:arrow-right-circle-fill" onClick={nextWeek}/>
                </div>
            */}
        </div>
    );
};
export default Calendar;



//날짜 함수
const RenderCells = ({currentMonth, selectedDate, onDateClick, currentWeek}) => {

    const monthStart = startOfMonth(currentMonth); // 이번달의 시작일, 시작요일
    const startDate = startOfWeek(monthStart);     // 이번주의 시작일, 시작요일

    const monthEnd = endOfMonth(monthStart); // 이번달의 마지막 날짜, 마지막 요일
    const endDate = endOfWeek(monthEnd);     // 이번주의 마지막 날짜, 마지막 요일


    const[diarylist, setDiarylist] = useState([]);
    const[todolist, setTodolist] = useState([]);
    const[rdate, setRdate] = useState(new Date());

    //다이어리 리스트
    function getCalList() {
        axios.get("http://localhost:3000/diaryCalList", {params:{}})
         .then(function(resp){
          setDiarylist(resp.data.list);
         })
         .catch(function(err){
            alert(err);
         })
    }


    //todo리스트
    function getTodoCallist() {
        axios.get("http://localhost:3000/todoList", {params:{}})
            .then(function(resp){
              setTodolist(resp.data.list);
            })
            .catch(function(err){
                alert(err);
            })
      }

      //해당 날짜칸 클릭시 수행할 함수
      function todayDiary() {
        window.location.href = "/"
      }

    

    const rows = []; // 1주 * 4 or 주
    let days = [];  // 1주
    let day = startDate; //이번달 시작날짜, 시작요일 넣어놓기
    let formatedDate = ''; //설정날짜 초기화
   console.log(diarylist);
    while(day <= endDate) { //day가 endDate보다 커지면 종료
        for(let i = 0; i < 7; i++) {
            formatedDate = format(day, 'd');
             //마지막 날짜를 formatedDate에 삽입
            days.push(
                <div key={day} style={{ display:"inline-block", border:"1px solid black", height:"100px", width:"100px", verticalAlign:"top"}} onClick={(e)=>{todayDiary()}}>
                    <span>
                        {formatedDate}
                        {
                            diarylist.map(function(diary, idx){
                               if(diary.rdate === format(day,'yyyy-MM-dd') || diary.rdate === format(day,'yyyy-MM-d')){
                                return (
                                    <span key={idx} style={{color:'blueviolet'}}>
                                        <div>
                                            {diary.title}
                                        </div>
                                     </span>
                                 );
                                }
                            })
                        }
                        <hr/>
                        {
                            todolist.map(function(todo, idx){
                                if(todo.rdate === format(day,'yyyy-MM-dd') || todo.rdate === format(day,'yyyy-MM-d')){
                                    return (
                                        <span key={idx} style={{color:'orange'}}>
                                            <div>
                                                {todo.title}
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
        rows.push(
            <div key={day} >
                {days}
            </div>
            
        );
        days=[];
    }
  
    useEffect(function(){
        getCalList();
        getTodoCallist();
      }, []);

  return (
       <span>
            {rows}
        </span>
    //   <tr>
    //       {days}
    //   </tr>
    );    
}




