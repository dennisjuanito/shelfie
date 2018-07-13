import {HashRouter as Router , Switch, Route} from 'react-router-dom';
import React from "react";
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';
import App from "./App.js";


const router = (
   
        <Switch>
            <Route  exact path="/" component={App} />
            <Route path="/add" component={Form} />
        </Switch>
  );


export default router;