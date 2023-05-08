import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import "./mine_edi.css";
import logo from './images/logo.png';
import stage1 from './images/stage1.png';
import stage2 from './images/stage2.png';
import stage3 from './images/stage3.png';
import "../mine_back.css"

function Mine_edi(){

    const [loading, setLoading] = useState(false);
    const [check, setCheck] = useState(true);
    const [question1, setquestion1] = useState('');
    const [question2, setquestion2] = useState('');
    const [question3, setquestion3] = useState('');
    const [text, setText] = useState('');
    const [imgFile, setImgFile] = useState('');
    const [b, setB] = useState('');
    const [a, setA] = useState('');
    const [backimg, setBackimg] = useState(stage1);
    const [stagenum, setStagenum] = useState('');
    const imgRef = useRef('');
    
    const id = localStorage.getItem("id");


    function imageLoad(){
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        setImgFile(reader.result);
        }
    }

    let params = useParams();

    const mineData = async(pos) => {
        const response = await axios.post('http://localhost:3000/minedata', null, { params:{"id":id, "position":pos} });

        if (params.pos === '11'){
            setquestion1(response.data.filename);
            setquestion2(response.data.newfilename);
            setquestion3(response.data.imgtext);
        }
        setText(response.data.imgtext);
        setImgFile(process.env.PUBLIC_URL + "/img/" + response.data.newfilename);

        setLoading(true);   // 여기서 rendering 해 준다
    }
    
    const mineList = async() => {
        const response = await axios.post('http://localhost:3000/minelist', null, { params:{"id":id} });
        const c = {};
        
        for (let i = 0; i < response.data.length; i++) {
            const d = response.data[i];
            c[d.position] = d; 
        }
        setB(c);
        console.log(b);
    }

    const checkList = () => {

        const yn = {};

        for(let i = 1; i <= 11; i++){
            axios.post("http://localhost:3000/checkmine", null, { params:{ "id":id, "position":i} })
            .then(res => {
                if(res.data === "YES"){
                    yn[i] = true;
                }else{
                    yn[i] = false;
                }
             })
             .catch(function(err){
                alert(err);
             }) 
        }
        setA(yn);
        console.log(a);
    }

    useLayoutEffect(()=>{
        mineList();
        checkList();
    }, []);

    useEffect(()=>{

        const checkmine = async(pos) => {

            await axios.post("http://localhost:3000/checkmine", null, { params:{ "id":id, "position":pos} })
                 .then(res => {
                    if(res.data === "YES"){
                        mineData(params.pos);
                        setCheck(true);
    
                    }else{
                        setText('');
                        setImgFile('');
                        setCheck(false);
                        setLoading(true);
                    }
                 })
                 .catch(function(err){
                    alert(err);
                 })   
        }

        checkmine(params.pos);

    }, [params.pos]);

    if(loading === false){
        return <div>Loading...</div>
    }

    const deletemine = () => {
        axios.post("http://localhost:3000/deletemine", null, 
                    { params:{ "id":id, "position":params.pos } })
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 삭제되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             })   
    }

    const onInsert = (e) => {
        e.preventDefault();
    
        // file + form field -> 짐을 싼다
        let formData = new FormData();
        formData.append("id", id);
        formData.append("position", params.pos);
        formData.append("imgtext", text);
    
        formData.append("uploadFile", document.frm.uploadFile.files[0]);
    
        // 보내자!
        axios.post("http://localhost:3000/oninsert", formData)
        .then(res=>{
           console.log(res.data);
           alert("성공적으로 추가되었습니다");
            window.location.reload();
        })
        .catch(function(error){
           alert('추가에 실패했습니다');
        });
    }

    const onUpdate = (e) => {
        e.preventDefault();
    
        // file + form field -> 짐을 싼다
        let formData = new FormData();
        formData.append("id", id);
        formData.append("position", params.pos);
        formData.append("imgtext", text);
    
        formData.append("uploadFile", document.frm.uploadFile.files[0]);
    
        // 보내자!
        axios.post("http://localhost:3000/onupdate", formData)
        .then(res=>{
           console.log(res.data);
           alert("성공적으로 수정되었습니다");
           window.location.reload();
        })
        .catch(function(error){
           alert('수정에 실패했습니다');
        });
    }

    function backselect(num){
        setStagenum(num);
        if (num === 1){
            setBackimg(stage1);
        }
        if (num === 2){
            setBackimg(stage2);
        }
        if (num === 3){
            setBackimg(stage3);
        }
    }

    const select = () => {
        if (a[10] === false){
        axios.post("http://localhost:3000/stageinsert", null, 
                    { params:{ "id":id, "position":10, "imgtext": stagenum }})
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 설정되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             }) 
        }  
        if (a[10] === true){
            axios.post("http://localhost:3000/stageupdate", null, 
                    { params:{ "id":id, "position":10, "imgtext": stagenum }})
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 설정되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             }) 
        }

    }

    const updateQuestion = () => {
        if (a[11] === false){
        axios.post("http://localhost:3000/queinsert", null, 
                    { params:{ "id":id, "position":11, "filename": question1, "newfilename": question2, "imgtext": question3 }})
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 설정되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             }) 
        }  
        if (a[11] === true){
            axios.post("http://localhost:3000/queupdate", null, 
                    { params:{ "id":id, "position":11, "filename": question1, "newfilename": question2, "imgtext": question3 }})
             .then(res => {
                console.log(res.data);
                if(res.data === "YES"){
                    alert("성공적으로 설정되었습니다");
                    window.location.reload();
                }else{
                    alert("등록되지 않았습니다");
                }
             })
             .catch(function(err){
                alert(err);
             }) 
        }

    }

    return (
        <div id="back">
            <div id="topbar">
                <div id="barbtns">
                    <div id="ibtn">I</div>
                    <div id="mybtn">MY</div>
                    <div id="mebtn">ME</div>
                    <div id="mine_btn">MINE</div>

                    <div id="cardbtn">CARD</div>
                    <div id="bookbtn">GUEST</div>
                </div>
            </div>
            <div id="toolbox">
                <div>
                    <div>
                        <button onClick={(e) => {window.location.href = "/mine"}}>사용자 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_edi/1"}}>에디터 모드</button>
                        <button onClick={(e) => {window.location.href = "/mine_guestbook"}}>방명록</button>
                    </div>
                    <div><button onClick={(e) => {window.location.href = "/guest_mine/qwe46200@naver.com"}}>테스트</button></div>
                </div>

                <div id="gamebox">
                    <div className="container">
                        <div>
                            { !a[10] && (<img src={stage1} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '1' ) && (<img src={stage1} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '2' ) && (<img src={stage2} alt="" width="577px" height="347px" />)}
                            { a[10] && (b[10].imgtext === '3' ) && (<img src={stage3} alt="" width="577px" height="347px" />)}
                        </div>
                        <div className="portal"></div>
                        <div>
                            {a[1] && (
                            <div className="point" id="first"><img src={process.env.PUBLIC_URL + "/img/" + b[1].newfilename} alt="point1" width="30px"/></div>
                            )}
                            {!a[1] && ( <div className="point" id="first"><strong>1</strong></div> )}

                            {a[2] && (
                            <div className="point" id="second"><img src={process.env.PUBLIC_URL + "/img/" + b[2].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[2] && ( <div className="point" id="second"><strong>2</strong></div> )}

                            {a[3] && (
                            <div className="point" id="third"><img src={process.env.PUBLIC_URL + "/img/" + b[3].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[3] && ( <div className="point" id="third"><strong>3</strong></div> )}

                            {a[4] && (
                            <div className="point" id="fourth"><img src={process.env.PUBLIC_URL + "/img/" + b[4].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[4] && ( <div className="point" id="fourth"><strong>4</strong></div> )}

                            {a[5] && (
                            <div className="point" id="fifth"><img src={process.env.PUBLIC_URL + "/img/" + b[5].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[5] && ( <div className="point" id="fifth"><strong>5</strong></div> )}

                            {a[6] && (
                            <div className="point" id="sixth"><img src={process.env.PUBLIC_URL + "/img/" + b[6].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[6] && ( <div className="point" id="sixth"><strong>6</strong></div> )}
                            
                            {a[7] && (
                            <div className="point" id="seventh"><img src={process.env.PUBLIC_URL + "/img/" + b[7].newfilename} alt="point2" width="30px"/></div>                        
                            )}
                            {!a[7] && ( <div className="point" id="seventh"><strong>7</strong></div> )}

                            {a[8] && (
                            <div className="point" id="eight"><img src={process.env.PUBLIC_URL + "/img/" + b[8].newfilename} alt="point2" width="30px"/></div>                        
                            )} 
                            {!a[8] && ( <div className="point" id="eight"><strong>8</strong></div> )}
                        </div>
                    </div>

                    <div className="textbox">자유롭게 편집하여 MINE을 채워주세요</div>
                </div>

                <div id="editor">
                    <div>
                        <button><Link to={`/mine_edi/${1}`}>1</Link></button>
                        <button><Link to={`/mine_edi/${2}`}>2</Link></button>
                        <button><Link to={`/mine_edi/${3}`}>3</Link></button>
                        <button><Link to={`/mine_edi/${4}`}>4</Link></button>
                        <button><Link to={`/mine_edi/${5}`}>5</Link></button>
                        <button><Link to={`/mine_edi/${6}`}>6</Link></button>
                        <button><Link to={`/mine_edi/${7}`}>7</Link></button>
                        <button><Link to={`/mine_edi/${8}`}>8</Link></button>
                        <button><Link to={`/mine_edi/${9}`}>캐릭터</Link></button>
                        <button><Link to={`/mine_edi/${10}`}>배경</Link></button>
                        <button><Link to={`/mine_edi/${11}`}>질문</Link></button>
                    </div>
                    <div>
                        {(params.pos === '11') && (
                            <div>
                                <p>방문자들이 답변해주었으면 하는 질문을 작성해주세요.</p>

                                
                                1. <input value={question1} onChange={(e)=>setquestion1(e.target.value)}></input><br/>
                                2. <input value={question2} onChange={(e)=>setquestion2(e.target.value)}></input><br/>
                                3. <input value={question3} onChange={(e)=>setquestion3(e.target.value)}></input><br/>
                                <button type="button" onClick={updateQuestion}>작성완료</button>
                            </div>
                        )}
                        {(params.pos === '10') && (
                            <div>
                                <img src={backimg} alt="back" width="300px" height="200px"/>
                                <br/>
                                <button type="button" onClick={() => backselect(1)}>배경1</button>
                                <button type="button" onClick={() => backselect(2)}>배경2</button>
                                <button type="button" onClick={() => backselect(3)}>배경3</button>
                                <br/>
                                <button type="button" onClick={select}>배경설정</button>
                            </div>
                        )}
                        {!check && (params.pos !== '10') && (params.pos !== '11') && (
                        <form name="frm" onSubmit={onInsert} encType="multipart/form-data">
                            <img src={imgFile} alt="" width="300px"/>
                            <input type="file" name="uploadFile" accept="*" onChange={imageLoad} ref={imgRef}/>
                            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder='텍스트를 입력하세요'/>
                            <br/>
                            <input type="submit" value="추가" />
                        </form>
                        )}
                        {check && (params.pos !== '10') && (params.pos !== '11') && (
                        <form name="frm" onSubmit={onUpdate} encType="multipart/form-data">
                            <img src={imgFile} alt="" width="300px"/>
                            <input type="file" name="uploadFile" accept="*" onChange={imageLoad} ref={imgRef}/>
                            <input value={text} onChange={(e)=>setText(e.target.value)} placeholder='텍스트를 입력하세요'/>
                            <br/>
                            <input type="submit" value="수정" />
                            <button type="button" onClick={deletemine}>삭제</button>
                        </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mine_edi;