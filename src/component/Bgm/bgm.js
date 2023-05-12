import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./bgmcss.css";
import redd from "../I/image/redd.png";

import { Table, Button } from 'semantic-ui-react'

function Bgm() {

    const movePage = useNavigate();

    function getUser() {
        const jwt = localStorage.getItem("token");
        if (jwt === null) {
            movePage("/");
        }
    }

    const [bgmlist, setBgmlist] = useState([]);
    const [dcount, setDcount] = useState(0);

    function go_bgmadd() {
        if(dcount > 7) {
            alert('BGM은 최대 7개까지 설정할 수 있습니다.');
            return;
        }
        
        movePage('/bgmadd')
    }

    const fetchData = async () => {
        const id = localStorage.getItem("id");
        const resp = await axios.get('http://localhost:3000/bgm_list', { params: { "id": id } });
        setBgmlist(resp.data);
        setDcount(resp.data.length);
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
            <Table.Row>
                <Table.Cell>{props.cnt}</Table.Cell>
                <Table.Cell>{props.obj.artist}</Table.Cell>
                <Table.Cell>{props.obj.title}</Table.Cell>
                <Table.Cell><Button color="red" size="tiny" onClick={() => bgm_del(`${props.obj.seq}`)}>삭제</Button></Table.Cell>
            </Table.Row>
        );
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
        fetchData();
        getUser();
    }, []);


    return (
        <div id="back">
            <img src={redd} width="70px" height="70px" style={{ position: "absolute", marginLeft: "20px", marginTop: "35px" }} />
            <div className="bgmtitle">
                <h2 style={{ fontSize: "45px" }}>BGM 관리</h2>
            </div>

            <div className="bgmlist">
                <Table border="1" style={{textAlign:"center"}} color="purple">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell style={{width:"50px"}}>번호</Table.HeaderCell>
                            <Table.HeaderCell style={{width:"200px"}}>아티스트</Table.HeaderCell>
                            <Table.HeaderCell style={{width:"400px"}}>제목</Table.HeaderCell>
                            <Table.HeaderCell style={{width:"100px"}}>관리</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            bgmlist.map(function (object, i) {
                                return (
                                    <TableRow obj={object} key={i} cnt={i + 1} />
                                    /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                                )
                            })
                        }
                    </Table.Body>
                </Table>
                <Button color="purple" size="large" onClick={go_bgmadd}>bgm 추가</Button>
            </div>
        </div>
    );

}
export default Bgm;