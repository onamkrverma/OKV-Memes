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
import MemesState from './context/MemesState';
import Admin from './admin ui/Admin';
import AdminLogin from './admin ui/AdminLogin';
function App() {
  return (
    <>
    <MemesState>
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/watch/:id" element={<MemesDetails/>}/>
    <Route path="/search/:value" element={<Search/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/admin/login' element={<AdminLogin/>}/>
    
    
    </Routes>
    </BrowserRouter>
    </MemesState>
    </>
    
  );
}

export default App;
