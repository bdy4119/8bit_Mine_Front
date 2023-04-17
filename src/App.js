import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Me from "./component/Me/Me";
import DiaryWrite from "./component/Me/DiaryWrite";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/me">me</Link>
        
        <Routes>
          <Route path="/me" element={<Me></Me>}/>

          <Route path="/diaryWrite" element={<DiaryWrite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
