import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackOrder from "./BackOrder";
import "./card.css";
import "../mine_back.css"
import Topbar from "../main/topbar";

function Back() {
  let param = useParams();

  const[id, setId] = useState(param.id);

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
                    <BackOrder/>
              </div>
            </div>
    </div>
      
  );
}
export default Back;