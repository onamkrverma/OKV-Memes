import React, { useRef ,useContext} from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import MemesContext from '../context/MemesContext';

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const context = useContext(MemesContext);
  const {isDarkMode,modeToggle} = context
  let navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.search.value
    navigate(`/search/${value}`, {
      state: { searchValue: value }
    })


  }
  const refText = useRef(null)
  const clearField = () => {
    refText.current.value = null
  }

  const activeMenue = () => {
    setIsMenuActive(!isMenuActive)
  }

  const handleDarkMode = () => {
    modeToggle()

  }

  return (
    <nav >
      <div className={`navBar ${isDarkMode ? 'darkModeActive' : ""} `}>
        <div className="logo">
          <img src="../image/mainIcon.png" width='40' height='40' alt="icon" />
          <Link to="/"><h1>Okv-Memes</h1></Link>
        </div>
        <div className="navLinks" style={{ display: isMenuActive ? "flex" : '' }}>
          <ul >
            <li><Link to="/" >Home</Link></li>

          </ul>
        </div>
        <div className="searchBox" style={{ display: isMenuActive ? "block" : '' }}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <input type="text" placeholder='Search...' ref={refText} name='search' autoComplete='off' required />
            <span onClick={clearField} >X</span>
            <button type='submit' className="submitBtn" style={{background: isDarkMode?'#ffffff14':""}} title='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>

        <button className="darkModeBtn" type='button' title='switch theme' style={{ display: isMenuActive ? "block" : '' }} onClick={handleDarkMode}>
          <i className="fa-solid fa-moon" style={{display:isDarkMode?'none':'block'}} ></i>
          <i className="fa-solid fa-sun" style={{display:isDarkMode?'block':'none'}}></i>
          <p>{isDarkMode?"Light Mode":"Dark Mode"}</p>
        </button>

        <div className={`menuBar ${isMenuActive ? "menuActive" : ""}`} onClick={activeMenue}>
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      </div>
    </nav>

  )
}

export default NavBar