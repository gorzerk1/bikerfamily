import Main from './component/main/Main.jsx'
import Navbar from './component/navbar/Navbar.jsx'
import Upcoming from './component/upcoming/Upcoming.jsx'
import AboutUs from './component/aboutUs/AboutUs.jsx'
import Gallery from './component/gallery/Gallery.jsx'
import Contact from './component/contact/Contact.jsx'
import Footer from './component/footer/Footer.jsx'
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




