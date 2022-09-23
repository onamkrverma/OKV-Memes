import { useState, useEffect } from "react";
import MemesContext from "./MemesContext";

const MemesState = (props) => {

    const getDarkModeValue = ()=>{
        return JSON.parse(localStorage.getItem('darkMode'))||false;
    }
    const [memesData, setMemesData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(getDarkModeValue());
    const getData = async () => {
        try {
            const response = await fetch('https://api.npoint.io/a62c3019efce6bb23bcb', {
                method: 'GET',

            })
            const data = await response.json();

            setMemesData(data);
            setIsLoad(false);
            // console.log(data)
        } catch (error) {
            // console.log('error',error);
            setIsLoad(false)
            setErrorMsg("Can't load data... Please Try Again")
        }
    }
    useEffect(() => {
        getData();
    }, [])

    
    const modeToggle =()=>{
        setIsDarkMode(!isDarkMode)
    }
    useEffect(() => {
      localStorage.setItem('darkMode',JSON.stringify(isDarkMode))
    }, [isDarkMode])
    
    
    if (isDarkMode) {
        document.body.style.backgroundColor = "#181818";
        document.body.style.color = "white";
        
      }else{
        document.body.style.backgroundColor = "#f9f9f9";
        document.body.style.color = "black";
    }

    return (
        <MemesContext.Provider value={{ memesData, isLoad, errorMsg, getData,isDarkMode,modeToggle }}>
            {props.children}
        </MemesContext.Provider>
    )

}

export default MemesState