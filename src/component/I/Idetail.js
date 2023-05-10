import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../main_back.css"
import Topbar from "../main/topbar";

function I_detail() {

  let params = useParams();
  const history = useNavigate();

  function getUser() {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      history("/");
    }
  }

  const [detList, setDetList] = useState([]);

  // 데이터 불러오기
  const detailData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": id, "classify": params.classify } });
    setDetList(resp.data);
  }

  useEffect(() => {
    detailData();
    getUser();
  }, []);

  // 데이터 테이블에 담기
  function TableRow(props) {
    if (props.obj.item === "") {
      return;
    }
    return (
      <tr>
        <td>{props.obj.item}</td>
        <td>{props.obj.detail}</td>
      </tr>
    );
  }

  // 삭제
  function i_del() {
    const id = localStorage.getItem("id");
    axios.get('http://localhost:3000/i_del', { params: { "id": id, "classify": params.classify } })
      .then(function (resp) {
        if (resp.data === 'i_del_OK') {
          alert("'" + params.classify + "'" + " 항목이 삭제되었습니다.");
          history('/i');
        }
      })
      .catch(function (err) {
        alert(err);
      })
  }

  return (
    <div id="back">
      <Topbar />
      <div id="topbar">
        <div id="barbtns">
          <div id="ibtn" onClick={(e) => { history("/i") }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              I
            </p>
          </div>
          <div id="mybtn" onClick={(e) => { history("/Filelist") }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              MY
            </p>
          </div>
          <div id="mebtn" onClick={(e) => { history("/me") }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              ME
            </p>
          </div>
          <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              MINE
            </p>
          </div>

          <div id="cardbtn" onClick={(e) => { history("/card") }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              CARD
            </p>
          </div>
          <div id="bookbtn" onClick={(e) => { history("/gbmain") }}>
            <p style={{ position: "relative", marginTop: "60px", fontSize: "20px" }}>
              GUEST
            </p>
          </div>
        </div>
      </div>
      <div id="toolbox">
        <table border="1">
          <colgroup>
            <col width="200px" /><col width="200px" />
          </colgroup>
          <thead>
            <tr>
              <td colSpan="2">{params.classify}</td>
            </tr>
          </thead>
          <tbody>
            {
              detList.map(function (object, i) {
                return (
                  <TableRow obj={object} key={i} cnt={i + 1} />
                  /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                )
              })
            }
          </tbody>
        </table>
        <Link to={`/i_update/${params.classify}`}>
          <button>수정</button>
        </Link>
        <button onClick={i_del}>삭제</button>
      </div>
    </div>
  );
}

export default I_detail;