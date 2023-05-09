import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../main_back.css"
import Topbar from "../main/topbar";

function Qna10() {

    let params = useParams();
    const movePage = useNavigate();
    const jwt = localStorage.getItem("token");
    const [email, setEmail] = useState('');

    function getUser() {
        if (jwt === null) {
            movePage("/");
        }
        else {
            const token = jwt.split('"')[3];

            axios.get("http://localhost:3000/show", { params: { "token": token } })
                .then(function (resp) {
                    setEmail(resp.data.email);
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    const [ans3, setAns3] = useState('');
    const [ans4, setAns4] = useState('');
    const [ans5, setAns5] = useState('');
    const [ans6, setAns6] = useState('');
    const [ans7, setAns7] = useState('');
    const [ans8, setAns8] = useState('');
    const [ans9, setAns9] = useState('');
    const [ans10, setAns10] = useState('');

    const detailData = async () => {
        const resp = await axios.get("http://localhost:3000/i_qna", { params: { "id": "snaro0123@gmail.com" } });
        setAns1(resp.data.q1);
        setAns2(resp.data.q2);
        setAns3(resp.data.q3);
        setAns4(resp.data.q4);
        setAns5(resp.data.q5);
        setAns6(resp.data.q6);
        setAns7(resp.data.q7);
        setAns8(resp.data.q8);
        setAns9(resp.data.q9);
        setAns10(resp.data.q10);
    }

    useEffect(() => {
        detailData();
    }, []);

    function i_add_qna() {
        axios.get('http://localhost:3000/i_del_qna', { params: { "id": "snaro0123@gmail.com" } })
            .then(function () {
                axios.get('http://localhost:3000/i_add_qna',
                    {
                        params: {
                            "id": "snaro0123@gmail.com", "q1": ans1, "q2": ans2, "q3": ans3, "q4": ans4,
                            "q5": ans5, "q6": ans6, "q7": ans7, "q8": ans8, "q9": ans9, "q10": ans10
                        }
                    })
                    .then(function (resp) {
                        if (resp.data === 'i_add_qna_OK') {
                            alert('10문 10답 답변이 저장되었습니다.');
                            movePage('/i');
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

    function i_qna_reset() {
        setAns1(''); setAns2(''); setAns3(''); setAns4(''); setAns5('');
        setAns6(''); setAns7(''); setAns8(''); setAns9(''); setAns10('');
    }

    return (
        <div>
            <Topbar />
            <div id="backwhite">
                <table border="1" style={{ float: "left", backgroundColor: "white" }}>
                    <colgroup>
                        <col width="50px" /><col width="500px" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th colSpan="2">5월의 MINE 10문 10답입니다! - 10문 10답은 매달 새롭게 찾아옵니다 :)</th>
                        </tr>
                        <tr>
                            <th>번호</th>
                            <th>질문</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>내가 가장 행복했던/행복한 순간은 언제인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans1} onChange={(e) => { setAns1(e.target.value); }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>요즘 가장 고민하고 있는 것은 무엇인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans2} onChange={(e) => { setAns2(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>내가 가진 장점/강점은 무엇인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans3} onChange={(e) => { setAns3(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>5년 안에 이루고 싶은 목표 3가지는 무엇인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans4} onChange={(e) => { setAns4(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>스트레스가 많이 쌓였을 때, 어떤 방식으로 해결하나요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans5} onChange={(e) => { setAns5(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>내가 고치고 싶은 나의 모습은 무엇인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans6} onChange={(e) => { setAns6(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>내가 가장 편안함을 느끼는 순간은 언제인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans7} onChange={(e) => { setAns7(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>10년 뒤에 나에게 쪽지를 보낼 수 있다면, 어떤 내용을 쓰실건가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans8} onChange={(e) => { setAns8(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>한가지 초능력을 가질 수 있다면, 어떤 능력을 가지고 싶으신가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans9} onChange={(e) => { setAns9(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>가장 후회하는 / 지우고 싶은 순간은 언제인가요?</td>
                        </tr>
                        <tr>
                            <td colSpan="2"><input defaultValue={ans10} onChange={(e) => { setAns10(e.target.value) }} style={{ width: "400px" }} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2"><button onClick={i_add_qna}>답변 저장</button><button onClick={i_qna_reset}>답변 전체 삭제</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Qna10;