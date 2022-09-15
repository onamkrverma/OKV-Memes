import React from 'react'
import { useLocation } from 'react-router-dom'
import Memes from './Memes';
import loadErrorImg from '../assets/503 Error.svg'

const MemesDetails = () => {
  const { state } = useLocation();
  const { title, prevLink, downloadLink } = state || {}
  console.log(state)

 const shareData = {
  title: "Watch this New funny memes",
  text: "For more memes like this visit:👉 https://okvmemes.netlify.app/ \n",
  url: prevLink
 }
 const shareClick = async()=>{
  try {
     await navigator.share(shareData);
  } catch (err) {
    console.log('Error:', err);
    alert('Error:', err);
    
  }
 
 }




  return (
    <>
     <div className='detailsContainer'>
      {state? <div className="videoContainer">
        <video width='640' height='360' src={prevLink} controls disablePictureInPicture controlsList='noplaybackrate'  />
        <p>{title}</p>
        <a href={downloadLink} download={title} ><button className='downloadBtn' type='button'><i className="fa-solid fa-download"></i>Download</button></a>
        <button type='button' onClick={shareClick} className="shareBtn"><i className="fa-solid fa-share"></i>Share</button>
      </div>
      :
      <div className='loadError'>
        <img src={loadErrorImg} alt="Server Error" />
        <h3>Sorry! unable to load this video</h3>
      </div>
      }
     

     <div className="otherContent">
      <Memes title={'Related videos'}/>
     </div>
    </div>
    
    
    
    </>
  )
}

export default MemesDetails