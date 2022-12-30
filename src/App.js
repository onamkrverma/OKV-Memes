import './App.css';
import './responsive.css';
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
import { lazy, Suspense } from 'react';

function App() {

  const AdminLogin = lazy(()=> import('./admin ui/AdminLogin'))
  const Admin = lazy(()=> import('./admin ui/Admin'))
  const Home = lazy(()=> import('./components/Home'))


  return (
    <>
    <MemesState>
    <BrowserRouter>
    <NavBar/>
    <Suspense fallback={<div className="loading">
          <img src="/image/dualBall.svg" width='80' height='80' alt="loading" />
          <h5>Please wait..</h5>
      </div>}>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/watch/:id" element={<MemesDetails/>}/>
    <Route path="/search/:value" element={<Search/>}/>
    <Route path='*' element={<PageNotFound/>}/>
    <Route path='/admin' element={<Admin/>}/>
    <Route path='/admin/login' element={<AdminLogin/>}/>
    
    
    </Routes>
    </Suspense>
    </BrowserRouter>
    </MemesState>
    </>
    
  );
}

export default App;
