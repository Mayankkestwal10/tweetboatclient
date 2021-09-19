import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const Tabs = () => {

    const history = useHistory();

    const currentTab = (history, path) => {
        if (history.location.pathname === path) {
            return { color: "white", background: "red" }
        } else {
            return { color: "black" }
        }
    }

    return (
        <ul class="nav nav-pills nav-fill border">
            <li class="nav-item border">
                <Link class="nav-link" aria-current="page" to="/home" style={currentTab(history, '/home')}>Home</Link>
            </li>
            <li class="nav-item border">
                <Link class="nav-link" to="/create" style={currentTab(history, '/create')}>Add Tweet</Link>
            </li>
            <li class="nav-item border">
                <Link class="nav-link" to="/suggestions" style={currentTab(history, '/suggestions')}>Suggestion</Link>
            </li>
        </ul>
    )
}

export default Tabs;