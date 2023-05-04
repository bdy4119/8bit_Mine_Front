import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../main_back.css"

function I_update() {

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

    const [classi, setClassi] = useState('');

    const [ans1, setAns1] = useState('');
    const [ans2, setAns2] = useState('');
    const [ans3, setAns3] = useState('');
    const [ans4, setAns4] = useState('');
    const [ans5, setAns5] = useState('');

    const [det1, setDet1] = useState('');
    const [det2, setDet2] = useState('');
    const [det3, setDet3] = useState('');
    const [det4, setDet4] = useState('');
    const [det5, setDet5] = useState('');

    const ans = [ans1, ans2, ans3, ans4, ans5];
    const det = [det1, det2, det3, det4, det5];

    // 데이터 불러오기
    const detailData = async () => {
        const resp = await axios.get("http://localhost:3000/i_detail", { params: { "id": email, "classify": params.classify } })

        setClassi(resp.data[0].classify);

        setAns1(resp.data[0].item);
        setAns2(resp.data[1].item);
        setAns3(resp.data[2].item);
        setAns4(resp.data[3].item);
        setAns5(resp.data[4].item);

        setDet1(resp.data[0].detail);
        setDet2(resp.data[1].detail);
        setDet3(resp.data[2].detail);
        setDet4(resp.data[3].detail);
        setDet5(resp.data[4].detail);
    }

    useEffect(() => {
        detailData();
        getUser();
    }, []);

    function i_upd() {
        axios.get('http://localhost:3000/i_del', { params: { "id": email, "classify": params.classify } })
            .then(function (resp) {

                for (let i = 0; i < ans.length; i++) {
                    axios.get('http://localhost:3000/i_add', { params: { "id": email, "classify": classi, "item": ans[i], "detail": det[i], "ref": i } })
                        .then(function () {
                        })
                        .catch(function (err) {
                            alert(err);
                        })
                }

                axios.get('http://localhost:3000/i_add_classi', { params: { "id": email, "classify": classi } })
                    .then(function () {
                        alert(classi + " 항목이 수정되었습니다.");
                    })
                    .catch(function (err) {
                        alert(err);
                    });
            })
            .catch(function (err) {
                alert(err);
            });
    }

    return (
        <div id="backwhite">
            {params.classify}
            <table border="1">
                <colgroup>
                    <col width="200px" /><col width="200px" />
                </colgroup>
                <thead>
                    <tr>
                        <td colSpan="2"><input placeholder="분류 내용 입력" style={{ width: "400px" }} defaultValue={classi} onChange={(e) => { setClassi(e.target.value) }} /></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input placeholder="항목1" defaultValue={ans1} onChange={(e) => { setAns1(e.target.value) }} /></td>
                        <td><input placeholder="상세내용" defaultValue={det1} onChange={(e) => { setDet1(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td><input placeholder="항목2" defaultValue={ans2} onChange={(e) => { setAns2(e.target.value) }} /></td>
                        <td><input placeholder="상세내용" defaultValue={det2} onChange={(e) => { setDet2(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td><input placeholder="항목3" defaultValue={ans3} onChange={(e) => { setAns3(e.target.value) }} /></td>
                        <td><input placeholder="상세내용" defaultValue={det3} onChange={(e) => { setDet3(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td><input placeholder="항목4" defaultValue={ans4} onChange={(e) => { setAns4(e.target.value) }} /></td>
                        <td><input placeholder="상세내용" defaultValue={det4} onChange={(e) => { setDet4(e.target.value) }} /></td>
                    </tr>
                    <tr>
                        <td><input placeholder="항목5" defaultValue={ans5} onChange={(e) => { setAns5(e.target.value) }} /></td>
                        <td><input placeholder="상세내용" defaultValue={det5} onChange={(e) => { setDet5(e.target.value) }} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={i_upd}>수정하기</button>
            <button>돌아가기</button>
        </div>
    );
}

export default I_update;