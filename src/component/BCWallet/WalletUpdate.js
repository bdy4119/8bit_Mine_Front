import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function WalletUpdate() {

    let params = useParams();
    const [seq, setSeq] = useState('');
    const [friend, setFriend] = useState('');
    const [memo, setMemo] = useState('');
    const [regdate, setRegdate] = useState('');

    console.log(params.seq);

    const fetchData = async () => {
        const resp = await axios.get('http://localhost:3000/social_sel', { params: { "seq": params.seq } });
        console.log(resp);

        setSeq(params.seq);
        setFriend(resp.data.friend);
        setMemo(resp.data.memo);
        setRegdate(resp.data.regdate);
    }

    function wUpd() {
        axios.get('http://localhost:3000/social_upd', {params:{"memo":memo, "seq":seq}})
        .then(function(resp){
            if(resp.data==='social_upd_OK'){
                alert('정보가 수정되었습니다.');
                window.close();
            }
        })
        .catch(function(err){
            alert(err);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id="backwhite">
            <table border="1">
                <thead />
                <tbody>
                    <tr>
                        <th>이름</th>
                        <td>{friend}</td>
                    </tr>
                    <tr>
                        <th>메모</th>
                        <td><input defaultValue={memo} onChange={(e) => setMemo(e.target.value)} /></td>
                    </tr>
                    <tr>
                        <th>등록(수정)일</th>
                        <td>{regdate.substring(0, 10)}</td>
                        <td>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button onClick={wUpd}>수정완료</button>
        </div>
    );
}

export default WalletUpdate;