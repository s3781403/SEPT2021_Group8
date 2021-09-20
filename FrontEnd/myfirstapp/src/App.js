import React, {Component, useEffect, useState} from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/MyDashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./components/UserManagement/MyLogin";
import MyHeader from "./components/Layout/Myheader";
import BooksDisplay from "./components/Layout/BooksDisplay";
import Registration from "./components/UserManagement/Registration";
import BookDetail from "./components/Layout/ProductDisplay";
import AddBook from "./components/Dashboard/AddBook";
import EditBook from "./components/Dashboard/EditBook";
import DeleteBook from "./components/Dashboard/DeleteBook";
import SearchBar from "./components/Layout/SearchBar";
import Test from "./components/Layout/Test";




function App()  {

     const [user,setUser]=useState(null)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setUser({name: "Shrestha"})
    //     }, 10_000)
    // }, [])

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
            <Route  path="/register" component={Registration} />
            <Route  path="/login" component={Login} />

            {
              //Private Routes
            }
            <Route  path="/addBook" component = {AddBook}/>
              <Route  path="/editBook" component = {EditBook}/>
              <Route  path="/deleteBook" component = {DeleteBook}/>
            <Route  path="/dashboard" component={Dashboard} />
              <Route  path="/bookDetails/:bookId" component={withRouter(BookDetail) }/>
            <Route  path="/addPerson" component={AddPerson} />
              <Route  path="/test" component={Test} />
           </Switch>

          </div>
        </Router>
      </Provider>
    );

}
export default App;