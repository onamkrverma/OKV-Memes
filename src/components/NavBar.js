import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MemesContext from '../context/MemesContext';

const NavBar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const context = useContext(MemesContext);
  const { isDarkMode, modeToggle, memesData } = context
  const [searchTerm, setSearchTerm] = useState('')

  let navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = e.target.search.value
    navigate(`/search/${value}`, {
      state: { searchValue: value }
    })

  }



  const searchTermFilter = memesData.map((data) => data.title).filter((val) => (val.toLowerCase()).includes(searchTerm.toLowerCase()));

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.innerText);
    inputRef.current.focus();

  }

// console.log(searchTerm)
// console.log(searchTermFilter[0])

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
            <input
              type="text"
              placeholder='Search...'
              name='search'
              autoComplete='off'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              ref={inputRef}
              required />
            <span onClick={() => setSearchTerm('')} >&times;</span>
            <button type='submit' className="submitBtn" style={{ background: isDarkMode ? '#ffffff14' : "" }} title='submit'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          {(searchTerm && searchTerm !== searchTermFilter[0]) &&
            <div className="search-auto-box" >
              {searchTermFilter.length ? searchTermFilter.map((title, index) =>
                <div className="search-title" key={index} onClick={handleSearchTerm}>
                  {title}
                </div>)
              :
                <div className="search-title" >
                  No results found
                </div>
              }
            </div>
            
          }
        </div>


        <button className="darkModeBtn" type='button' title='switch theme' style={{ display: isMenuActive ? "block" : '' }} onClick={handleDarkMode}>
          <i className="fa-solid fa-moon" style={{ display: isDarkMode ? 'none' : 'block' }} ></i>
          <i className="fa-solid fa-sun" style={{ display: isDarkMode ? 'block' : 'none' }}></i>
          <p>{isDarkMode ? "Light Mode" : "Dark Mode"}</p>
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