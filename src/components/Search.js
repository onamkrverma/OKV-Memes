import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.png'

const Search = () => {
  const [memesData, setMemesData] = useState([]);
  const [isLoad, setIsLoad] = useState(true)
  let navigate = useNavigate();
  const { state } = useLocation();
  const { searchValue } = state
  console.log(searchValue)

  const getData = async () => {
    const response = await fetch('https://api.npoint.io/a62c3019efce6bb23bcb', {
      method: 'GET',

    })
    const data = await response.json();
    setIsLoad(true)
    setMemesData(data)
    setIsLoad(false)
    // console.log(data)

  }
  useEffect(() => {
    getData();
  }, [])

  const filterData = memesData.filter((value) => {
    return value.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  console.log(filterData)

  const redirectNextPage = (id, title, prevLink, downloadLink) => {
    navigate(`/memesDetails/${id}`, {
      state: { id, title, prevLink, downloadLink }
    });
    // console.log(id)
  }

  return (
    <>
      <div className="searchResults">
        <div className="loading" style={{display:isLoad?'flex':'none'}}>
          <img src="../image/colorfill.gif" alt="loading" />
        </div>
        {filterData.length ?<div className="results">
        {filterData.map((data) => {
          return (
            <div className="videoBox" key={data.id} onClick={() => redirectNextPage(data.id, data.title, data.prevLink, data.downloadLink)}>
              <video width='274' height='154' src={data.prevLink} disablePictureInPicture />
              <span className='playIcon'><i className="fa-solid fa-play"></i></span>
              <p>{data.title}</p>
            </div>
          )
        })
        }
        </div>
        : <div className="notFound">
          <img src={notFound} alt="not found" />
          <h3>Ups!... no results found</h3>
        </div> 
        }
      </div>
    </>
  )
}

export default Search