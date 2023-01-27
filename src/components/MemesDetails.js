import React, { useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import Memes from './Memes';
import MemesContext from '../context/MemesContext';

const MemesDetails = () => {
  const [isPopUp, setIsPopUp] = useState(false);
  const context = useContext(MemesContext);
  const {isDarkMode,memesData} = context;
  const {id} = useParams()
  // console.log(state)


  const currentMemes = memesData.filter((val)=>val._id===id)


  const shareData = {
    title: "Watch New Funny Memes",
    text: "Okv-Memes is a place where you can watch and download popular video memes",
    url: document.location.href
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
      <div className='detailsContainer'>
        <div className={`videoContainer ${isDarkMode?"darkModeActive":""}`} >
          <video width='640' height='360' src={currentMemes[0]?.videoUrl} controls disablePictureInPicture controlsList='noplaybackrate' />
          <div className="videoShortDetails titleLogoBox">
              <img className='userLogo' src="../logo192.png" width='33' height='33' alt="uploader" />
              <h5>{currentMemes[0]?.title}</h5>
            </div>
          <div className="btn">
            <button className='downloadBtn' type='button' onClick={popUpClick}><i className="fa-solid fa-download"></i>Download</button>
            <button type='button' onClick={shareClick} className="shareBtn"><i className="fa-solid fa-share"></i>Share</button>

            <p className='popUpBox' style={{ display: isPopUp ? 'block' : 'none' }} >Click on ⁝ dot in video to start downloading</p>
          </div>
          </div>
          

        <div className="otherContent">
          <Memes title={'Related videos'} selectedTag={currentMemes[0]?.tag} />
        </div>
      </div>



  )
}

export default MemesDetails