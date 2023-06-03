import EachImage from './component/EachImage/EachImage.jsx'
import FullSite from './container/FullSite.js'
import './App.css';
import {Route, Routes} from "react-router-dom"
import Main from './component/main/Main.jsx'
import Navbar from './component/navbar/Navbar.jsx'
import AboutUs from './component/aboutUs/AboutUs.jsx'
import Gallery from './component/gallery/Gallery.jsx'
import Contact from './component/contact/Contact.jsx'
import Footer from './component/footer/Footer.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Footer/>}/>
        <Route path="/fullGallery" element={<EachImage/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/footer" element={<FullSite/>}/>
      </Routes>
    </div>
  );
}

export default App;
