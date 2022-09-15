import React from 'react'
import PageNotFoundImg from '../assets/404 Error Page not Found.svg'

const PageNotFound = () => {
  return (
    <div className='pageNotFound'>
        <img src={PageNotFoundImg} alt="page not fond error" />
    </div>
  )
}

export default PageNotFound