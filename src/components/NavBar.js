import React,{useRef}  from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'


const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  let navigate = useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault()
   const value = e.target.search.value
    navigate(`/search/${value}`,{
      state:{searchValue:value}
    })

    
  }
  const refText = useRef('')
  const clearField = ()=>{
    refText.current.value = ''
  }

  const activeMenue =()=>{
    setIsMenuActive(!isMenuActive)
  }

  return (
    <nav >
      <div className='navBar' >
        <div className="logo">
          <img src="../image/mainIcon.png" alt="icon" />
          <h1>Okv-Memes</h1>
        </div>
        <div className="navLinks" style={{display: isMenuActive?"flex":''}}>
          <ul >
            <li><Link to="/">Home</Link></li>

          </ul>
        </div>
        <div className="searchBox" style={{display: isMenuActive?"block":''}}>
          <form  onSubmit={handleSubmit} autoComplete="off">
            <input type="text" placeholder='Search...' ref={refText} name='search' autoComplete='off' required/> 
            <span onClick={clearField} >X</span>
            <button type='submit' className='submitBtn' title='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
        <div className= {`menuBar ${isMenuActive?"menuActive":""}`} onClick={activeMenue}>
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </div>
    </nav>

  )
}

export default NavBar