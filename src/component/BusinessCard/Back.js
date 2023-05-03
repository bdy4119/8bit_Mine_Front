import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackOrder from "./BackOrder";
import "./card.css";

function Back() {
  let param = useParams();

  const[id, setId] = useState(param.id);

  return(
     <div className="middle">
          <BackOrder/>
      </div>
      
  );
}
export default Back;