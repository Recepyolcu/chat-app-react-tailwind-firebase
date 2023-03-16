import { useContext, useState, useEffect } from "react";
import { OpenChatContext } from "../../context/OpenChatContext";
import Chats from "./Chats";
import Search from "./Search";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {

    return (
        <div className="max-sm:mt-[60px] max-sm:w-full max-sm:border-2 w-1/3 h-full border-r-[3px] border-neutral-800">
            <SideNavbar />
            <Search />
            <Chats />
        </div>
    )
}