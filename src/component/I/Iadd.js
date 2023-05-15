import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";
import SearchHelp from "./searchHelp";

import { Table, Button, Input } from 'semantic-ui-react'
import "./icss.css";

import purpled from "./image/purpled.png";
import redd from "./image/redd.png";


function I_add() {

  // 변수 선언
  const history = useNavigate();

  const [classi, setClassi] = useState('');
  const [classiList, setClassiList] = useState([]);

  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [ans5, setAns5] = useState('');
  const ans = [ans1, ans2, ans3, ans4, ans5];

  const [det1, setDet1] = useState('');
  const [det2, setDet2] = useState('');
  const [det3, setDet3] = useState('');
  const [det4, setDet4] = useState('');
  const [det5, setDet5] = useState('');
  const det = [det1, det2, det3, det4, det5];

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

  useEffect(() => {
    getUser();
    fetchData();
  }, []);
  
  // 분류 추가
  function i_add() {

    const id = localStorage.getItem("id");

    if (classi.trim() === "") {
      alert('분류명을 입력해주세요.');
      return;
    }

    if (ans1.trim() === "" && ans2.trim() === "" && ans3.trim() === "" && ans4.trim() === "" && ans5.trim() === "") {
      alert('반드시 하나 이상의 항목을 입력해주세요.');
      return;
    }

    // 세부내용 추가
    for (let i = 0; i < ans.length; i++) {
      axios.get('http://localhost:3000/i_add', { params: { "id": id, "classify": classi, "item": ans[i], "detail": det[i], "ref": i } })
        .then(function () {
        })
        .catch(function (err) {
          alert(err);
        })
    }

    // 분류 추가
    axios.get('http://localhost:3000/i_add_classi', { params: { "id": id, "classify": classi } })
      .then(function () {
      })
      .catch(function (err) {
        alert(err);
      });

    alert(classi + " 항목이 추가되었습니다.")
    history('/i');
  }

  // 분류 List 불러오기
  function TableRow(props) {
    return (
      <Table.Row>
        <Table.Cell><Link to={`/i_detail/${props.obj.classify}`}>{props.obj.classify}</Link></Table.Cell>
      </Table.Row>
    );
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
                  <TableRow obj={object} key={i} cnt={i + 1} />
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
                <img src={purpled} width="50px" height="50px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;&nbsp;
                <Input size="mini" placeholder="분류 내용 입력" style={{ width: "400px" }} onChange={(e) => { setClassi(e.target.value) }} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell><Input size="mini" placeholder="항목1" onChange={(e) => { setAns1(e.target.value) }} /></Table.Cell>
              <Table.Cell><Input size="mini" style={{ width: "350px" }} placeholder="상세내용" onChange={(e) => { setDet1(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Input size="mini" placeholder="항목2" onChange={(e) => { setAns2(e.target.value) }} /></Table.Cell>
              <Table.Cell><Input size="mini" style={{ width: "350px" }} placeholder="상세내용" onChange={(e) => { setDet2(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Input size="mini" placeholder="항목3" onChange={(e) => { setAns3(e.target.value) }} /></Table.Cell>
              <Table.Cell><Input size="mini" style={{ width: "350px" }} placeholder="상세내용" onChange={(e) => { setDet3(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Input size="mini" placeholder="항목4" onChange={(e) => { setAns4(e.target.value) }} /></Table.Cell>
              <Table.Cell><Input size="mini" style={{ width: "350px" }} placeholder="상세내용" onChange={(e) => { setDet4(e.target.value) }} /></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell><Input size="mini" placeholder="항목5" onChange={(e) => { setAns5(e.target.value) }} /></Table.Cell>
              <Table.Cell><Input size="mini" style={{ width: "350px" }} placeholder="상세내용" onChange={(e) => { setDet5(e.target.value) }} /></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>

      <div className="tacButton">
        <Button size="huge" color="purple" onClick={i_add}>분류 추가</Button>
      </div>

      <SearchHelp />

    </div>
  );
}

export default I_add;