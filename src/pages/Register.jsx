import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/images/tweetboat.png';

const Register = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_LIVE}/register`,
            {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password
            }, {}).then((res) => {
                if (res.data.errors) {
                    let errors = res.data.errors;
                    document.querySelector(`#${errors[0].param}`).textContent = errors[0].msg;
                    return
                }
                if (res.data.status === "TB000") {
                    setRedirect(true);
                } else {
                    alert(res.data.msg);
                }
            }).catch((err) => {
                toast('Something went wrong');
            });
    }

    return (redirect) ? (<Redirect to="/" />) : (
        <div className="d-flex vh-100 register">
            <div className="container my-auto">
                <form className="w-50 mx-auto px-5 py-2 border rounded shadow bg-white" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mb-3">
                        <img src={logo} height={80} />
                    </div>
                    <p className="text-center">Register</p>
                    <div className="mb-3">
                        <label htmlFor="fname">First Name</label>
                        <input className="form-control" type="text" name="fname" value={fname} placeholder="Enter First name" onChange={(e) => setFname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" className="form-control" name="lname" value={lname} placeholder="Enter Last Name" onChange={(e) => setLname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" value={password} placeholder="Enter password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                        <span className="text-danger" id="password">{ }</span>
                    </div>
                    <div className="row mb-3 mx-1">
                        <button type="submit" className="btn btn-lg btn-primary">Register</button>
                    </div>
                    <div className="d-flex justify-content-end">
                        <p>Already registered user? <Link to='/'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;