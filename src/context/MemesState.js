import { useState, useEffect } from "react";
import MemesContext from "./MemesContext";

const MemesState = (props) => {
    const [memesData, setMemesData] = useState([]);
    const [isLoad, setIsLoad] = useState(true);
    const [errorMsg, setErrorMsg] = useState('')

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

    return (
        <MemesContext.Provider value={{ memesData, isLoad, errorMsg, getData }}>
            {props.children}

        </MemesContext.Provider>
    )

}

export default MemesState