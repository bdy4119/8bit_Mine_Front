import React, { useState } from 'react';
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
    const days = ['일','월', '화', '수', '목', '금', '토'];

    for(let i=0; i<7; i++) {
        week.push(
            <th key={i}>
                {days[i]}
            </th>
        );
    }
    return (
        <tr>
            {week}
        </tr>
    );
}



//날짜 함수
const RenderCells = ({currentMonth, selectedDate, onDateClick, currentWeek}) => {

    const monthStart = startOfMonth(currentMonth); // 이번달의 시작일, 시작요일
    const startDate = startOfWeek(monthStart);     // 이번주의 시작일, 시작요일

    const monthEnd = endOfMonth(monthStart); // 이번달의 마지막 날짜, 마지막 요일
    const endDate = endOfWeek(monthEnd);     // 이번주의 마지막 날짜, 마지막 요일

    const rows = []; // 1주 * 4 or 주
    let days = [];  // 1주
    let day = startDate; //이번달 시작날짜, 시작요일 넣어놓기
    let formatedDate = ''; //설정날짜 초기화

    
    while(day <= endDate) { //day가 endDate보다 커지면 종료
        for(let i = 0; i < 7; i++) {
            formatedDate = format(day, 'd'); //마지막 날짜를 formatedDate에 삽입
            const cloneDay = day; //같은 날짜 복붙
            days.push(
                <td key={day} onClick={()=> onDateClick(parse(cloneDay))}>
                    <span>
                        {formatedDate}
                    </span>
                </td>,
            );
            day = addDays(day,1); // 시작날짜, 시작 요일 계속해서 늘어남
        }
        rows.push(
            <tr key={day}>
                {days}
            </tr>
           );
           days=[];
       
          
     //   rows.push(days);
    }
    /*
    let row = [];
    for(let i=0; i<7; i++) {
            if(rows[i]. currentWeek) {
                row.push(rows[i]);
            }
        
   }
   */
  //  const rowlist = rows.map((row,idx)=>(<tbody>{row}</tbody>))
  
  

  return (
       <tbody style={{verticalAlign:"top"}}>
            {rows}
        </tbody>
    //   <tr>
    //       {days}
    //   </tr>
    );    
}







function Calendar() {

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

    //이전주 이동
    const preWeek = () => {
        setCurrentWeek(subWeeks(currentWeek, 1));
    }

    //다음주 이동
    const nextWeek = () => {
        setCurrentWeek(addWeeks(currentWeek, 1));
    }


    //날짜 클릭했을때 함수(아직 지정안함)
    const onDateClick = (day) => {
        setSelectedDate(day);
    }


    

    return(
        <div>
            <div>
                <RenderHeader currentYear={currentYear} currentMonth={currentMonth} preMonth={preMonth} nextMonth={nextMonth} preYear={preYear} nextYear={nextYear} />
            </div>
            <br/>
            <table border="1" width="650px" height="500px" style={{float:"left"}}>
                <thead>
                    <RenderDays />
                </thead>
                <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} currentWeek={format(currentWeek, 'd')} onDateClick={onDateClick} />
            </table>
        
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