import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/tweetboat.png';
const Navbar = () => {
    return (
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link to="/home" className="navbar-brand" href="#">
                    <img src={logo} height={40} /><span>TweetBoat</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;