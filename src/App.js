import './App.css';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { useContext } from 'react';
import { AuthContext } from "../src/context/AuthContext";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

export default function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if(!currentUser) return <Navigate to='/login' />
        return (children)
    }

    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
                        <Route path='login' element={<Login /> } />
                        <Route path='register' element={<Register /> } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </main>
    );    
}