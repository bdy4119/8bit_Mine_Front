import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Me from "./component/Me/Me";
import DiaryWrite from "./component/Me/DiaryWrite";
import TodoWrite from './component/Me/TodoWrite';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/me">me</Link>
        
        <Routes>
          <Route path="/me" element={<Me></Me>}/>

          <Route path="/diaryWrite" element={<DiaryWrite/>}/>
          <Route path="/todoWrite" element={<TodoWrite/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
