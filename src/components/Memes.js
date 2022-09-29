import React, {useContext } from 'react';
import { useNavigate } from "react-router-dom";
import loadErrorImg from '../assets/503 Error.svg';
import MemesContext from '../context/MemesContext';

const Memes = (props) => {
  const { title ,selectedTag} = props
  const context = useContext(MemesContext)
  const {memesData,isLoad,errorMsg}= context
  
  let navigate = useNavigate();
  const memesDataArray = memesData.map((obj)=>{
    return {...obj,date:new Date(obj.date)};
  });
  const desendingOrder = memesDataArray.sort((a, b) => Number(b.date) - Number(a.date))
 
  // const selectedTagData = memesData.filter((value)=>{
  //   return value.tag.includes(selectedTag)
  // })
  let newMemesData = desendingOrder;
  // console.log(datas[0].date)
  // console.log(selectedTag)
  // console.log(selectedTagData)
  // // if(selectedTag){
  // //   data = selectedTagData;
  // // }

  const redirectNextPage = (id, title, previewUrl,tag) => {
    navigate(`/watch/${id}`, {
      state: { id, title, previewUrl,tag }
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
      </div>
      <div className='memesInner' >
        {newMemesData.map((data) => {
          return (
            <div className="videoBox" key={data._id} onClick={() => redirectNextPage(data._id, data.title, data.previewUrl,data.tag)}>
             {data.posterUrl?<img className='poster' width='274' height='154' src={data.posterUrl} alt="poster" loading="lazy"/>
             :
             <video className='poster' width='274' height='154' src={data.previewUrl} disablePictureInPicture /> 
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