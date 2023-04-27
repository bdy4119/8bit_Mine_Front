import React from "react";
import { useNavigate } from "react-router-dom";

import "./card.css";

import Inform from "./Inform";


function Card() {
  
  return(
    <div className="middle">
      <div>
        <Inform/>
      </div>
    </div>
  );
}
export default Card;