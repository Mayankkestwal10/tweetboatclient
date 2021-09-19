import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Navbar from './navbar';
import Profile from './profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Base = ({ props, children }) => {

    return (
        <div>
            <ToastContainer />
            <Link to="/create" class="float logout">
                <i class="fas fa-pen-alt my-float"></i>
            </Link>
            <Navbar />
            <div className="row mx-0">

                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 order-2 order-xs-2 order-sm-2 order-md-2 order-lg-1 order-xl-1 float-left" style={{ position: "relative", top: "80px" }}>
                    {children}
                </div>
                <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 order-1 order-xs-1 order-sm-1 order-md-1 order-lg-2 order-xl-2 float-right" style={{ position: "relative", top: "80px" }}>
                    <Profile />
                </div>
            </div>
        </div>
    )

}

export default Base;
