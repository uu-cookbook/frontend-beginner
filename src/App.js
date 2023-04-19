import { BrowserRouter, Routes, Route } from "react-router-dom"

//COMPONENTS
import NavBar from "./Components/NavBar" ;

//PAGES
import Home from "./Pages/home"
import Validate from "./Pages/validate"

//CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

//REACT MAGIC

/* RANDOM NOTES
<footer class="bg-light"></footer> */

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className='m-4'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Validation" element={<Validate/>} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}

export default App;
