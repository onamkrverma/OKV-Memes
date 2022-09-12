import React,{useRef}  from 'react'
import { Link, useNavigate } from 'react-router-dom'


const NavBar = () => {
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


  return (
    <nav >
      <div className='navBar'>
        <div className="logo">
          OKV-Memes
        </div>
        <div className="navLinks">
          <ul >
            <li><Link to="/">Home</Link></li>

          </ul>
        </div>
        <div className="searchBox">
          <form  onSubmit={handleSubmit} >
            <input type="text" placeholder='Search' ref={refText} name='search' required autoComplete='off' /> 
            <span onClick={clearField} >X</span>
            <button type='submit' className='submitBtn' title='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>
        </div>
      </div>
    </nav>

  )
}

export default NavBar