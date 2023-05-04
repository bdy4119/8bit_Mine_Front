import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function BackOrder() {
  let param = useParams();
  let history = useNavigate();

  const[businessbackList, setBusinessbackList] = useState([]);
  const[id, setId] = useState(param.id);

  function businessback() {
    axios.get("http://localhost:3000/businesscardBack", {params:{"id":param.id}})
         .then(function(resp){
          console.log(resp.data.list);
          setBusinessbackList(resp.data.list);
        //  setId(param.id);
         })
         .catch(function(err){
            alert("정보를 불러오지 못했습니다.");
         })
  }

  useEffect(function(){
    businessback(param.id);
  },[param.id]);



  //삭제
  //같이 보낸 파라미터값 매개변수 하나 더 추가해서 받아주기
  const historyDel = async(seq, e) => {
    await axios.post("http://localhost:3000/backDel", null,{params:{"seq":seq}})
          .then(function(resp){
            alert("게시물이 삭제되었습니다.");
            window.location.reload(); //삭제하고 리로딩
            history('/back');
          })
          .catch(function(err){
            console.log(seq);
            alert("삭제에 실패했습니다");
          })
  }
  

  return(
    <div>
      <div style={{backgroundColor:"#9CA8F0", marginTop:"70px", height:"450px", width:"900px", overflow:"auto"}}>
        {
          businessbackList.map(function(back, idx) {
            //짝수 오른쪽 정렬
            if(back.historyDate.slice(5,7)%2 === 0) {
              return(
                <div key={idx} style={{paddingRight:"430px", marginTop:"70px"}}>
                  <div key={idx} style={{textAlign:"right"}}>
                    <div className="sCircle" style={{float:"right", height:"15px", width:"15px", marginLeft:"10px"}}/>
                    <h3>{back.historyDate} {back.historyTitle}</h3>
                    <div style={{marginRight:"30px"}}>
                      <p>
                        {back.historyContent}
                        <br/>
                        <Link to={back.historyUrl}>{back.historyUrl}</Link>
                      </p>
    
                      <span>
                        <button onClick={(e)=>{historyDel(back.seq, e)}} style={{marginRight:"5px"}}>
                          삭제
                        </button>
                        <Link to={`/backUpdate/${back.seq}`}>
                          <button>수정</button>
                        </Link>
                      </span>
                      
                    </div>
                  </div>
                </div>
              )
            
            } else if(back.historyDate.slice(5,7)%2 === 1) {
              //홀수는 왼쪽정렬
              return(
                <div key={idx}style={{paddingLeft:"455px", marginTop:"70px"}}>
                  <div key={idx} style={{textAlign:"left"}}>
                      <div className="sCircle" style={{float:"left", height:"15px", width:"15px", marginRight:"10px"}}/>
                      <h3>{back.historyDate} {back.historyTitle}</h3>
                      <div style={{marginLeft:"30px"}}>
                        <p>
                          {back.historyContent}
                          <br/>
                          <Link to={back.historyUrl}>{back.historyUrl}</Link>
                        </p>
        
                        <span>
                          <button onClick={(e)=>{historyDel(back.seq, e)}} style={{marginRight:"5px"}}>
                            삭제
                          </button>
                          <Link to={`/backUpdate/${back.seq}`}>
                            <button>수정</button>
                          </Link>
                        </span>
        
                      </div>
                  </div>
                </div>
                )
            }
          })
        }
        
      </div>
        <div className="middle" style={{backgroundColor:"#9CA8F0", height:"150px", width:"900px"}}>
          <Link to={`/informDetail/${id}`}>
            <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px", margin:"10px"}}>
              앞면보기
            </button>
          </Link>
          <Link to={`/backWrite/${id}`}>
            <button type="submit" style={{backgroundColor:"rgb(255, 227, 71)", fontSize:"20px", padding:"10px", width:"200px", margin:"10px"}}>
              추가
            </button>
          </Link>
      </div>
  </div>
  );
}
export default BackOrder;