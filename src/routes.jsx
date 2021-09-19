import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Follow from './pages/Follow';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateTweet from './pages/Post';
import Register from './pages/Register';
import PrivateRoute from './utils/privateRoute';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/create" exact component={CreateTweet} />
                <PrivateRoute path="/suggestions" exact component={Follow} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router;