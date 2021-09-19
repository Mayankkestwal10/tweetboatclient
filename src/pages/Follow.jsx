import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Base from '../components/base';
import Loader from '../components/loader';
import Tabs from '../components/tab';
import { isAuthenticated } from '../utils/auth';

const Follow = () => {

    const [list, setList] = useState([]);
    const { token } = isAuthenticated();
    const { _id } = isAuthenticated().user;
    const [loading, setLoading] = useState(true);

    const fetchListToFollow = () => {
        axios.get(`${process.env.REACT_APP_LIVE}/api/followers/${_id}`, {
            headers: { "x-access-token": token }
        }).then((res) => {
            setList(res.data.users);
            setLoading(false);
        }).catch((err) => {
            toast('Something went wrong');
        });
    }

    useEffect(() => {
        fetchListToFollow();
    }, []);

    const onClickFollow = (to_id, to_username) => {
        axios.post(`${process.env.REACT_APP_LIVE}/api/follow`, {
            _id: _id,
            to_id: to_id,
            to_username: to_username
        }, {
            headers: { 'x-access-token': token }
        }).then(res => {
            toast(res.data.message);
            document.querySelector(`#${to_id}`).textContent = 'Following';
        }).catch(err => {
            toast('Something went wrong');
        });
    }


    return (loading) ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <Loader />
        </div>
    ) : (
        <Base>
            <Tabs />
            <div class="list-group">
                {list.map(item => {
                    if (item._id !== _id) {
                        return (
                            <a href="/suggestions" class="list-group-item list-group-item-action" aria-current="true">

                                <div class="d-flex w-100 justify-content-between">

                                    <h5 class="mb-1">{item.firstName + ' ' + item.lastName}</h5>
                                    <small>Followers - {item.followersCount}</small>
                                    <small>Following - {item.followingCount}</small>
                                </div>
                                <button className="btn btn-primary" id={item._id} onClick={() => onClickFollow(item._id, item.username)}>Follow</button>
                            </a>
                        )
                    }
                })}

            </div>
        </Base>
    )
}

export default Follow;