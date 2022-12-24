import React ,{useContext} from 'react';
import Memes from './Memes';
import MemesContext from '../context/MemesContext';

const Home = () => {
  const context = useContext(MemesContext);
  const {isDarkMode} = context;

  return (
    <>

      <div className='container'>
        <div className={`heroSection ${isDarkMode?"darkModeActive":""}`}>
          <div className="heroContent">
            <h1>Make Video More Engaging</h1>
            <p>Adding memes to your video can increase video audience retention</p>
            
          </div>
          <div className="heroImage">
            <img src="./image/poster.png" width='384' heigth='372' alt="poster img" style={{ display: 'block' }} />
          </div>
          <div className="circle"></div>

        </div>

      </div>

      <Memes />



    </>
  )
}

export default Home