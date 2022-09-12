import React from 'react'
import { useLocation } from 'react-router-dom'
import Memes from './Memes';
// import { Offline, Online } from "react-detect-offline";
// import noConnection from '../assets/No connection.png'

const MemesDetails = () => {
  const { state } = useLocation();
  const { title, prevLink, downloadLink } = state
  console.log(state)

 


  return (
    <>
    
    <div className='detailsContainer'>
      <div className="videoContainer">
        <video width='640' height='360' src={prevLink} controls disablePictureInPicture controlsList='noplaybackrate' />
        <p>{title}</p>
        <a href={downloadLink} download={title} ><button className='downloadBtn' ><i className="fa-solid fa-download"></i>Download</button></a>
      </div>
     

     <div className="otherContent">
      <Memes title={'Related videos'} />
     </div>
    </div>
    


    {/* <Offline>
      <div className="offline">
      <img src={noConnection} alt="No connection" />
      <h1>No internet</h1>
      </div>
      </Offline> */}
    </>
  )
}

export default MemesDetails