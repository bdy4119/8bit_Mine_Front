import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import axios from "axios";
import Topbar from "../main/topbar";
import "../main_back.css"
import "./icss.css";

function I_main() {

  const history = useNavigate();
  const [email, setEmail] = useState('');
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

  const fetchData = async (email) => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
    setClassiList(resp.data);
  }

  function TableRow(props) {
    return (
      <tr>
        <td><Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link></td>
      </tr>
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
      <Topbar/>
      <div id="topbar">
          <div id="barbtns">
              <div id="ibtn" onClick={(e) => { history("/i") }}>I</div>
              <div id="mybtn" onClick={(e) => { history("/Filelist") }}>MY</div>
              <div id="mebtn" onClick={(e) => { history("/me") }}>ME</div>
              <div id="minebtn" onClick={(e) => { window.location.href = "/mine" }}>MINE</div>

              <div id="cardbtn" onClick={(e) => { window.location.href = "/card" }}>CARD</div>
              <div id="bookbtn" onClick={(e) => { window.location.href = "/gbmain" }}>GUEST</div>
          </div>
      </div>
      <div id="toolbox">
        <br />
        <br />

        <Table hover variant="red" id="table1">
          <thead />
          <tbody>
            <tr>
              <td colSpan="2">
                <img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="X" width="100px" height="100px" />
              </td>
            </tr>
            <tr>
              <td>
                이름
              </td>
              <td>
                {name}
              </td>
            </tr>
            <tr>
              <td>
                생년월일
              </td>
              <td>
                {birthdate}
              </td>
            </tr>
            <tr>
              <td>
                학교/직장
              </td>
              <td>
                {job}
              </td>
            </tr>
            <tr>
              <td>
                주소
              </td>
              <td>
                {address}
              </td>
            </tr>
            <tr>
              <td>
                상태메세지
              </td>
              <td>
                {profMsg}
              </td>
            </tr>
          </tbody>
        </Table>
        <table border="1">
          <thead />
          <tbody>
            {
              classiList.map(function (object, i) {
                return (
                  <TableRow obj={object} key={i} cnt={i + 1} />
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
        {wise}
        <br />
        <br /><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
  );
}

export default I_main;