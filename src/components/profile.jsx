import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated, logout } from '../utils/auth';

const Profile = () => {
    const { token } = isAuthenticated();
    const { username, firstName, lastName, _id } = isAuthenticated().user;

    const [profileData, setProfileData] = useState({
        followers: 0,
        following: 0
    });

    const getcountProfile = () => {
        axios.post(`${process.env.REACT_APP_LIVE}/api/count`, {
            id: _id
        }, {
            headers: {'x-access-token':token}
        }).then((res)=>{
            console.log(res);
            setProfileData({
                ...profileData,
                followers: res.data.followers,
                following: res.data.following
            })
        }).catch((err)=>{
            toast('Somthing went wrong');
        });
    }

    useEffect(()=>{
        getcountProfile();
    }, []);

    return (
        <div className="border-bottom text-center pb-4 post">
            <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="profile" className="img-lg rounded-circle mb-3" />
            <div className="mb-3">
                <h3>@{username}</h3>
                <div className="d-flex align-items-center justify-content-center">
                    <h5 className="mb-0 mr-2 text-muted">{firstName + ' ' + lastName}</h5>
                    <div className="br-wrapper br-theme-css-stars"><select id="profile-rating" name="rating" autocomplete="off" style={{ display: "none" }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select><div className="br-widget"><a href="#" data-rating-value="1" data-rating-text="1" className="br-selected br-current"></a><a href="#" data-rating-value="2" data-rating-text="2"></a><a href="#" data-rating-value="3" data-rating-text="3"></a><a href="#" data-rating-value="4" data-rating-text="4"></a><a href="#" data-rating-value="5" data-rating-text="5"></a></div></div>
                </div>
            </div>
            <div className="d-flex justify-content-center mb-2">
                <Link to="/home" className="text-muted me-2">{profileData.following} Following</Link>
                <Link to="/home" className="text-muted">{profileData.followers} Follower</Link>
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/" className="logout">
                    <button onClick={() => {
                        logout();
                    }} className="btn btn-danger me-2">

                        <i class="fas fa-sign-out-alt me-1"></i>Logout
            </button>
                </Link>

            </div>
        </div>
    )
}

export default Profile;