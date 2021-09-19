import React, { useEffect, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../components/loader';
import Navbar from '../components/navbar';
import Tweet from '../components/tweet';
import '../assets/css/Home.css';
import { isAuthenticated, logout } from '../utils/auth';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Base from '../components/base';
import Profile from '../components/profile';
import { toast } from 'react-toastify';
import Tabs from '../components/tab';

const Home = () => {

    const [totalTweets, setTotalTweets] = useState([]);

    const [state, setState] = useState({
        items: []
    });
    const [count, setCount] = useState(0);
    const [more, setMore] = useState(false);

    const { token } = isAuthenticated();
    const { _id } = isAuthenticated().user;



    const [loading, setLoading] = useState(true);

    const fetchData = () => {
        axios.get(`${process.env.REACT_APP_LIVE}/api/tweet/feed/${_id}`, {
            headers: { 'x-access-token': token }
        }).then((res) => {
            if(res.data.tweets.length!=0){
                setMore(true);
            }
            setTotalTweets(res.data.tweets);
            setState({
                ...state,
                items: res.data.tweets.slice(count, count + 5)
            });
            setCount(count + 5);
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }).catch((err) => {
            toast('Something went wrong');
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchMoreData = () => {
        if (state.items.length == totalTweets.length) {
            setMore(false);
            return;
        }
        setTimeout(() => {
            setState({
                items: state.items.concat(totalTweets.slice(count, count + 5))
            });
            setCount(count + 5);
        }, 2000);
    }

    return (loading) ? (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <Loader />
        </div>
    ) : (
        <Base>
            <Tabs />
            <div className="post" id="scrollableDiv"
                style={{
                    height: 520,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                <InfiniteScroll
                    dataLength={state.items.length}
                    next={fetchMoreData}
                    hasMore={more}
                    height={520}
                    loader={<div className="d-flex justify-content-center p-3"><Loader /></div>}
                    scrollableTarget="scrollableDiv"
                    endMessage={
                        <p style={{ textAlign: 'center' }} className="mt-2">
                            <b>No tweets available</b>
                        </p>
                    }
                >
                    {state.items.map((item, index) => (
                        <Tweet key={item.user} firstName={item.firstName}
                            lastName={item.lastName} username={item.username} time={item.createdAt}
                            description={item.description} likes={item.likesCount} comments={item.commentsCount}
                            shares={item.sharesCount} retweets={item.retweetsCount} />
                    ))}
                </InfiniteScroll>
            </div>
        </Base>
    )
}

export default Home;