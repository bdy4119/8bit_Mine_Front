import React from "react";
import "./card.css";
import "../mine_back.css"
import Topbar from "../main/topbar";
import Inform from "./Inform";
import {useNavigate } from "react-router-dom";

function Card() {
  
  let history = useNavigate();

  return(
    <div id="back">
            <Topbar/>
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn" onClick={(e) => { history("/i") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        I
                      </p>
                    </div>
                    <div id="mybtn" onClick={(e) => { history("/Filelist") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        MY
                      </p>
                    </div>
                    <div id="mebtn" onClick={(e) => { history("/me") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        ME
                      </p>
                    </div>
                    <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        MINE
                      </p>
                    </div>

                    <div id="cardbtn" onClick={(e) => { history("/card") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        CARD
                      </p>
                    </div>
                    <div id="bookbtn" onClick={(e) => { history("/gbmain") }}>
                      <p style={{position:"relative", marginTop:"60px", fontSize:"20px"}}>
                        GUEST
                      </p>  
                    </div>
                </div>
            </div>
            <div className="middle">
                <Inform/>
            </div>
            
    </div>
  );
}
export default Card;