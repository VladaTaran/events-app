import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import Calendar from '../Calendar/Calendar';

const AppRouter = () => (
    <Router basename={process.env.PUBLIC_URL}>
        <div>
            <SideBar />
            <main style={{position:"absolute", left: "235px", top:"70px"}}>
                <Switch>
                    <Route path="/calendar" component={Calendar} exact />
                </Switch>
            </main>
        </div>   
    </Router>
);

export default AppRouter;
