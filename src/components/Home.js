import React  from 'react'
import Memes from './Memes';

const Home = () => {

  return (
    <>

      <div className='container'>
        <div className="heroSection">
          <div className="heroContent">
            <h1>Make video more engaging</h1>
            <p>Adding memes to your video can increase your video audience retention</p>
            
          </div>
          <div className="heroImage">
            <img src="./image/poster.png" alt="poster img" style={{ display: 'block' }} />
          </div>
          <div className="circle"></div>

        </div>

      </div>

      <Memes />



    </>
  )
}

export default Home