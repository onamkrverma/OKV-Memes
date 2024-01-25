import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Memes from "./Memes";
import MemesContext from "../context/MemesContext";

const MemesDetails = () => {
  const context = useContext(MemesContext);
  const { isDarkMode, memesData } = context;
  const { id } = useParams();

  const currentMemes = memesData.filter((val) => val._id === id);

  const host = process.env.REACT_APP_BACKEND_URL;
  const url = currentMemes[0]?.videoUrl;
  const title = currentMemes[0]?.title + " Okv-memes";

  const shareData = {
    title: `${title} - Watch Funny Memes`,
    text: "OKV-Memes is a website that offers a collection of popular and viral video memes that you can download and use for your video editing projects.",
    url: document.location.href,
  };
  const shareClick = async () => {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <div className="detailsContainer">
      <div className={`videoContainer ${isDarkMode ? "darkModeActive" : ""}`}>
        <video
          width="640"
          height="360"
          src={currentMemes[0]?.videoUrl}
          controls
          disablePictureInPicture
          controlsList="nodownload"
        />
        <div className="videoShortDetails titleLogoBox">
          <img
            className="userLogo"
            src="../logo192.png"
            width="33"
            height="33"
            alt="uploader"
          />
          <h5>{currentMemes[0]?.title}</h5>
        </div>
        <div className="btn">
          <a
            className="downloadBtn"
            href={`${host}/api/memes/download?sourceUrl=${url}&title=${title}`}
            // target="_blank"
            rel="noopener noreferrer"
            download
          >
            <i className="fa-solid fa-download"></i>
            Download
          </a>
          <button type="button" onClick={shareClick} className="shareBtn">
            <i className="fa-solid fa-share"></i>Share
          </button>
        </div>
      </div>

      <div className="otherContent">
        <Memes title={"Related videos"} selectedTag={currentMemes[0]?.tag} />
      </div>
    </div>
  );
};

export default MemesDetails;
