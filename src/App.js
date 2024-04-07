import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Drawing from "./components/Draw/Draw";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route path={'/draw/:id'} element={<Drawing/>}/>
              <Route path={'/'} element={<Home/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
