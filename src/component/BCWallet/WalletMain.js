import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function WalletMain({ setModalOpen }) {

    const [owner, setOwner] = useState('');
    const [bclist, setBclist] = useState([]);

    const closeModal = () => {
        setModalOpen(false);
    };

    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3000/social_list', { params: { "owner": "snaro0123@gmail.com" } });
        console.log(resp);
        setBclist(resp.data);
    }

    function bcw_del(seq) {
        axios.get('http://localhost:3000/social_del', { params: { "seq": seq } })
            .then(function (resp) {
                if (resp.data === "social_del_OK") {
                    alert('명함을 삭제했습니다.');
                    fetchData();
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
                <td>{props.obj.friend}</td>
                <td>{props.obj.memo}</td>
                <td>{props.obj.regdate.substring(0, 10)}</td>
                <td>
                    <button onClick={() => {
                        window.open(`http://localhost:9001/walletupdate/${props.obj.seq}`,
                            'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes'); setModalOpen(false);
                    }}>수정</button>

                    <button onClick={() => bcw_del(`${props.obj.seq}`)}>삭제</button>

                </td>
            </tr>
        );
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div id="backwhite" className="wrapper">
            <button onClick={closeModal}>X</button>
            <br /><br />
            <table border="1">
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>메모</th>
                        <th>저장일시</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bclist.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default WalletMain;