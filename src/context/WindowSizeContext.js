import { createContext, useState, useEffect } from "react";

export const WindowSizeContext = createContext();
  
export const WindowSizeContextProvider = ({ children }) => {
    const [ isSm, setIsSm ] = useState(true);
    const [ isMd, setIsMd ] = useState(true);
  
    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 700) setIsMd(true);
            else setIsMd(false);
            if(window.innerWidth < 620) setIsSm(true);
            else setIsSm(false);
        }
        window.addEventListener('resize', handleResize)
    }, [])

    
    return (
        <WindowSizeContext.Provider value={{isSm, isMd}}>
            {children}
        </WindowSizeContext.Provider>
    );
};

