import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from "axios";
import Topbar from "../main/topbar";
import "../main_back.css"
import "./icss.css";
import mine from "./mine_icon.png";

function I_main() {

  const history = useNavigate();
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [profPic, setProfPic] = useState('');
  const [profMsg, setProfMsg] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const getUser = async () => {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      history("/");
    }
    else {
      axios.get("http://localhost:3000/show", { params: { "token": jwt } })
        .then(function (resp) {
          setName(resp.data.name);
          setBirthdate(resp.data.birthdate);
          setJob(resp.data.job);
          setAddress(resp.data.address);
          setProfMsg(resp.data.profMsg);
          setProfPic(resp.data.profPic);
        })
        .catch(function (err) {
          alert(err);
        })
    }
  }

  const [classiList, setClassiList] = useState([]);
  const [wise, setWise] = useState('');

  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
    setClassiList(resp.data);
  }

  function Ilist(props) {
    if (props.cnt % 5 == 0) {
      return (
        <>
          <tr>
          <td style={{textAlign:"center"}}><div className="items">
                <Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link>
                </div></td>
          </tr>
        </>
      );
    }
    return (
      <>
        <td style={{textAlign:"center"}}><div className="items">
                <Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link>
                </div></td>
      </>
    );
  }

  const wiseData = async () => {
    const resp = await axios.get('https://api.qwer.pw/request/helpful_text?apikey=guest');
    setWise(resp.data[1].respond);
  }

  useEffect(() => {
    getUser();
    fetchData();
    wiseData();
  }, []);


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
        <br />
        <br />
        <div className="card" style={{ float: "left" }}>
          <h1>{name}</h1>
          <div className="img-wrap" >
            <img className="imgI" src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} />
          </div>
          <label className="labelI">
            생년월일<br />
            <input className="inputI" readOnly="readOnly" value={birthdate} />
          </label><br />
          <label className="labelI">
            학교/직장<br />
            <input className="inputI" readOnly="readOnly" value={job} />
          </label><br />
          <label className="labelI">
            주소<br />
            <input className="inputI" readOnly="readOnly" value={address} />
          </label><br />
          <label className="labelI">
            상태메세지<br />
            <input className="inputI" readOnly="readOnly" value={profMsg} />
          </label>
        </div>
        <table>
          <thead />
          <colgroup>
            <col width="200px" /><col width="200px" /><col width="200px" /><col width="200px" /><col width="200px" />
          </colgroup>
          <tbody>
            {
              classiList.map(function (object, i) {
                return (
                  <Ilist obj={object} key={i} cnt={i + 1} />
                  /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                )
              })
            }
          </tbody>
        </table>
        <Link to="/i_add">분류 추가</Link>
        <br />
        <Link to="/qna10">10문10답</Link>
        <br /><br />

        {/* <div>
        {wise}
        </div> */}
        <br />
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}

export default I_main;