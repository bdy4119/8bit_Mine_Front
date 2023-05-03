// import { useState } from "react";
// import axios from 'axios';
// import { useParams } from "react-router-dom";

// export default function FileUpload(){

//     const param = useParams();

//     const id = "test";
//     const [mfCategory, setmfCategory] = useState(param.category);
//     const [mfTitle, setmfTitle] = useState('');
//     const [mfMemo, setmfMemo] = useState('');
//     const [fileLoad, setFile] = useState('');

    
  

//         let formData = new FormData();
//         formData.append("mfCategory", mfCategory);
//         formData.append("mfTitle", mfTitle);
//         formData.append("mfMemo", mfMemo);
//         // formData.append("mfFileId", imfFileId);
//         formData.append("fileLoad", document.frm.fileLoad.files[0]);

//         axios.post("http://localhost:3000/uploadFile", formData)
//         .then(function(res){
//             alert(res.data);
//             window.location.reload();
//         })
//         .catch(function(err){
//             alert(err);
//         })
//     }
    



    


//     return(
//         <>

//             <div>
//                 <label htmlFor="mfcategory">
//                     category : 
//                     <input type="text" id="category" value={setmfCategory} readOnly/>
//                 </label>
//             </div>
//             <div>
//                 <label htmlFor="title">
//                     title : 
//                     <input type="text" onChange={(e)=>{setsetmfTitle(e.target.value)}}/>
//                 </label>
//             </div>
//             <div>
//                 <label htmlFor="file">
//                     file : 
//                     <input type="file" name="fileLoad" onChange={(e)=>{setFile(e.target.value)}} accept="*"/>
//                 </label>
//             </div>
//             <div>
//                 <label htmlFor="memo">
//                     memo : 
//                     <input type="text" onChange={(e)=>{setmfMemo(e.target.value)}}/>
//                 </label>
//             </div>
//             <div>
//                 <label htmlFor="id">
//                     id : 
//                     <input type="text" value={id} readOnly/>
//                 </label>
//             </div>
//             <div>
//                 <button type="submit">파일 업로드</button>
//             </div>

//         </>
//     )
// };

















