import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from "./component/main/main";
import Mine from "./component/mine/mine_main";
import Fullmine from "./component/mine/mine_full";
import MineEdi from "./component/mine/mine_edi";
import Chatbot from "./component/chatbot/chatbot";

function App() {
  return (
    <div>

      <BrowserRouter>      

      <Routes>
        
        <Route path="/main" element={ <Main /> } />
        <Route path="/mine" element={ <Mine /> } />
        <Route path="/mine_full" element={ <Fullmine /> } />
        <Route path="/mine_edi/:pos" element={ <MineEdi /> } />
        <Route path="/chatbot" element={ <Chatbot /> } />

      </Routes>

      </BrowserRouter>      
      
    </div>
  );
}

export default App;
