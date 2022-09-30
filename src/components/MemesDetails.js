import React, { useState,useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Memes from './Memes';
import loadErrorImg from '../assets/503 Error.svg';
import MemesContext from '../context/MemesContext';

const MemesDetails = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const context = useContext(MemesContext);
  const {isDarkMode} = context;
  const { state } = useLocation();
  let { title, videoUrl,tag} = state || {}
  // console.log(state)

  const shareData = {
    title: "Watch New Funny Memes",
    text: "Okv-Memes is a place where you can watch and download popular video memes",
    url: 'https://okvmemes.netlify.app/'
  }
  const shareClick = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Error:', err);

    }

  }

  const popUpClick = () => {
    setIsPopUp(!isPopUp)
  }

  // const selectedTag = memesData.filter((value)=>{
  //   return value.tag === tag
  // })
  // console.log(tag)
 
  return (
    <>
      <div className='detailsContainer'>
        {state ? <div className={`videoContainer ${isDarkMode?"darkModeActive":""}`} >
          <video width='640' height='360' src={videoUrl} controls disablePictureInPicture controlsList='noplaybackrate' />
          <div className="videoShortDetails titleLogoBox">
              <img className='userLogo' src="../logo192.png" width='33' height='33' alt="uploader" />
              <h5>{title}</h5>
            </div>
          <div className="btn">
            <button className='downloadBtn' type='button' onClick={popUpClick}><i className="fa-solid fa-download"></i>Download</button>
            <button type='button' onClick={shareClick} className="shareBtn"><i className="fa-solid fa-share"></i>Share</button>

            <p className='popUpBox' style={{ display: isPopUp ? 'block' : 'none' }} >Click on ⁝ dot in video to start downloading</p>
          </div>
          </div>
          :
          <div className='loadError'>
            <img src={loadErrorImg} alt="Server Error" />
            <h3>Sorry! unable to load this video</h3>
            <p>Direct access from url not allowed</p>
          </div>
        }


        <div className="otherContent">
          <Memes title={'Related videos'}  />
        </div>
      </div>



    </>
  )
}

export default MemesDetails