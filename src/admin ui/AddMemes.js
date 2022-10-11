import React, { useContext, useState } from 'react'
import MemesContext from '../context/MemesContext'
const AddMemes = (props) => {
  const {isAddShow} = props;
  const contex = useContext(MemesContext);
  const { addMemes } = contex;
  const [memes, setMemes] = useState({ title: "", description: "", videoUrl: "", posterUrl: "", tag: "" });
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
      addMemes(memes.title, memes.description,memes.videoUrl, memes.posterUrl, memes.tag);
      e.preventDefault();
      setMemes({ title: "", description: "", videoUrl: "", posterUrl: "", tag: "" })
      console.log('New memes added')
      setMessage('New memes added successfully') 

    setTimeout(() => {
      setMessage('')
    }, 3000);
  }

  

  const handleOnchange = (e) => {
    setMemes({ ...memes, [e.target.name]: e.target.value })
  }

  return (
    <div className="addMemesContainer" style={{display: isAddShow?'flex':'none'}}>
      <h3>Upload New Memes</h3>
      <form className='addMemesBox' method='POST' onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor="title">Title</label>
        <input type="text" title='title' name='title' value={memes.title} onChange={handleOnchange} required />
        <label htmlFor="description" >Description</label>
        <textarea title='description' name="description" value={memes.description} onChange={handleOnchange} required/>
        <label htmlFor="poster">Poster Url</label>
        <input type="text" title='posterUrl' name="posterUrl" value={memes.posterUrl} onChange={handleOnchange} required />
        <label htmlFor="preview">Video Url</label>
        <input type="text" title='videoUrl' name="videoUrl" value={memes.videoUrl} onChange={handleOnchange} required />
        <label htmlFor="tag">Tag</label>
        <input type="text" title='tag' name="tag" value={memes.tag} onChange={handleOnchange} autoComplete='on' required/>
        <button type="submit" ><i className="fa-solid fa-cloud-arrow-up"></i> Upload</button>
        <p>{message}</p>
      </form>
    </div>
    
  )
}

export default AddMemes