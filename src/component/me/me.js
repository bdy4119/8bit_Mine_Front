import React from 'react';
//import axios from 'axios';
import Calender from './Calendar';
import CheckList from './CheckList';
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
        </span>
        
        <CheckList/>
      </div>

    </div>
  );
}
export default Me;