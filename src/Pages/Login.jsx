import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const inputClass = "w-full placeholder:text-neutral-300 outline-none bg-white focus:border-neutral-600 border-[3px] border-neutral-200 px-5 py-2 rounded-lg";

export default function Login() {
    const [ error, setError ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email       = e.target[0].value;
        const password    = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
            
        } catch (error) {
            let err = error.message.split('/')[1].split(')')[0];
            setError(err);
        }
    }

    return (
        <div className="max-sm:w-4/5 max-lg:w-3/5 border-2 border-neutral-500 text-neutral-600 p-6 flex flex-col gap-6 rounded-xl w-2/6">
            <h1 className="sm:hidden text-2xl font-semibold text-center text-orange-600">Chatting</h1>
            <h1 className="text-center text-2xl font-semibold">Sign in</h1>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8">
                <input className={inputClass} placeholder="example@gmail.com" type="email" />
                <input className={inputClass} placeholder="Password" type="password" />
                <button className="px-5 py-4 font-semibold bg-white rounded-lg cursor-pointer border-[3px] border-neutral-200 hover:border-neutral-600 duration-300 ease-out">Sign in</button>
                <p className="text-center">if you don't have an account? <Link className='text-blue-500' to="/register">Sign up</Link></p>
                {error && <span className="text-red-500 text-center">{error}</span>}
            </form>
        </div>
    )
}