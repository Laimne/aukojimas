import "./App.css";

import {NavLink, BrowserRouter, Route, Routes } from  "react-router-dom"
import MainH from "./Components/history/MainH"
import MainI from "./Components/idea/MainI"
function App() {

  
  return (
    <div className="App">
    
    <BrowserRouter>
    <nav>
      <NavLink to="/" style={{'marginRight': '20px'}}>HISTORY</NavLink>
      <NavLink to="/history" >AUKOJIMAI </NavLink>
      </nav>
    <Routes>
      <Route path="/" element={<MainH/>}></Route>
      <Route path="/history" element={<MainI/>}></Route>
    </Routes>
    </BrowserRouter>
    </div>
  );
}


export default App;