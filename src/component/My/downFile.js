import React, { useState } from "react";
import axios from "axios";

function DownloadFile() {

    const fetchData = async() => {
        axios.get("http://localhost:3000/downFile", {params:{"mfSeq":params.seq}} )
    .then(res=>{
      console.log(res.data);
      alert('file  success');
    })
    .catch(function(error){
      alert('file  fail');
    });

  }

  // download
  const download = async() => {
    let filename = "arrow.png";
    
    const url = "http://localhost:3000/fileDownload?filename=" + filename;
  
    //a tag 생성 + 자동실행
    const download = document.createElement('a');
    download.setAttribute('href', url);
    download.setAttribute('download', filename);
    
    download.setAttribute('type', 'application/json');
    download.click();

    window.location.href = url;

  }

  return (
    <div>
      <h3>file_upload</h3>
      <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
        <input value={number} onChange={numberChange} placeholder="번호"/><br/>
        <input value={name} onChange={nameChange} placeholder="이름"/><br/>
        <input value={address} onChange={addressChange} placeholder="주소"/><br/>

        <input type="file" name="uploadFile" accept="*"/>

        <input type="submit" value="upload" />
      </form>
      <hr/>

      <h3>file_download</h3>
      <button onClick={download}>download</button>

    </div>
  );
}

export default DownloadFile;
