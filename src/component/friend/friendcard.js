import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../mine_back.css"
import "./friendcard.css"


function Mine_main() {

    let params = useParams();
    const history = useNavigate();
    let mineid = params.mineid;
    const id = localStorage.getItem("id");

    const acceptfriend = () => {

        axios.get('http://localhost:3000/getItems', { params: { "email": mineid } })
            .then(function (resp) {
                const fname = resp.data.name;
                
                axios.post("http://localhost:3000/acceptfriend", null,
                    { params: { "id": id, "friendid": mineid, "friendname": fname} })
                    .then(res => {
                        if (res.data === "YES") {
                            alert("성공적으로 등록되었습니다");
                            history("/gbmain")
                        } else {
                            alert("등록되지 않았습니다");
                        }
                    })
                    .catch(function (err) {
                        alert(err);
                    })
            })
            .catch(function (err) {
                alert(err);
            })
    }


    return (
        <div id="back">
            <div id="topbar"></div>
            <div id="friendcard">
                <div id="friendcardtext">
                    <div>
                        {mineid}님이 {id}님을 Mine에 초대합니다.
                        <br /><br /><br />
                        수락 버튼을 클릭하면 친구목록에 {mineid}님이 추가되어 Mine에 자유롭게 방문 가능합니다.
                    </div>
                </div>
                <div id="friendcardbutton">
                    <button id="acceptbtn" onClick={acceptfriend}>수락</button>
                    <button id="sorrybtn" onClick={(e) => history("/main")}>거절</button>
                </div>
            </div>
        </div>
    )
}

export default Mine_main;