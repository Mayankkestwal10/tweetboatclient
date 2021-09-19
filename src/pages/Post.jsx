import React, { useEffect, useState } from 'react';
import Base from '../components/base';
import '../assets/css/Post.css';
import logo from '../assets/images/tweetboat.png';
import axios from 'axios';
import { isAuthenticated } from '../utils/auth';
import { toast } from 'react-toastify';
import Loader from '../components/loader';
import Tabs from '../components/tab';

const CreateTweet = () => {

    const [description, setDescription] = useState('');
    const { token } = isAuthenticated();
    const { username, firstName, lastName, _id } = isAuthenticated().user;
    const [loading, setLoading] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_LIVE}/api/tweet/create`, {
            firstName: firstName,
            lastName: lastName,
            username: username,
            _id: _id,
            description: description
        }, {
            headers: { 'x-access-token': token }
        }).then((res) => {
            if(res.status===200){
                setDescription('');
                toast('Tweet Added');
            }
        }).catch((err) => {
            toast('Someting went wrong');
        });
    }

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        }, 1500);
    }, []);

    return (loading) ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <Loader />
        </div>
    ):(
        <Base>
            <Tabs />
            <div className="d-flex h-100 post">
                <div className="container my-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="h-50 w-50 bg-white shadow text-center mx-auto mb-5">
                            <img src={logo} height={160} />
                        </div>
                        <div className="form-group mb-3">
                            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="form-control" placeholder="Write a tweet..." required />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-lg btn-primary" type="submit">Post</button>
                        </div>
                    </form>
                </div>
            </div>

        </Base>
    )
}

export default CreateTweet;