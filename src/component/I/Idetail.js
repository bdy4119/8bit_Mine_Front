import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../main_back.css"
import "./icss.css";
import Topbar from "../main/topbar";
import { Table, Button, Input } from 'semantic-ui-react'

import kakao from "./image/kakao.png";
import naver from "./image/naver.png";
import youtube from "./image/youtube.png";
import tmdb from "./image/tmdb.png";
import Barbtns from "../main/barbtns";

import purpled from "./image/purpled.png";
import redd from "./image/redd.png";
import greend from "./image/greend.png";

function I_detail() {

  let params = useParams();
  const history = useNavigate();

  function getUser() {
    const jwt = localStorage.getItem("token");
    if (jwt === null) {
      history("/");
    }
  }

  const [classi, setClassi] = useState('');
  const [classiList, setClassiList] = useState([]);
  const [detList, setDetList] = useState([]);

  // 데이터 불러오기
  const detailData = async () => {
    const id = localStorage.getItem("id");
    setClassi(params.classify);
    const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": id, "classify": params.classify } });
    setDetList(resp.data);
  }

  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": id } });
    setClassiList(resp.data);
  }

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

  useEffect(() => {
    detailData();
    fetchData();
    getUser();
  }, []);

  function TableRow1(props) {
    return (
      <Table.Row>
        <Table.Cell><Link onClick={() => { classiChange(`${props.obj.classify}`) }}>{props.obj.classify}</Link></Table.Cell>
      </Table.Row>
    );
  }

  // 데이터 테이블에 담기
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
        <Button size="huge" color="purple" onClick={() => { history(`/i_update/${params.classify}`) }}>분류 수정</Button>
        <Button size="huge" color="purple" onClick={i_del}>분류 삭제</Button>
      </div>

      <div className="search">
        <Table size="small" style={{ width: "300px", textAlign: "center", fontSize: "17px" }} color={"olive"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2">
                <img src={greend} width="40px" height="40px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;
                검색도우미
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row >
              <Table.Cell style={{ width: "60px" }}>
                <img src={kakao} width="50px" height="15px" />
              </Table.Cell>
              <Table.Cell>
                <Link onClick={() => window.open('http://localhost:9001/place', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>위치 정보</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell style={{ width: "60px" }}>
                <img src={naver} width="53px" height="10px" />
              </Table.Cell>
              <Table.Cell>
                <Link onClick={() => window.open('http://localhost:9001/book', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>책 정보</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <img src={youtube} width="40px" height="20px" />
              </Table.Cell>
              <Table.Cell>
                <Link onClick={() => window.open('http://localhost:9001/youtube', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>Youtube 정보</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <img src={tmdb} width="53px" height="10px" />
              </Table.Cell>
              <Table.Cell>
                <Link onClick={() => window.open('http://localhost:9001/movie', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>영화 정보</Link>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <img src={tmdb} width="53px" height="10px" />
              </Table.Cell>
              <Table.Cell>
                <Link onClick={() => window.open('http://localhost:9001/drama', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>TV/드라마/OTT 정보</Link>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default I_detail;