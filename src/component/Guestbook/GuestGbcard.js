import axios from "axios";
import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../mine/images/logo.png';

import { GbInformDetailFilp } from "../BusinessCard/GbInformDetailflip";
import GbBackorder from "../BusinessCard/GbBackorder";

function GuestGbcard() {
  let params = useParams();
  let history = useNavigate();

  let mineid = params.mineid;

  const id = localStorage.getItem("id");


  return(
    <div id="back">
      <div>
          <div id="logo" onClick={() => { history('/main') }} style={{ marginLeft: "-850px", marginTop: "-30px" }}>
              <img src={logo} alt="no" width="300px" />
          </div>
      </div>
      <div id="topbar">
          <div id="barbtns">
              <div id="ibtn" onClick={(e) => { window.location.href = "/guest_mine/" + mineid }}>
                  <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                      MINE
                  </p>
              </div>
              <div id="mybtn" onClick={(e) => { window.location.href = "/guest_card/" + mineid }}>
                  <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                      CARD
                  </p>
              </div>
              <div id="mebtn" onClick={(e) => { history("/guest_gbmain/" + mineid) }}>
                  <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                      GUEST
                  </p>
              </div>
              <div id="minebtn" onClick={(e) => { history("/gbmain") }}>
                  <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
                      HOME
                  </p>
              </div>
          </div>
      </div>

      <div class="flip">  
        <div class="busicard"> 
          <div>
            <GbInformDetailFilp/>
          </div>
          <div class="back">
            <GbBackorder/>
          </div>
        </div>
      </div>

    </div>
  )
}
export default GuestGbcard;