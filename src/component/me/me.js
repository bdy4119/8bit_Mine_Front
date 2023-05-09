import React from 'react';
//import axios from 'axios';
import Calender from './Calendar';
import TodoList from './TodoList';
import Diary from './Diary';

import "../mine_back.css"
import Topbar from "../main/topbar";
import './Me.css';
import { useParams } from 'react-router-dom';


function Me() {

  
  return(
    <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn" onClick={(e) => { window.location.href = "/i" }}>I</div>
                    <div id="mybtn" onClick={(e) => { window.location.href = "/Filelist" }}>MY</div>
                    <div id="mebtn" onClick={(e) => { window.location.href = "/me" }}>ME</div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>MINE</div>

                    <div id="cardbtn" onClick={(e) => { window.location.href = "/card" }}>CARD</div>
                    <div id="bookbtn" onClick={(e) => { window.location.href = "/gbmain" }}>GUEST</div>
                </div>
            </div>
            <div id="toolbox">
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
    </div>
  );
}
export default Me;