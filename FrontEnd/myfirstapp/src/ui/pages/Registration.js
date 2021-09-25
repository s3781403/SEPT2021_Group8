import React, {useState} from 'react';
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
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {useHistory} from "react-router";


function RegistrationPage() {
    {
        const paperStyle = {
            padding: 20,
            width: 500,
            margin: "20px auto"
        }


        const API_URL = "http://localhost:8080/api/users/";


        const history = useHistory();

        const registerUser = async () => {
            const fullName = document.getElementById("textFullName").value;
            const address = document.getElementById("textAddress").value;
            const role = document.getElementById("textRole").value;
            const username = document.getElementById("textEmail").value;
            const phoneNumber = document.getElementById("textPhone").value;
            const confirmPassword = document.getElementById("textPassword").value;
            const password = confirmPassword;

            try {
                const res = await axios.post(API_URL + "register", {
                        username,
                        fullName,
                        password,
                        confirmPassword,
                        role,
                        phoneNumber,
                        address,

                    },
                    {
                        headers: {
                            "Accept": "*/*",
                            "Access-Control-Allow-Origin": "*"
                        }
                    });
                history.push("/")
            } catch (e) {
                alert("Registration unsuccessful")
            }


        }

        const [values, setValues] = React.useState({
            password: '',
            showPassword: false,
        });

        const [roles, setRoles] = useState();


        const handleChange = (prop) => (event) => {
            setValues({...values, [prop]: event.target.value});
        };

        const handleClickShowPassword = () => {
            setValues({...values, showPassword: !values.showPassword});
        };

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
        };


        return (
            <Grid align={"center"}>
                <Paper elevation={16} style={paperStyle}>
                    <Grid align={"center"} style={{marginLeft: 5, marginRight: 5}}>
                        <AccountCircleIcon style={{padding: "auto"}}/>

                        <h3>Create An Account</h3>

                        <TextField required id="textFullName" label="Full Name" style={{margin: 10, width: "10"}}/>

                        <TextField required id="textAddress" label="Address" style={{margin: 10}}/>
                        <TextField required id="textEmail" label="Email" style={{margin: 10}}/>

                        <TextField required id="textPhone" label="Phone number" style={{margin: 10}}/>

                        <TextField required id="textRole" label="Role" style={{margin: 10}} onChange={(e) => {
                            setRoles(e.target.value)
                        }}/>


                        {roles === "seller" ?
                            <TextField required id="textABN" label="ABN" style={{margin: 10}}/> : null}


                        <FormControl style={{margin: '5px'}}>
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
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl style={{margin: 5}}>
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
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br></br>

                        <Button onClick={() => {
                            registerUser()

                        }} variant="contained" style={{margin: 30, padding: 10}}>Register</Button>


                    </Grid>

                </Paper>
            </Grid>
        );

    }

}

export default RegistrationPage