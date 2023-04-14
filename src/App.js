import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';


import Me from "./component/Me/Me";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/me">me</Link>
        
        <Routes>
          <Route path="/me" element={<Me></Me>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
