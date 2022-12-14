import React, { useContext, useState, useRef } from 'react'
import MemesContext from '../context/MemesContext'
const FetchAllData = (props) => {
  const {isAddShow} = props;
  const contex = useContext(MemesContext);
  const { memesData, deleteMemes, updateMemes } = contex;
  const [memes, setMemes] = useState({id:"", utitle: "", udescription: "", uvideoUrl: "",uposterUrl: "", utag: "" });
  const [isEditClick, setIsEditClick] = useState(false);

  const handleSubmit = (e)=>{
    updateMemes(memes.id,memes.utitle,memes.udescription,memes.uvideoUrl,memes.uposterUrl,memes.utag);
    console.log("updated")
    e.preventDefault();
    setIsEditClick(false)
  }
  const handleOnchange = (e)=>{
    setMemes({...memes, [e.target.name]:e.target.value})

  }

  const editedMemes = (current)=>{
    setIsEditClick(true)
    setMemes(
      {
      id:current._id,
      utitle:current.title,
      udescription:current.description,
      uvideoUrl:current.videoUrl,
      uposterUrl:current.posterUrl,
      utag:current.tag
    })
  }
  const refBox = useRef(null)
  window.onclick = (e)=>{
    if(e.target===refBox.current){
      setIsEditClick(false)
    }
  }
  
    

  

  return (
    <>
      <div className="updateBox" ref={refBox} style={{ display: isEditClick ? 'flex' : 'none' }}>
        <div className="updateContent">
          <h3>Update Box</h3>
          <span className='closeBtn' onClick={() => setIsEditClick(false)}>&times;</span>
          <form className='addMemesBox'>
            <label htmlFor="title">Title</label>
            <input type="text" name='utitle' value={memes.utitle} onChange={handleOnchange} />
            <label htmlFor="description" >Description</label>
            <textarea name="udescription" value={memes.udescription} onChange={handleOnchange} />
            <label htmlFor="poster">Poster Url</label>
            <input type="text" name="uposterUrl" value={memes.uposterUrl} onChange={handleOnchange} />
            <label htmlFor="preview">Video Url</label>
            <input type="text" name="uvideoUrl" value={memes.uvideoUrl} onChange={handleOnchange} />
            <label htmlFor="tag">Tag</label>
            <input type="text" name="utag" value={memes.utag} onChange={handleOnchange} />
            <button type='submit' onClick={handleSubmit}>Update</button>
          </form>
        </div>
      </div>

      <div className="showAllContents" style={{display:isAddShow?"none":'block',textAlign:'center'}}>
        <h3>All Uploads</h3>
      <div className="detailsCards" >
        {memesData.map((element) => {
          return (
            <div className="card" key={element._id}>
              <img src={element.posterUrl} width='150' height='100' alt="posterUrl" />
              <div className="cardDetails">
              <h5>{element.title.slice(0,15)}</h5>
              <p>{element.description.slice(0,20)+"..."}</p>
              <a href={element.videoUrl} target="_blank" rel="noreferrer" >Video url</a>
              <p>{element.tag.slice(0,10)}</p>
              </div>
              <div className="controls">
                <button onClick={() => editedMemes(element)} type="button" title='Edit'  className='controlBtn editBtn'>Edit</button>
                <button onClick={() => deleteMemes(element._id)} type="button" title='Delete'  className='controlBtn deleteBtn'>Delete</button>
              </div>
            </div>)
        })}

      </div>
      </div>
    </>
  )
}

export default FetchAllData