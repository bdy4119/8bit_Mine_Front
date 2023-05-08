
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../mine/images/logo.png';

function Edit() {
    const history = useNavigate();

    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userDate, setUserDate] = useState("");
    const [userSocial, setUserSocial] = useState("");
    const [job, setJob] = useState('');
    const [profPic, setProfPic] = useState('');
    const [profMsg, setProfMsg] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const jwt = localStorage.getItem("token");

    function Check() {
        if (jwt === null) {
            history("/");
        }
        else {
            const token = jwt.split('"')[3];

            axios.get("http://localhost:3000/authcheck", { params: { "token": token } })
                .then(function (resp) {
                    if (resp.data === 0) {
                        history("/admin");
                    }
                    else if (resp.data === 2) {
                        history("/ban");
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })

            axios.get("http://localhost:3000/jwtcheck", { params: { "token": token } })
                .then(function (resp) {
                    if (resp.data === "fail") {
                        localStorage.removeItem("token");

                        history("/");
                    }
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    function getUser() {
        if (jwt === null) {
            history("/");
        }
        else {
            const token = jwt.split('"')[3];

            axios.get("http://localhost:3000/show", { params: { "token": token } })
                .then(function (resp) {
                    setUserEmail(resp.data.email);
                    setUserName(resp.data.name);
                    setUserDate(resp.data.regidate);
                    setUserSocial(resp.data.social);
                    setJob(resp.data.job);
                    setProfMsg(resp.data.profMsg);
                    setAddress(resp.data.address);
                    setBirthdate(resp.data.birthdate);
                    setProfPic(resp.data.profPic);
                })
                .catch(function (err) {
                    alert(err);
                })
        }
    }

    function editAf() {
        const token = jwt.split('"')[3];
        let formData = new FormData();
        formData.append("name", userName);
        formData.append("birthdate", birthdate);
        formData.append("job", job);
        formData.append("address", address);
        formData.append("profMsg", profMsg);
        formData.append("token", token);
        formData.append("uploadFile", document.frm.uploadFile.files[0]);

        axios.post("http://localhost:3000/edit", formData)
            .then(function (resp) {
                alert(resp.data);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function goback() {
        history("/main");
    }

    useEffect(function () {
        Check();
        getUser();
    }, [])

    return (
        <div>
            <h1>내 정보 수정</h1>
            이메일: &nbsp;
            <input type="text" value={userEmail} readOnly="readOnly" />
            <br />

            가입 날짜: &nbsp;
            <input type="text" value={userDate} readOnly="readOnly" />
            <br />
            최초 가입: &nbsp;
            <input type="text" value={userSocial} readOnly="readOnly" />
            <br /><br />
            <hr />
            <br />
            이름: &nbsp;
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <br />
            생년월일: &nbsp;
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            <br />
            학교/직장: &nbsp;
            <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
            <br />
            주소: &nbsp;
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <br />
            상태메세지: &nbsp;
            <input type="text" value={profMsg} onChange={(e) => setProfMsg(e.target.value)} />
            <br />
            프로필사진: &nbsp;
            <img src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="X" width="200px" height="200px"/>
            <form name="frm" encType="multipart/form-data">
                <input type="file" name="uploadFile" accept="*" />
            </form>
            <br />

            <button type="button" onClick={editAf}>수정</button>
            <br />
            <button type="button" onClick={goback}>돌아가기</button>
        </div>
    );
}

export default Edit;