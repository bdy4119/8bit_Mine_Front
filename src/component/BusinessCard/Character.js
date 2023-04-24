import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";


import "./card.css";

function Character() {
  const[businessList, setBusinessList] = useState([]);


  function business() {
    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //console.log(resp.data.list[0].thumbnail);
          setBusinessList(resp.data.list);
        //  console.log(imgPath);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }

  useEffect(function(){
    business();
  },[]);

  return(
    <div>
      <div style={{marginTop:"-70px"}}>
        <div className="circle"style={{position: "relative", left:"-850px", height:"300px", width:"300px"}}/>
        {
          businessList.map(function(business, idx){
            
            var thumbnail = `./Business-img/${business.thumbnail}`;
            console.log(thumbnail);
            return(
              <img key={idx} src={thumbnail} alt="" style={{position: "relative", left:"-850px", width:"300px", marginTop:"-300px"}}/>
            )
          })
        }
      </div>
    </div>
  )
}
export default Character;