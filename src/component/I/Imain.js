import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../main_back.css"

function I_main() {

  const [classiList, setClassiList] = useState([]);
  const [wise, setWise] = useState('');

  const fetchData = async () => {
    const resp = await axios.get('http://localhost:3000/i_classi_list', { params: { "id": "test" } });

    console.log(resp.data);
    setClassiList(resp.data);
  }

  function TableRow(props) {
    return (
      <tr>
        <td><Link to={`/i_detail/${props.obj.id}/${props.obj.classify}`}>{props.obj.classify}</Link></td>
      </tr>
    );
  }

  const wiseData = async () => {
    const resp = await axios.get('https://api.qwer.pw/request/helpful_text?apikey=guest');
    console.log(resp);
    setWise(resp.data[1].respond);
  }

  useEffect(() => {
    fetchData();
    wiseData();
  }, []);


  return (
    <div id="backwhite">

      <br />
      <br />

      <table border="1">
        <thead />
        <tbody>
          {
            classiList.map(function (object, i) {
              return (
                <TableRow obj={object} key={i} cnt={i + 1} />
                /* key를 지정 안하면, Each child in a list should have a unique "key" prop. 가 나옴 */
              )
            })
          }
        </tbody>
      </table>
      <Link to="/i_add">분류 추가</Link>
      <br />
      <Link to="/qna10/test">10문10답</Link>
      <br /><br />
      {wise}
      <br />
    </div>
  );
}

export default I_main;