import "./search/search.css";

import kakao from "./image/kakao.png";
import naver from "./image/naver.png";
import youtube from "./image/youtube.png";
import tmdb from "./image/tmdb.png";

import greend from "./image/greend.png";

import { Table, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";

function SearchHelp() {

    return (
        <div>
            <div className="search">
                <Table size="small" style={{ width: "300px", textAlign: "center", fontSize: "17px" }} color={"olive"}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">
                                <img src={greend} width="40px" height="40px" style={{ marginLeft: "-20px", marginTop: "-10px" }} />&nbsp;
                                검색도우미</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row >
                            <Table.Cell style={{ width: "60px" }}>
                                <img src={kakao} width="50px" height="15px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/place', 'window_name', 'width=800,height=800,location=no,status=no,scrollbars=yes')}>위치 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell style={{ width: "60px" }}>
                                <img src={naver} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/book', 'window_name', 'width=800,height=1000,location=no,status=no,scrollbars=yes')}>책 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={youtube} width="40px" height="20px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/youtube', 'window_name', 'width=800,height=1000,location=no,status=no,scrollbars=yes')}>영상 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={tmdb} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/movie', 'window_name', 'width=800,height=1000,location=no,status=no,scrollbars=yes')}>영화 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <img src={tmdb} width="53px" height="10px" />
                            </Table.Cell>
                            <Table.Cell>
                                <Link onClick={() => window.open('http://localhost:9001/drama', 'window_name', 'width=800,height=1000,location=no,status=no,scrollbars=yes')}>TV/드라마/OTT 정보</Link>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </div>
    );
}

export default SearchHelp;