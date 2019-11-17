import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import SideBar from '../SideBar/SideBar';
import Calendar from '../Calendar/Calendar';

const AppRouter = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <div>
            <SideBar />
            <main style={{position:"absolute", left: "235px", top:"70px"}}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/calendar" component={Calendar} />
                </Switch>
            </main>
        </div>   
    </Router>
);

export default AppRouter;
