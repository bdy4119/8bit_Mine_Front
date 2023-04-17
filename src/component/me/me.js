import React from 'react';
//import axios from 'axios';
import Calender from './Calendar';
import CheckList from './TodoList';
import Diary from './Diary';

import './Me.css';


function Me() {

  return(
    <div>
      <br/>
      <div className="middle">
        <Calender/>

        <span style={{paddingLeft:"50px", paddingRight:"30px"}}>
          <Diary />
          <span style={{paddingLeft:"50px", paddingRight:"30px"}}>
            <CheckList/>
          </span>
        </span>
        
      </div>

    </div>
  );
}
export default Me;