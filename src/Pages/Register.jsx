import { FaUserCircle } from 'react-icons/fa';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../firebase';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const inputClass = "w-full placeholder:text-neutral-300 outline-none bg-white focus:border-neutral-500 border-[3px] border-neutral-200 px-5 py-2 rounded-lg";

export default function Register() {
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);

    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email       = e.target[1].value;
        const password    = e.target[2].value;
        const file        = e.target[3].files[0];

        const metadata = {
            contentType: 'image/jpeg'
        };

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setLoading(true);
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    }
                }, 
                (error) => {
                    switch (error.code) {
                    case 'storage/unauthorized':
                        console.log("User doesn't have permission to access the object");
                        break;
                    case 'storage/canceled':
                        console.log("User canceled the upload");
                        break;
                    case 'storage/unknown':
                        console.log("Unknown error occurred, inspect error.serverResponse");
                        break;
                    }
                }, 
                () => {
                    // "Upload completed successfully, now we can get the download URL"
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(res.user, { displayName, photoURL: downloadURL });
                        await setDoc(doc(db, 'users', res.user.uid), { uid: res.user.uid, displayName, email, photoURL: downloadURL });
                        await setDoc(doc(db, 'userChats', res.user.uid), {});
                        setLoading(false);
                    }).then(navigate('/'));
                }
                );
        } catch (error) {
            let err = error.message.split('/')[1].split(')')[0];
            setError(err);
        }
    }
    
    return (
        <div className="max-sm:w-4/5 max-lg:w-3/5 border-[3px] border-neutral-500 text-neutral-600 p-6 flex flex-col gap-6 rounded-lg w-2/6">
            {loading && 
            <div className='absolute' role="status">
                <span className='text-center'>Loading</span>
                <svg aria-hidden="true" className="w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-neutral-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
            }
            <h1 className="sm:hidden text-2xl font-semibold text-center text-orange-600">Chatting</h1>
            <h1 className="text-center text-2xl font-semibold">Register</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                <input className={inputClass} required placeholder="Nick Name" type="text" />
                <input className={inputClass} required placeholder="example@gmail.com" type="email" />
                <input className={inputClass} required placeholder="Password" type="password" />
                <input className="hidden" required type="file" id="file" />
                <label htmlFor="file">
                    <div className='flex gap-3 items-center cursor-pointer border-[3px] border-neutral-200 px-5 py-2 rounded-lg hover:border-neutral-500 text-neutral-600'>
                        <FaUserCircle className='text-3xl' />
                        <span>Add an Avatar</span>
                    </div>
                </label>
                <button className="px-5 py-4 font-semibold bg-white rounded-lg cursor-pointer border-2 border-neutral-200 hover:border-neutral-600 duration-300 ease-out">Sign up</button>
                <p className='text-center'>Have an account <Link className='text-blue-500' to="/login">Sign in</Link></p>
                {error && <span className='text-red-500 text-center'>{error}</span>}
            </form>
        </div>
    )
}