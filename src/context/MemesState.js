import { useState, useEffect } from "react";
import MemesContext from "./MemesContext";

const MemesState = (props) => {
    const host = 'https://okv-memes-api.onrender.com'
    const getDarkModeValue = ()=>{
        return JSON.parse(localStorage.getItem('darkMode'))||false;
    }
    const [memesData, setMemesData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(getDarkModeValue());

    // get all data
    const getData = async () => {
        try {
            const response = await fetch(`${host}/api/memes/fetchallmemes`, {
                method: 'GET',
                headers:{
                    'Content-Type': 'application/json'
                }

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

    // add data
    const addMemes = async(title,description,videoUrl,posterUrl,tag)=>{
        const response = await fetch(`${host}/api/memes/addmemes`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,videoUrl,posterUrl,tag})
        })
        const newMemes = await response.json();
        setMemesData(memesData.concat(newMemes));
    }

    // edit data 
    const updateMemes = async(id,title,description,videoUrl,posterUrl,tag)=>{
        const response = await fetch(`${host}/api/memes/updatememes/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,videoUrl,posterUrl,tag})

        })
        const data = await response.json();
        console.log(data);

        let updatedMemes = JSON.parse(JSON.stringify(memesData));
        for(let index = 0; index<updatedMemes.length;index++){
            let element = updatedMemes[index]
            if(element._id=== id){
                element.title = title;
                element.description = description;
                element.videoUrl = videoUrl;
                element.posterUrl = posterUrl;
                element.tag = tag;
                break;
            }
        }
        setMemesData(updatedMemes);
    }

    // delete data
    const  deleteMemes = async(id)=>{
        const response = await fetch(`${host}/api/memes/deletememes/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token')
            }

        })
        const data = await response.json();
        console.log(data);
        const remainingMemes = memesData.filter((memes)=>{
            return memes._id !== id
        })
        setMemesData(remainingMemes);

    }


    
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
        <MemesContext.Provider value={{ memesData, isLoad, errorMsg, getData,isDarkMode,modeToggle,deleteMemes,addMemes,updateMemes }}>
            {props.children}
        </MemesContext.Provider>
    )

}

export default MemesState