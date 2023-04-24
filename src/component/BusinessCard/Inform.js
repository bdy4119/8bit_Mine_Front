import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Inform() {
  const[businessList, setBusinessList] = useState([]);

  function business() {
    axios.get("http://localhost:3000/businesscard", {params:{}})
         .then(function(resp){
          //  console.log(resp.data.list);
          setBusinessList(resp.data.list);
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
      {
          businessList.map(function(business, idx){
            return(
              <div key={idx}>
                <div>
                  <span>이름: {business.name}</span>
                </div>
                <br/>
                <div>
                  <span>이메일: {business.email}</span>
                </div>
                <br/>
                <div>
                  <span>
                    URL: <Link to={business.url}> {business.url} </Link>
                  </span>
                </div>
              </div>
            )
          })
      }
    </div>
  )
}
export default Inform;