import React, { useContext, useEffect, useRef, useState } from "react";
import Memes from "./Memes";
import MemesContext from "../context/MemesContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const context = useContext(MemesContext);
  const { isDarkMode, memesData } = context;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermFilter, setSearchTermFilter] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    navigate(`/search/${value}`, {
      state: { searchValue: value },
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        const dataFilter = memesData
          .map((data) => data.title)
          .filter((val) =>
            val.toLowerCase().includes(searchTerm.toLowerCase())
          );
        setSearchTermFilter(dataFilter);
      } else {
        setSearchTermFilter([]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.innerText);
    inputRef.current.focus();
  };
  return (
    <>
      <div className="heroContainer">
        <div className={`heroSection`}>
          <div className="heroContent">
            <h1>Boost Your Video with Memes</h1>
            <p>
              Memes can enhance your video content and make it more engaging and
              shareable.
            </p>
          </div>
          <div className="searchBox ">
            <form onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                placeholder="Search..."
                name="search"
                autoComplete="off"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                ref={inputRef}
                required
              />
              <span onClick={() => setSearchTerm("")}>&times;</span>
              <button type="submit" className="submitBtn" title="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            {searchTerm &&
              searchTerm?.trim() !== searchTermFilter[0]?.trim() && (
                <div
                  className="search-auto-box"
                  style={{
                    height: !searchTermFilter.length && "auto",
                  }}
                >
                  {searchTermFilter?.map((title, index) => (
                    <div
                      className="search-title"
                      key={index}
                      onClick={handleSearchTerm}
                    >
                      {title}
                    </div>
                  ))}
                </div>
              )}
          </div>
        </div>
      </div>

      <Memes />
    </>
  );
};

export default Home;
