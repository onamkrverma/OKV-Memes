import React, { useContext, useState, useRef } from 'react'
import MemesContext from '../context/MemesContext'
const FetchAllData = (props) => {
  const {isAddShow} = props;
  const contex = useContext(MemesContext);
  const { memesData, deleteMemes, updateMemes } = contex
  const [memes, setMemes] = useState({id:"", utitle: "", udescription: "", upreviewUrl: "", uposterUrl: "", utag: "" });
  const [isEditClick, setIsEditClick] = useState(false)

  const handleSubmit = (e)=>{
    updateMemes(memes.id,memes.utitle,memes.udescription,memes.upreviewUrl,memes.uposterUrl,memes.utag);
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
      uposterUrl:current.posterUrl,
      upreviewUrl:current.previewUrl,
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
            <input type="text" name="udescription" value={memes.udescription} onChange={handleOnchange} />
            <label htmlFor="poster">Poster Url</label>
            <input type="text" name="uposterUrl" value={memes.uposterUrl} onChange={handleOnchange} />
            <label htmlFor="preview">Preview Url</label>
            <input type="text" name="upreviewUrl" value={memes.upreviewUrl} onChange={handleOnchange} />
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
              <h5>{element.title}</h5>
              <p>{element.description}</p>
              <a href={element.previewUrl}>Preview url</a>
              <p>{element.tag}</p>
              <div className="controls">
                <button onClick={() => editedMemes(element)} type="button" title='Edit' id='editBtn' className='controlBtn'>Edit</button>
                <button onClick={() => deleteMemes(element._id)} type="button" title='Delete' id='deleteBtn' className='controlBtn'>Delete</button>
              </div>
            </div>)
        })}

      </div>
      </div>
    </>
  )
}

export default FetchAllData