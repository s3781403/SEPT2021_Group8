import React, {Component, useEffect, useState} from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/MyLogin";
import MyHeader from "./components/Layout/Myheader";
import BooksDisplay from "./components/Layout/BooksDisplay";
import Registration from "./components/UserManagement/Registration";


function App()  {

    const [user,setUser]=useState(null)

    useEffect(() => {
        setTimeout(() => {
            setUser({name: "Shrestha"})
        }, 10_000)
    }, [])

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <MyHeader user={user} />
            {
              //Public Routes
            }


           <Switch>


               <Route exact path="/" component={BooksDisplay} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login} />
           </Switch>
            {
              //Private Routes
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addPerson" component={AddPerson} />
          
          </div>
        </Router>
      </Provider>
    );

}
export default App;