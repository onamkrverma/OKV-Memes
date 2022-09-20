import './App.css';
import './responsive.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MemesDetails from './components/MemesDetails';
import Search from './components/Search';
import PageNotFound from './components/PageNotFound';
function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/watch/:id" element={<MemesDetails/>}/>
    <Route path="/search/:value" element={<Search/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    
    
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
