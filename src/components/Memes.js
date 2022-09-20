import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import loadErrorImg from '../assets/503 Error.svg'

const Memes = (props) => {
  const { title } = props

  let navigate = useNavigate();
  const [memesData, setMemesData] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoad, setIsLoad] = useState(true)

  const getData = async () => {
    try {
      const response = await fetch('https://api.npoint.io/a62c3019efce6bb23bcb', {
        method: 'GET',

      })
      const data = await response.json();

      setMemesData(data);
      setIsLoad(false);
      // console.log(data)
    } catch (error) {
      // console.log('error',error);
      setErrorMsg("Can't load data... Please Try Again")
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const reverseMemesData = memesData.sort((a, b) => b.id - a.id)


  const redirectNextPage = (id, title, prevLink) => {
    navigate(`/watch/${id}`, {
      state: { id, title, prevLink }
    });
    // console.log(id)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className='memesContainer'>
      <h3 className='heading' style={{ display: !errorMsg ? "block" : 'none' }}>{title ? title : 'Popular videos'}</h3>
      <div className="loading" style={{display:isLoad?'flex':'none'}}>
          <img src="../image/colorfill.gif" alt="loading" />
      </div>
      <div className='memesInner' >
        {reverseMemesData.map((data) => {
          return (
            <div className="videoBox" key={data.id} onClick={() => redirectNextPage(data.id, data.title, data.prevLink)}>
             {data.posterLink?<img className='poster' width='274' height='154' src={data.posterLink} alt="poster" loading="lazy"/>
             :
             <video className='poster' width='274' height='154' src={data.prevLink} disablePictureInPicture /> 
             } 
              <span className='playIcon'><i className="fa-solid fa-play"></i></span>
              <div className="videoShortDetails">
                <img className='userLogo' width='33'height='33' src="../logo192.png" alt="uploader" />
              <h5>{data.title}</h5>
              </div>
            </div>)
        })}
      </div>

      <div className="errorMessage" style={{ display: errorMsg ? "block" : 'none' }}>
        <img src={loadErrorImg} alt="Server Error" />
        <h4>{errorMsg}</h4>

        <button className='reloadBtn' type='button' onClick={reloadPage}><i className="fa-solid fa-rotate-right"></i>Try Again</button>
      </div>

    </div>
  )
}

export default Memes