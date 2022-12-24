import React, {useContext } from 'react';
import { useNavigate } from "react-router-dom";
import loadErrorImg from '../assets/503 Error.svg';
import MemesContext from '../context/MemesContext';

const Memes = ({title,selectedTag}) => {
  const context = useContext(MemesContext)
  let {memesData,isLoad,errorMsg}= context
  let navigate = useNavigate();
  

  const tagFilters = memesData.filter((value)=>{
    return value.tag.includes(selectedTag?.split(',').slice(0,1)); 
  })
  
  if(tagFilters.length>0){
    memesData = tagFilters;
  }
 

  const redirectNextPage = (id, title, videoUrl,tag) => {
    navigate(`/watch/${id}`, {
      state: { id, title, videoUrl,tag }
    });
    // console.log(id)
  }

  const reloadPage = () => {
    window.location.reload()
  }


  return (
    <div className='memesContainer'>
      <div className='heading'style={{ display: !errorMsg ? "block" : 'none' }}>
      <h3  >{title ? title : 'Popular videos'}</h3>
      </div>
      <div className="loading" style={{display:isLoad?'flex':'none'}}>
          <img src="../image/dualBall.svg" width='80' height='80' alt="loading" />
          <h5>Please wait.. Connecting to Server</h5>
      </div>
      <div className='memesInner' >
        {memesData.map((data) => {
          return (
            <div className="videoBox" key={data._id} onClick={() => redirectNextPage(data._id, data.title, data.videoUrl,data.tag)}>
             {data.posterUrl?<img className='poster' width='274' height='154' src={data.posterUrl} alt="poster" loading="lazy"/>
             :
             <video className='poster' width='274' height='154' src={data.videoUrl} disablePictureInPicture /> 
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