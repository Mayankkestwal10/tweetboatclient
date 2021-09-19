import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from "react-router";
import '../assets/css/Login.css';
import { Link } from "react-router-dom";
import '../assets/css/Register.css';
import logo from '../assets/images/tweetboat.png';
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_LIVE}/login`,
            {
                email: email,
                password: password
            }, {}).then((res) => {
                if (res.data.status === "TB000") {
                    sessionStorage.setItem('tweetboat', JSON.stringify(res.data));
                    setRedirect(true);
                } else {
                    alert(res.data.message);
                }
            }).catch((err) => {
                toast('Something went wrong');
            });
    }


    return (redirect) ? (
        <Redirect to='/home' />
    ) : (
        <div className="d-flex vh-100 login">
            <div className="container my-auto">
                <form className="w-50 mx-auto p-5 border rounded shadow bg-white" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mb-3">
                        <img src={logo} height={100} />
                    </div>
                    
                    <p className="text-center">Login</p>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" value={email} placeholder="Enter email" className="form-control" onChange={(e) => {
                            setEmail(e.target.value);
                        }} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} placeholder="Enter password" className="form-control" onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                    </div>
                    <div className="row mb-3 mx-1">
                        <button type="submit" className="btn btn-lg btn-primary">Login</button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p>New user? <Link to='/register'>Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )



}

export default Login;