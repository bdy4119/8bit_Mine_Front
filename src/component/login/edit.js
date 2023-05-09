
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

    const [noprof, setNoprof] = useState(false);

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
        const img = process.env.PUBLIC_URL
        let formData = new FormData();
        formData.append("name", userName);
        formData.append("birthdate", birthdate);
        formData.append("job", job);
        formData.append("address", address);
        formData.append("profMsg", profMsg);
        formData.append("token", token);

        // 사진 변경 있을 때
        if (document.frm.uploadFile.files[0]) {
            formData.append("uploadFile", document.frm.uploadFile.files[0]);
            axios.post("http://localhost:3000/edit", formData)
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })

            // 사진 삭제했을 때
        } else if (noprof) {
            axios.get("http://localhost:3000/edit_n", {
                params: {
                    "name": userName, "birthdate": birthdate,
                    "job": job, "address": address, "profMsg": profMsg, "token": token
                }
            })
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })

            // 사진 변경 없을 때
        } else {
            axios.get("http://localhost:3000/edit_nc", {
                params: {
                    "name": userName, "birthdate": birthdate,
                    "job": job, "address": address, "profMsg": profMsg, "token": token
                }
            })
                .then(function (resp) {
                    alert(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })
        }


    }

    function delProf() {
        document.getElementById("prof").setAttribute('src', logo);
        setNoprof(true);
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
            <img id="prof" src={`${process.env.PUBLIC_URL}/profPic/${profPic}`} alt="X" width="200px" height="200px" />
            <form name="frm" encType="multipart/form-data">
                <input type="file" onClick={() => { setNoprof(false) }} name="uploadFile" accept="*" />
            </form>
            <button onClick={delProf}>사진 삭제</button>
            <br /><br />
            <hr />
            <br />
            <button type="button" onClick={editAf}>수정</button>
            <br />
            <button type="button" onClick={goback}>돌아가기</button>
        </div>
    );
}

export default Edit;