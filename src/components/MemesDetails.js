import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Memes from './Memes';
import loadErrorImg from '../assets/503 Error.svg';


const MemesDetails = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const { state } = useLocation();
  const { title, prevLink } = state || {}
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



  return (
    <>
      <div className='detailsContainer'>
        {state ? <div className="videoContainer">
          <video width='640' height='360' src={prevLink} controls disablePictureInPicture controlsList='noplaybackrate' />
          <p>{title}</p>
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
          </div>
        }


        <div className="otherContent">
          <Memes title={'Related videos'} />
        </div>
      </div>



    </>
  )
}

export default MemesDetails