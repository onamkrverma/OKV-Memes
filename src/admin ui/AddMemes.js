import React, { useContext, useState } from 'react'
import MemesContext from '../context/MemesContext'
const AddMemes = (props) => {
  const {isAddShow} = props;
  const contex = useContext(MemesContext);
  const { addMemes } = contex;
  const [memes, setMemes] = useState({ title: "", description: "", previewUrl: "", posterUrl: "", tag: "" });

  const handleSubmit = (e) => {
    addMemes(memes.title, memes.description, memes.posterUrl, memes.previewUrl, memes.tag);
    e.preventDefault();
    setMemes({ title: "", description: "", previewUrl: "", posterUrl: "", tag: "" })
    console.log('New memes added')
    alert('New memes added')
  }

  const handleOnchange = (e) => {
    setMemes({ ...memes, [e.target.name]: e.target.value })
  }

  return (
    <div className="addMemesContainer" style={{display: isAddShow?'flex':'none'}}>
      <h3>Upload newMemes</h3>
      <form className='addMemesBox' autoComplete='off'>
        <label htmlFor="title">Title</label>
        <input type="text" title='title' name='title' value={memes.title} onChange={handleOnchange} required />
        <label htmlFor="description" >Description</label>
        <input type="text" title='description'  name="description" value={memes.description} onChange={handleOnchange} required/>
        <label htmlFor="poster">Poster Url</label>
        <input type="text" title='posterUrl' name="posterUrl" value={memes.posterUrl} onChange={handleOnchange} required />
        <label htmlFor="preview">Preview Url</label>
        <input type="text" title='previewUrl' name="previewUrl" value={memes.previewUrl} onChange={handleOnchange} required />
        <label htmlFor="tag">Tag</label>
        <input type="text" title='tag' name="tag" value={memes.tag} onChange={handleOnchange} required/>
        <button type='submit' onClick={handleSubmit}><span>&uarr;</span>  Upload</button>
      </form>
    </div>
  )
}

export default AddMemes