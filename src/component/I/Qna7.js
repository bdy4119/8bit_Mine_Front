import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Topbar from "../main/topbar";
import Barbtns from "../main/barbtns";
import SearchHelp from "./searchHelp";

import { Table, Input, Button } from "semantic-ui-react";
import "../main_back.css"
import "./icss.css";

import purpled from "./image/purpled.png";

function Qna10() {

    // 변수 선언
    const history = useNavigate();

    const [name, setName] = useState('');
    const [job, setJob] = useState('');
    const [profPic, setProfPic] = useState('');
    const [profMsg, setProfMsg] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    const [ans3, setAns3] = useState('');
    const [ans4, setAns4] = useState('');
    const [ans5, setAns5] = useState('');
    const [ans6, setAns6] = useState('');
    const [ans7, setAns7] = useState('');

    // 접속 권한 체크
    const getUser = async () => {
        const jwt = localStorage.getItem("token");

        if (jwt === null) {
            history("/");
        }
        else {

            // 프로필 조회
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

    // 작성한 QnA 답변 불러오기
    const detailData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get("http://localhost:3000/i_qna", { params: { "id": id } });

        setAns1(resp.data.q1);
        setAns2(resp.data.q2);
        setAns3(resp.data.q3);
        setAns4(resp.data.q4);
        setAns5(resp.data.q5);
        setAns6(resp.data.q6);
        setAns7(resp.data.q7);
    }

    useEffect(() => {
        getUser();
        detailData();
    }, []);

    // QnA 답변 저장
    function i_add_qna() {
        const id = localStorage.getItem("id");

        // 기존 답변 삭제
        axios.get('http://localhost:3000/i_del_qna', { params: { "id": id } })
            .then(function () {

                // 답변 추가
                axios.get('http://localhost:3000/i_add_qna',
                    {
                        params: {
                            "id": id, "q1": ans1, "q2": ans2, "q3": ans3,
                            "q4": ans4, "q5": ans5, "q6": ans6, "q7": ans7
                        }
                    })
                    .then(function (resp) {
                        if (resp.data === 'i_add_qna_OK') {
                            alert('7문 7답 답변이 저장되었습니다.');
                            history('/i');
                        }
                    })
                    .catch(function (err) {
                        alert(err);
                    });
            })

            .catch(function (err) {
                alert(err);
            })
    }

    // 모든 답변 초기화
    function i_qna_reset() {
        setAns1(''); setAns2(''); setAns3(''); setAns4(''); setAns5(''); setAns6(''); setAns7('');
    }

    return (
        <div id="back">

            <Topbar />
            <Barbtns />

            <div className="card">
                <h1 style={{ marginTop: "20px", fontSize: "40px" }}>{name}</h1>
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

            <div className="qna">
                <Table border="1" style={{ width: "700px", float: "left" }} color={"purple"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2" style={{ textAlign: "center", fontSize: "18px" }}>
                                <img src={purpled} width="50px" height="50px" style={{ marginLeft: "-30px", marginTop: "-10px" }} />&nbsp;&nbsp;
                                5월의 MINE 7문 7답입니다! - 5월의 '나'를 정리해보아요 :)
                            </Table.HeaderCell >
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.HeaderCell>1.&nbsp;&nbsp;가장 행복한 순간은 언제였나요?</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans1}
                                    onChange={(e) => { setAns1(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>2.&nbsp;&nbsp;가장 속상한 일은 무엇이었나요?</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans2}
                                    onChange={(e) => { setAns2(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>3.&nbsp;&nbsp;방문했던 최고의 맛집과 메뉴를 소개해주세요!</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans3}
                                    onChange={(e) => { setAns3(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>4.&nbsp;&nbsp;세웠던 목표가 있었나요?&nbsp;&nbsp;만약 있었다면, 달성했나요?</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans4}
                                    onChange={(e) => { setAns4(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>5.&nbsp;&nbsp;5월의 콘텐츠를 하나 추천해주세요! ex) 노래, 영화, 책 등</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans5}
                                    onChange={(e) => { setAns5(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>6.&nbsp;&nbsp;어린이날/석가탄신일의 내 모습은 어땠나요?</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans6}
                                    onChange={(e) => { setAns6(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell>7.&nbsp;&nbsp;5월을 시작하는/마무리하는 나의 마음가짐은 어떤가요?</Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell colSpan="2">
                                <Input size={"mini"} placeholder="답변을 입력해주세요." defaultValue={ans7}
                                    onChange={(e) => { setAns7(e.target.value); }} style={{ width: "600px", fontSize: "13px" }} />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>

            <SearchHelp />

            <div className="qnabut">
                <Button size={"massive"} onClick={i_add_qna} color={"blue"}>답변 저장</Button><br /><br />
                <Button size={"massive"} onClick={i_qna_reset} color={"red"}>전체 삭제</Button>
            </div>

        </div>
    );
}

export default Qna10;