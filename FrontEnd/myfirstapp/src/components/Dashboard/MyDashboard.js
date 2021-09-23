import React, { useState, useEffect } from 'react';
import {Button, ButtonGroup} from "@material-ui/core";
import "../MyDashboard.css";
import {Link, useHistory} from "react-router-dom";



function AdminDashboard()
{
    const history = useHistory();

    // const routeChange = () =>{
    //     let path = 'addBook';
    //     history.push(path);
    // }


      return(
          <div className="Persons">
                <div className="container">
                      <div className="row">
                            <div className="col-md-12">
                                <br/>
                                <h1 className="display-4 text-center">Admin Dashboard</h1>

                                  <hr />
                                <div className={"handleButtonsgroup"}>
                                    <Button >
                                        Account
                                        <br/>
                                        Edit your Details
                                    </Button>
                                    <Button>Order
                                        <br/>Track or Return</Button>
                                    <Button>Summaries</Button>
                                    <Button>Add Sellers</Button>
                                    <Button>Manage Sellers</Button>
                                    <Button>Manage Users</Button>
                                    <Button onClick={() =>{
                                        history.push('addBook');
                                    }}>Add Books</Button>
                                    <Button onClick={() =>{
                                        history.push('editBook');
                                    }}>Manage Books</Button>
                                    <Button onClick={() =>{
                                        history.push('deleteBook');
                                    }}>Delete Books</Button>

                            </div>
                      </div>
                </div>
          </div>
          </div>

      );

}
export default AdminDashboard;