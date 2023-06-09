
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Pagination from "react-js-pagination"
import "./page.css"
import "./FileMain.css"

import { Button, Table, Form, Input } from 'semantic-ui-react'
import Barbtns from '../main/barbtns';
import Topbar from '../main/topbar';

const FileList = () => {
    // 체크박스를 위한 state 변수
    const [isChecked, setIsChecked] = useState(false);
    // 세션에 담긴 아이디값 가져오기
    // const id = session.get("USER_ID");
    // console.log(id);

    //이메일 id
    const id = localStorage.getItem("id");
    console.log(id);

    // 페이지이동을 하기위해 필요한 hook
    let navigate = useNavigate();
    // 검색 카테고리(choice), 검색어(search)를 담을 state 변수
    const [choice, setChoice] = useState('');
    const [search, setSearch] = useState('');

    //page
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);

    // map으로 받은 fileList 담을 state변수
    const [fileList, setFileList] = useState([]);

    // 삭제
    const [FileId, setFileId] = useState('');
    // component가 rendering 됐을때 검색어 상관없이 리스트 출력
    useEffect(() => {
        // getFileList();
        getAllfile();
        getFileList('', '', 0);
    }, [])






    const getAllfile = async () => {
        axios.get('http://localhost:3000/getAllfile')
            .then(function (resp) {
                console.log(resp);
                setTotalCnt(resp.data);
            })
            .catch(function (err) {
                alert(err);
            })
    }
    const getFileList = async (ch, se, pa) => {
        axios.post("http://localhost:3000/fileList", null, { params: { "choice": ch, "search": se, "pageNumber": pa } })
            .then(function (res) {
                console.log(res);
                setFileList(res.data);
            })
            .catch(function (err) {
                alert(err);
            })
    }
    const deleteFile = async (seq) => {
        axios.get("http://localhost:3000/deleteFile", { params: { "mfSeq": seq } })
            .then(function (res) {
                console.log(res);
                window.location.reload();
                alert('파일을 삭제했습니다.');
            })
            .catch(function (err) {
                alert(err);
            })
    }






    // 검색처리함수
    const searchBtn = () => {
        if (choice.trim() !== "" && search.trim() !== "") {
            // 새로운 axios 통신을 하는게 아니라 기존의 함수에 parameter 대입
            navigate("/Filelist/" + choice + "/" + search);
            getFileList(choice, search, 0);
        } else {
            navigate('/Filelist');
        }
    }
    function pageChange(page) {
        setPage(page);
        getFileList(choice, search, page - 1);
    }
    function allChkOnOff() {
        const chkBoxes = document.querySelectorAll(".chkBox");
        chkBoxes.forEach((chkBox) => {
            chkBox.checked = !isChecked;
        })
        setIsChecked(!isChecked);
    }
    // 체크박스 클릭 시, 파일을 담을 배열과 함수
    let fileArr = [];
    const getFile = (fileName) => {
        fileArr.push(fileName);
        console.log(fileArr);
    }
    const removeFile = (fileName) => {
        const idx = fileArr.indexOf(fileName);
        if (idx !== -1) {
            fileArr.splice(idx, 1);
        }
        console.log(fileArr);
    }
    // 다운로드 실행 함수
    const downloadBtn = () => {
        // 1. 다운로드 버튼을 클릭했을 때, 배열이 비었는지 확인한다.
        if (fileArr !== null && fileArr.length !== 0) {
            // 2. 다운로드 실행 함수!
            axios.post("http://localhost:3000/fileDownload")
        } else {
            alert("다운로드할 항목을 체크해주세요.");
        }
    }
    // 개별 다운로드 함수
    const download = (fileName) => {
        const changeName = fileName.split("/").pop();
        const url = "http://localhost:3000/downFile?filename=" + changeName;
        window.location.href = url;
    }






    return (
        <div id="back">

            <Topbar />
            <Barbtns />

            <div className='select' align="center">
                <select value={choice} onChange={(e) => setChoice(e.target.value)}>
                    <option value="">검색</option>
                    <option value="title">제목</option>
                    <option value="memo">메모</option>
                    <option value="writer">작성자</option>
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어를 입력해주세요" />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button size="mini" color="pink" onClick={searchBtn}>검색</Button>
                <br /><br />
            </div>


            {fileList !== null
                ?
                <div className="tab" align="center">
                    <Table color="pink" textAlign='center'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>번호</Table.HeaderCell>
                                <Table.HeaderCell>카테고리</Table.HeaderCell>
                                <Table.HeaderCell>파일명</Table.HeaderCell>
                                <Table.HeaderCell>등록일</Table.HeaderCell>
                                <Table.HeaderCell>메모</Table.HeaderCell>
                                <Table.HeaderCell>관리</Table.HeaderCell>
                                <Table.HeaderCell>다운로드</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {fileList.map(function (file, i) {
                                return (
                                    <Table.Row key={i}>

                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell>{file.mfCategory}</Table.Cell>
                                        <Table.Cell>{file.mfTitle}</Table.Cell>
                                        <Table.Cell>{file.mfRegdate}</Table.Cell>
                                        <Table.Cell>{file.mfMemo}</Table.Cell>
                                        <Table.Cell>
                                        {/* <button className='updatebtns'size="large" color="pink" onClick={() => { navigate('/updateFile/$file.mfSeq')}> 수정</button> */}
                                             <Link to={`/updateFile/${file.mfSeq}`}><Button size="large" color="blue" className='updatebtns'>수정</Button></Link>
                                            <Button className='delbtns'size="large" color="green" onClick={() => deleteFile(`${file.mfSeq}`)}>삭제</Button>


                                        </Table.Cell>
                                        <td><Button className='downbtns' size="large" color="yellow" onClick={() => { download(file.mfNFilename) }}>다운로드</Button></td>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>

                    </Table>
                    <br />
                    <Button className='upbtns' size="large" color="pink" onClick={() => { navigate('/FileUpload') }} style={{ marginLeft: "1400px", color: 'white' }}>업로드</Button>
                    {/* <button className='upbtns'  style={{marginLeft:"1050px",color:'white'}}><Link to='/FileUpload'>업로드</Link> */}
                    <br /><br />
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={5}
                        totalItemsCount={totalCnt}
                        pageRangeDisplayed={5}
                        prevPageText={"이전"}
                        nextPageText={"다음"}
                        onChange={pageChange} />
                    <br />

                </div>
                :
                <p>표시할 데이터가 없습니다.</p>
            }
        </div>
    )
}
export default FileList
