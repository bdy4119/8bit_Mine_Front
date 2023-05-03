
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList(){
    const history = useNavigate();

    const [list, setList] = useState([]);
    const [cause, setCause] = useState("");

    const jwt = localStorage.getItem("token");

    function Check(){
        if(jwt === null){
            history("/");
        }
        else{
            const token = jwt.split('"')[3];

            axios.get("http://localhost:3000/authcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === 1){
                    history("/mainpage");
                }
                else if(resp.data === 2){
                    history("/ban");
                }
            })
            .catch(function(err){
                console.log(err);
            })
            
            axios.get("http://localhost:3000/jwtcheck", {params:{"token":token}})
            .then(function(resp){
                if(resp.data === "fail"){
                    localStorage.removeItem("token");

                    history("/");
                }
            })
            .catch(function(err){
                alert(err);
            })
        }
    }

    const userList = async() => {
        await axios.get("http://localhost:3000/userlist")
        .then(function(resp){
            setList(resp.data.list);
        })
        .catch(function(err){
            alert(err);
        })
    }

    function state(dto){
        const selectedValue = dto.auth === 0 ? '관리자' : dto.auth === 1 ? '활성' : '비활성';
      
        return (
            <td>
                <select defaultValue={selectedValue}>
                <option>활성</option>
                <option>비활성</option>
                <option>관리자</option>
                </select>
            </td>
        );
    }

    function causeValue(dto){
        //setCause(dto.cause);

        let Cause = dto.cause;

        return(
            <td><input type="text" value={dto.cause} onChange={() => Cause} /></td>
        );
    }

    function writeCause(event, dto){
        dto.cause = event.target.value;
    }

    function updateState(){
        alert("click");
    }

    useEffect(function(){
        Check();
        userList();
    }, [])

    return(
        <>
            <h1>사용자 목록</h1>
            <a href="/admin">돌아가기</a>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="text" placeholder="이메일로 사용자 검색" />
            &nbsp;
            <button type="button">검색</button>

            <table border="">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>이메일</th>
                        <th>최초 가입</th>
                        <th>가입 날짜</th>
                        <th>상태</th>
                        <th>비고</th>
                        <th>수정</th>
                    </tr>
                </thead>
                <tbody>
                {list.map(function(dto, i){
                    return(
                    <tr key={i}>
                        <td>{dto.name}</td>
                        <td>{dto.email}</td>
                        <td>{dto.social}</td>
                        <td>{dto.regidate}</td>
                        {state(dto)}
                        {/* {causeValue(dto)} */}
                        <td><input type="text" value={dto.cause} onChange={(event) => writeCause(event, dto)} /></td>
                        <td><button type="button" onClick={updateState}>저장</button></td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
        </>
    );
}

export default UserList;