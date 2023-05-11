import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Youtube() {

    const [search, setSearch] = useState('');
    const [list, setList] = useState([]);

    useEffect(function () {
        const token = localStorage.getItem("token");
        document.getElementById("backtop").style.visibility = "hidden";
    }, []);

    function TableRow(props) {

        return (
            <tr>
                <td>{props.cnt}</td>
                <td><img src={props.obj.snippet.thumbnails.high.url} width={"100px"} height={"100px"} /></td>
                <td>{props.obj.snippet.title}</td>
                <td>{props.obj.snippet.channelTitle}</td>
                <td>https://www.youtube.com/watch?v={props.obj.id.videoId}</td>
            </tr>
        );
    }

    function yt_search() {
        axios
            .get(
                'http://localhost:3000/ytSearch', { params: { "query": encodeURIComponent(search) } }
            )
            .then(function (resp) {
                console.log(resp);
                setList(resp.data.items);
            })
            .catch(function (err) {
                alert(err);
            })
    }

    return (
        <div>
            <h2>Youtube 영상 검색</h2>
            <input placeholder="영상 제목을 입력하세요" onChange={(e) => { setSearch(e.target.value) }} /><button onClick={yt_search}>검색</button>
            <table border="1">
                <thead>
                    <tr>
                        <td>번호</td>
                        <td>썸네일</td>
                        <td>영상 제목</td>
                        <td>채널명</td>
                        <td>url</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(function (object, i) {
                            return (
                                <TableRow obj={object} key={i} cnt={i + 1} />
                                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Youtube;