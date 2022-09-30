import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import AddMemes from './AddMemes'
import FetchAllData from './FetchAllData'


const Admin = () => {
  const [isAdd, setIsAdd] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  let navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      setIsAuth(true)
    }
    else{
      navigate('/admin/login');
    }
  }, [])
  
  const handleLogout = ()=>{
    localStorage.removeItem('token')
    navigate('/admin/login')
  }


  return (
    
    <div className="adminContainer">
      <div className="sideBar" >
      <h1>Hello Admin</h1>
      <div className="sideBarBtn">
      <button onClick={()=>setIsAdd(!isAdd)} type="button">{!isAdd?"Upload Memes":"View All contents"}</button>
      <button type='button' onClick={handleLogout}>Logout</button>
      </div>
      </div>
      <div className="mainContent" >
      <FetchAllData isAddShow={isAdd}/>
      <AddMemes isAddShow={isAdd} />
      </div>  
    </div>
   
    
  )
}

export default Admin