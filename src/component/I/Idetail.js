import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";
import SearchHelp from "./searchHelp";

import { Table, Button } from 'semantic-ui-react'
import "../main_back.css"
import "./icss.css";

import purpled from "./image/purpled.png";
import redd from "./image/redd.png";

function I_detail() {

  // 변수 선언
  let params = useParams();
  const history = useNavigate();

  const [classi, setClassi] = useState('');
  const [classiList, setClassiList] = useState([]);
  const [detList, setDetList] = useState([]);

  // 접속 권한 체크
  function getUser() {
    const jwt = localStorage.getItem("token");

    if (jwt === null) {
      history("/");
    }
  }

  // 분류 목록 불러오기
  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
    setClassiList(resp.data);
  }

  // 세부 내용 불러오기
  const detailData = async () => {
    const id = localStorage.getItem("id");
    setClassi(params.classify);
    const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": id, "classify": params.classify } });
    setDetList(resp.data);
  }

  useEffect(() => {
    getUser();
    fetchData();
    detailData();
  }, []);

  // 분류 변경
  function classiChange(classi) {
    setClassi(classi);
    const id = localStorage.getItem("id");
    axios.get("http://localhost:3000/i_detail", { params: { "id": id, "classify": classi } })
      .then(function (resp) {
        setDetList(resp.data);
      })
      .catch(function (err) {
        alert(err);
      })
  }

  // 분류 List
  function TableRow1(props) {
    return (
      <Table.Row>
        <Table.Cell><Link onClick={() => { classiChange(`${props.obj.classify}`) }}>{props.obj.classify}</Link></Table.Cell>
      </Table.Row>
    );
  }

  // 세부내용 List
  function TableRow2(props) {
    if (props.obj.item === "") {
      return;
    }
    return (
      <Table.Row>
        <Table.Cell>{props.obj.item}</Table.Cell>
        <Table.Cell>{props.obj.detail}</Table.Cell>
      </Table.Row>
    );
  }

  // 삭제
  function i_del() {
    const id = localStorage.getItem("id");
    axios.get('http://localhost:3000/i_del', { params: { "id": id, "classify": classi } })
      .then(function (resp) {
        if (resp.data === 'i_del_OK') {
          alert("'" + classi + "'" + " 항목이 삭제되었습니다.");
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
      <Barbtns />

      <div className="tableAdd">
        <Table size="small" style={{ width: "250px", textAlign: "center", fontSize: "15px" }} color={"red"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <img src={redd} width="40px" height="40px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;
                나의 분류
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              classiList.map(function (object, i) {
                return (
                  <TableRow1 obj={object} key={i} cnt={i + 1} />
                  /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                )
              })
            }
          </Table.Body>
        </Table>
      </div>

      <div className="tableAddC">
        <Table style={{ width: "700px", textAlign: "center", fontSize: "20px" }} color={"purple"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                <img src={purpled} width="50px" height="50px" style={{ marginLeft: "-30px", marginTop: "-10px" }} />&nbsp;&nbsp;
                {classi}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              detList.map(function (object, i) {
                return (
                  <TableRow2 obj={object} key={i} cnt={i + 1} />
                  /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                )
              })
            }
          </Table.Body>
        </Table>
      </div>

      <div className="tacButtonD">
        <Button size="huge" color="purple" onClick={() => { history(`/i_update/${classi}`) }}>분류 수정</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button size="huge" color="red" onClick={i_del}>분류 삭제</Button>
      </div>

      <SearchHelp />

    </div>
  );
}

export default I_detail;