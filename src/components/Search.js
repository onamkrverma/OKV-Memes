import React, { useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.svg';
import MemesContext from '../context/MemesContext';

const Search = () => {
  const context = useContext(MemesContext);
  const {memesData,isLoad} = context
  let navigate = useNavigate();
  const { state } = useLocation();
  const { searchValue } = state
  // console.log(searchValue)


  const filterData = memesData.filter((value) => {
    return value.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  // console.log(filterData)

  const redirectNextPage = (id, title, videoUrl,tag) => {
    navigate(`/watch/${id}`, {
      state: { id, title, videoUrl,tag }
    });
    // console.log(id)
  }

  return (
    <>
      <div className="searchResults">
        <div className="loading" style={{ display: isLoad ? 'flex' : 'none' }}>
          <img src="../image/dualBall.svg" width='80' height='80' alt="loading" />
        </div>
        <div className="results">

          {filterData.length > 0 ?
            filterData.map((data) => {
              return (
                <div className="videoBox" key={data._id} onClick={() => redirectNextPage(data._id, data.title, data.videoUrl,data.tag)}>
                  {data.posterUrl ? <img width='274' height='154' className='poster' src={data.posterUrl} alt="poster" loading='lazy' />
                    :
                    <video className='poster' width='274' height='154' src={data.videoUrl} disablePictureInPicture />
                  }
                  <span className='playIcon'><i className="fa-solid fa-play"></i></span>
                  <div className="videoShortDetails">
                    <img className='userLogo' width='33' height='33' src="../logo192.png" alt="uploader" />
                    <h5>{data.title}</h5>
                  </div>
                  
                </div>
                
              )
            })
            : (<div className="notFound">
              <img src={notFound} alt="not found" />
              <h3>Ups!... no results found</h3>
            </div>)

          }



        </div>
      </div>
    </>
  )
}

export default Search