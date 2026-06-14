import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './login.scss';
import newRequest from "../../utils/newRequest";
import { toast } from 'react-toastify';
const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res=await newRequest.post('/auth/login',{username,password});
            localStorage.setItem("currentUser",JSON.stringify(res.data));
            toast.success("Logged in successfully.");
            navigate('/');
        } catch (err) {
            const message = err?.response?.data || "Login failed. Please try again.";
            setError(message);
            toast.error(message);
        }

    }
    return ([
        <div className="login">
            <form onSubmit={handleSubmit}>
                <h1>Sign in</h1>
                <label htmlFor="">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                { error && error}
            </form>
        </div>
    ]);
}
export default Login;