import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../config/AuthContext';
import { auth } from '../config/firebase.jsx';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("clicked")
        setError('');
        try {
            await signIn(email, password);
            navigate('/newlocation');
        } catch (err) {
        setError(err.message);
        console.log(err.message);
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-70 backdrop-blur-sm z-50 sm:py-12 flex items-center">
            
            <form onSubmit={handleSubmit} className="rounded sm:w-3/4 max-w-sm m-auto p-6 bg-gray-100">
                <p className="mb-4 font-bold text-3xl">Sign In</p>
                <div className="flex flex-col mb-4">
                    <label for="email-input" className="mb-1 font-semibold">E-Mail</label>
                    <input
                        type="email"
                        id="email-input"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <div className="flex flex-col mb-4">
                    <label for="password-input" className="mb-1 font-semibold">Password</label>
                    <input
                        type="password"
                        id="password-input"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded p-3 bg-gray-200"
                    />
                </div>

                <button className="p-2 rounded bg-green-100 border" type="submit">Submit</button>
            </form>

            
        </div>
    )
}

export default SignUp;