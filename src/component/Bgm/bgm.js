import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Bgm() {

    const movePage = useNavigate();

    function getUser() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            movePage("/");
        }
    }

    const [bgmlist, setBgmlist] = useState([]);

    function go_bgmadd() {
        movePage('/bgmadd')
    }

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/bgm_list', { params: { "id": id } });
        setBgmlist(resp.data);
    }

    function bgm_del(seq) {
        axios.get('http://localhost:3000/bgm_del', { params: { "seq": seq } })
            .then(function (resp) {
                console.log(resp);
                if (resp.data === 'bgm_del_OK') {
                    alert('해당 배경음악을 삭제했습니다.');
                    window.location.reload();
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    function TableRow(props) {
        return (
            <tr>
                <td>{props.cnt}</td>
                <td>{props.obj.artist}</td>
                <td>{props.obj.title}</td>
                <td>{props.obj.url}</td>
                <td><button onClick={() => bgm_del(`${props.obj.seq}`)}>삭제</button></td>
            </tr>
        );
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
        fetchData();
        getUser();
    }, []);


    return (
        <div id="backwhite">
            <h2>bgm 관리</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아티스트</th>
                        <th>제목</th>
                        <th>URL</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bgmlist.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                            )
                        })
                    }
                </tbody>
            </table>
            <button onClick={go_bgmadd}>bgm 추가</button>
        </div>
    );

}
export default Bgm;