import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../main_back.css"
import Topbar from "../main/topbar";

function I_main() {

  const history = useNavigate();
  const jwt = localStorage.getItem("token");
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [profPic, setProfPic] = useState('');
  const [profMsg, setProfMsg] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const getUser = async() => {
    if (jwt === null) {
      history("/");
    }
    else {
      const token = jwt.split('"')[3];
      console.log(token);
      axios.get("http://localhost:3000/show", { params: { "token": token } })
        .then(function (resp) {
          console.log(resp);
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

  console.log(email);

  const [classiList, setClassiList] = useState([]);
  const [wise, setWise] = useState('');

  const fetchData = async (email) => {
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id":"snaro0123@gmail.com" } });

    console.log(resp.data);
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
    console.log(resp);
    setWise(resp.data[1].respond);
  }

  useEffect(() => {
    getUser();
    fetchData();
    wiseData();
  }, []);


  return (
    <div id="backwhite">
      <Topbar/>
      <br />
      <br />

      <table style={{float:"left", marginRight:"200px", border:"1px solid"}}>
       <thead/>
       <tbody>
        <tr>
          <td colSpan="2">
          <img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="X" width="100px" height="100px"/>
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
      </table>
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
  );
}

export default I_main;