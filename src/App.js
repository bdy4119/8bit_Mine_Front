import { BrowserRouter, Link, Route, Routes, useParams } from "react-router-dom";
import I_main from "./component/I/I_main";

function App() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to='/i'>I 페이지</Link>
        </nav>
      
        <Routes>
          <Route path="/i" element={ <I_main /> } />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
