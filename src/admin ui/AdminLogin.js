import React,{useState,useContext,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import MemesContext from '../context/MemesContext'
const AdminLogin = () => {
    const context = useContext(MemesContext);
    const {isDarkMode} = context
    const [credential, setCredential] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const response = await fetch('http://localhost:5000/api/auth/login',{
            method: "POST",
            headers:{
                "content-type": "application/json",

            },
            body: JSON.stringify({email:credential.email,password:credential.password})
        })
        const data = await response.json();
        // console.log(data)
        if(data.success){
            localStorage.setItem('token',data.authToken);
            navigate('/admin')
        }
        else{
            alert('invalid credential')
        }

    }

    const handleChange = (e)=>{
        setCredential({...credential, [e.target.name]:e.target.value})
    }
    const refPass = useRef(null)
    const showPassword = ()=>{
        if(refPass.current.type === "password"){
            refPass.current.type = "text";
        }
        else{
            refPass.current.type = "password";
        }
    }


  return (
    <div className='loginContainer'>
        <div className="loginBox">
            <div className="design"></div>
               <h3 style={{color:"white"}}>Admin login</h3>
            <form className='loginForm' onSubmit={handleSubmit}>
             
            <div className='emailBox inputBox'>
                <i className="fa-solid fa-user"></i>
            <input type="email" placeholder='Email' name='email' value={credential.email} onChange={handleChange} style={{color:isDarkMode?'white':'black'}} autoComplete="off" required/>
            </div>
            <div className="passwordBox inputBox">
            <i className="fa-solid fa-lock"></i>
            <input type="password" ref={refPass} placeholder='Password' name='password' value={credential.password} onChange={handleChange} autoComplete='off' style={{color:isDarkMode?'white':'black'}} required/>
            </div>
            <div className="passwordVisible">
                <input type="checkbox" title='showpassword' onClick={showPassword} />
                <p>Show Password</p>
                </div>
            <button type='submit' className='loginBtn'>LOGIN</button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin