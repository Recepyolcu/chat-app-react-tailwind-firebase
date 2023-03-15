import Chats from "./Chats";
import Search from "./Search";
import SideNavbar from "./SideNavbar";

export default function Sidebar() {
    return (
        <div className="max-sm:w-full max-sm:border-2 w-1/3 h-full border-r-[3px] border-neutral-800">
            <SideNavbar />
            <Search />
            <Chats />
        </div>
    )
}