import { useEffect, useState, useRef } from "react";

const UseMatchMedia = (width) => {
    const [toggleChange, setToggleChange] = useState(false)
    const matchMediaRef = useRef(null)
    
    useEffect(() => {
        matchMediaRef.current = window.matchMedia(`(min-width: ${width}px)`)
        const initialMatch = matchMediaRef.current.matches;

        if(initialMatch) {
            setToggleChange(true);
        }else{
            setToggleChange(false);
        }

        const test = (e) => {
            console.log(e)
            if(e.matches){
                setToggleChange(true);
            }else{
                setToggleChange(false)
            }
        }

        matchMediaRef.current.addEventListener("change",test)

        return () => {
            matchMediaRef.current.removeEventListener("change",test)
        }
    },[width])

    return {toggleChange};
}

export default UseMatchMedia;