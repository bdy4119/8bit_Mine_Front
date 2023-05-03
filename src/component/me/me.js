import React from 'react';
//import axios from 'axios';
import Calender from './Calendar';
import TodoList from './TodoList';
import Diary from './Diary';

import './Me.css';
import { useParams } from 'react-router-dom';


function Me() {

  
  return(
    <div>
      <br/>
      <div className="middle">
        <Calender/>

        <span style={{paddingLeft:"50px", paddingRight:"30px"}}>
          <Diary />
          <span style={{paddingLeft:"50px", paddingRight:"30px"}}>
            <TodoList/>
          </span>
        </span>
        
      </div>

    </div>
  );
}
export default Me;