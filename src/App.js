
import EachImage from './component/EachImage/EachImage.jsx'
import FullSite from './container/FullSite.js'
import './App.css';
import {Route, Routes} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FullSite/>}/>
        <Route path="/fullGallery" element={<EachImage/>}/>
      </Routes>
    </div>
  );
}

export default App;




