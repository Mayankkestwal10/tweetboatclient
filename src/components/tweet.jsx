import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Tweet = (props) => {


    return (
        <div className="card rounded p-3 mb-3" key={props.key}>
            <div className="card-header">
                <b className="">{props.firstName+' '+props.lastName}</b><span className="ms-2 text-muted">{props.username}</span><span className="ms-2 text-muted">.</span><span className="ms-2 text-muted">{moment(props.time).format("MMM Do YY")}</span>
            </div>
            <div className="card-body">
                <p className="tweet">{props.description}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <div>
                    <i class="far fa-thumbs-up"></i>
                    <span className="ms-1">{props.likes}</span>
                </div>
                <div>
                    <i class="far fa-comment"></i>
                    <span className="ms-1">{props.comments}</span>
                </div>
                <div>
                    <i class="fas fa-retweet"></i>
                    <span className="ms-1">{props.retweets}</span>
                </div>
                <div>
                    <i class="fas fa-share"></i>
                    <span className="ms-1">{props.shares}</span>
                </div>
            </div>
        </div>
    )
}

export default Tweet;