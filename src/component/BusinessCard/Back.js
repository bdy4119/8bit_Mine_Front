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
     <div className="middle" style={{marginLeft:"0px"}}>
    {/* <div style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}} /*명함틀 /> */}

        <div style={{position: "relative", backgroundColor:"#9CA8F0", marginTop:"150px", height:"600px", width:"900px"}}>

          <div style={{paddingLeft:"80px"}}>
            <BackOrder/>
          </div>

          <div style={{padding:"50px"}} /*여백*/ />

          <div style={{paddingLeft:"330px"}}>
            <Link to={`/informDetail/${id}`}>
              <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px"}}>
                앞면보기
              </button>
            </Link>
          </div>

        </div>
      </div>
      
  );
}
export default Back;