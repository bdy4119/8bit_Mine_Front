import React, {useState, useEffect} from "react";
import axios from "axios";

import "../mine_back.css"
import "./mine.css";

function Mine_guestbook({ setAlramOpen}){

    const id = localStorage.getItem("id");

    const closeModal = () => {
      setAlramOpen(false);
  };

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
              <div>
                <button onClick={closeModal}>X</button>
              </div>
              <table border="1">
                  <thead>
                      <td>No.</td>
                      <td>방문자</td>
                      <td>answer1</td>
                      <td>answer2</td>
                      <td>answer3</td>
                  </thead>
                  <tbody>
                  {
                      ansList.map(function (object, i) {
                      return (
                          <tr>
                              <td>{i+1}</td>
                              <td>{object.userid}</td>
                              <td>{object.answer1}</td>
                              <td>{object.answer2}</td>
                              <td>{object.answer3}</td>
                              <td><button type="button" onClick={() => deleteanswer(object.seq)}>삭제</button></td>
                          </tr>
                      )
                      })
                  }
                  </tbody>
              </table>
          </div>
    )
}

export default Mine_guestbook;