import React, {useState, useEffect, Fragment} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import alram from "./images/alram.png";
import "../mine_back.css";
import "./mine.css";

function Mine_guestbook({ setAlramOpen}){

    const id = localStorage.getItem("id");

    const history = useNavigate();

    const closeModal = () => {
      setAlramOpen(false);
  };

  const getUser = async () => {
    const jwt = localStorage.getItem("token");

    if (jwt === null) {
        history("/");
    }
    }

    const [ansList, setAnsList] = useState([]);

    useEffect(() => {
        const answerList = async () => {
            const response = await axios.post("http://localhost:3000/answerlist", null, {params: { "mineid": id }});

            console.log(response.data);
            setAnsList(response.data);
        };

        const noticemineupdate = async () => {
            await axios.post("http://localhost:3000/noticemineupdate", null, {params: { "id": id }});
        
        };

        getUser();
        answerList();
        noticemineupdate();

    }, [ansList]);


    function deleteanswer(seq){

        axios.post("http://localhost:3000/deleteanswer", null, { params:{ "seq":seq } })
                .then(res => {
                if(res.data === "YES"){
                    axios.post("http://localhost:3000/noticemineupdate", null, {params: { "id": id }});

                    alert("성공적으로 삭제되었습니다");
                }else{
                    alert("등록되지 않았습니다");
                }
                })
                .catch(function(err){
                alert(err);
                })   
    }
    
    return (
          <div id="mineguestbook">
                <div id="alramimg">
                    <img src={alram} alt="no" width="800px"></img>
                </div>
              <div id="close2">
                <button onClick={closeModal}>X</button>
              </div>
              <table id="report"> 
                     <thead>
                        <tr>
                            <th className="short">방문자</th>
                            <th className="long">#1</th>
                            <th className="long">#2</th>
                            <th className="long">#3</th>
                            <th className="short"></th>
                        </tr>
                     </thead>
                  <tbody>
                  {
                      ansList.map(function (object, i) {
                      return (
                        <Fragment>
                            <tr>
                                <td className="short" rowSpan="2">{object.userid}</td>
                                <td className="long">{object.question1}</td>
                                <td className="long">{object.question2}</td>
                                <td className="long">{object.question3}</td>
                                <td className="short" rowSpan="2"><button type="button" onClick={(e) => deleteanswer(object.seq)}>X</button></td>
                            </tr>
                            <tr>
                                <td className="long">{object.answer1}</td>
                                <td className="long">{object.answer2}</td>
                                <td className="long">{object.answer3}</td>
                            </tr>
                        </Fragment>
                      )
                      })
                  }
                  </tbody>
              </table>
          </div>
    )
}

export default Mine_guestbook;