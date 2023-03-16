import { createContext, useState, useEffect, useContext } from "react";
import { WindowSizeContext } from "./WindowSizeContext";

export const OpenChatContext = createContext();
  
export const OpenChatContextProvider = ({ children }) => {
    const { isSm } = useContext(WindowSizeContext);
    const [ openChat, setOpenChat ] = useState(false);

    useEffect(() => {
        if(!isSm) setOpenChat(false);
        console.log(openChat, isSm);
    }, [isSm, openChat]);

    function handleOpenChat() {
        if(isSm){
            setOpenChat(chat => !chat);
        } else {
            setOpenChat(chat => !chat);
        }
    }

    
    return (
        <OpenChatContext.Provider value={{ openChat, handleOpenChat}}>
            {children}
        </OpenChatContext.Provider>
    );
};

