import { collection, query, where, getDocs, setDoc, getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Search() {
    const [ userName, setUserName ] = useState('');
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==", userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {setUser(doc.data())});
        } catch (error) {
            setError(error);
        }
    };
    
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };
    
    const handleSelect = async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));
    
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
        
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
    
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp(),
                });
        }
        } catch (error) {
            setError(error);
        }
    
        setUser(null);
        setUserName("")
    };

    return (
        <div className="w-full">
            <input onKeyDown={handleKey} onChange={(e) => setUserName(e.target.value)} value={userName} className="w-full bg-transparent border-b-[3px] border-neutral-400 outline-none placeholder:text-sm px-2 py-3" placeholder="find a user" type="text" name="" id="" />    
            {user &&
                <div onClick={handleSelect} className="flex items-center gap-3 px-3 py-4 border-b-[3px] border-neutral-700 cursor-pointer hover:bg-gray-200 duration-300 ease-out">
                    <img className="last:p-5 max-xl:w-12 max-xl:h-12 w-16 h-16 object-cover rounded-full" src={user.photoURL} alt="user" />
                    <div className="flex flex-col">
                        <span className="max-md:text-sm text-xl font-semibold">{user.displayName}</span>
                        <p className="max-md:text-xs"></p>
                    </div>
                </div>
            }
            {error && <span className="text-center text-red-500">{error}</span>}
        </div>
    )
}