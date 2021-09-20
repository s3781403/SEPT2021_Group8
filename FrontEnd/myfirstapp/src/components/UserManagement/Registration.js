import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    TextField
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import axios from "axios";



function Registration()
{
    const paperStyle={
        padding:20,
        width:500,
        margin:"20px auto"
    }


    const API_URL = "http://localhost:3000/api/users/";

    const registerUser=()=> {
        const fullName = document.getElementById("textFullName").value;
        const address = document.getElementById("textAddress").value;
        const role = document.getElementById("textRole").value;
        const username = document.getElementById("textEmail").value;
        const abn = document.getElementById("textABN").value;
        const phoneNumber = document.getElementById("textPhone").value;
        const confirmPassword = document.getElementById("textPassword").value;
        const password = confirmPassword;

        return axios.post(API_URL + "register",{username,fullName,password,confirmPassword,role,phoneNumber,address},
            {headers: {
                    "Accept": "*/*",
                    "Access-Control-Allow-Origin": "*"
                }});

    }

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid align={"center"} >
            <Paper elevation={16} style={paperStyle}>
                <Grid align={"center"} style={{marginLeft:5,marginRight:5}}>
                    <AccountCircleIcon style={{padding:"auto"}}/>

                    <h3>Sign Up</h3>

                    <TextField  required id="textFullName" label="Full Name" style={{margin:10,width:"10"}}/>

                    <TextField  required id="textAddress" label="Address" style={{margin:10}}/>
                    <TextField  required id="textEmail" label="Email"  style={{margin:10}}/>

                    <TextField  required id="textPhone" label="Phone number" style={{margin:10}}/>

                    <TextField  required id="textRole" label="Role"  style={{margin:10}}/>


                    <TextField  required id="textABN" label="ABN"  style={{margin:10}}/>




                    <FormControl style={{margin:'5px'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password </InputLabel>
                        <Input
                            id="textPassword"

                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}

                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl style={{margin:5}}>
                        <InputLabel htmlFor="standard-adornment-password">Retype Password </InputLabel>
                        <Input
                            id="textRePassword"

                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}

                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br></br>

                    <Button onClick={()=>{
                        registerUser()
                    }} variant="contained" style={{margin:30,padding:10}}>Register</Button>



                </Grid>

            </Paper>
        </Grid>
    );

}
export default Registration;