import React from "react";
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



function Registration()
{
    const paperStyle={
        padding:20,
        height:'100vh',
        width:500,
        margin:"20px auto"
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

                    <TextField  required id="standard-required" label="First Name" defaultValue="" style={{margin:10,width:"10"}}/>
                    <TextField  required id="standard-required" label="Last name" defaultValue="" style={{margin:10}}/>

                    <TextField  required id="standard-required" label="Address" defaultValue="" style={{margin:10}}/>
                    <TextField  required id="standard-required" label="Email" defaultValue="" style={{margin:10}}/>

                    <TextField  required id="standard-required" label="Phone number" defaultValue="" style={{margin:10}}/>

                    <TextField  required id="standard-required" label="ABN" defaultValue="" style={{margin:10}}/>


                    <TextField  required id="standard-required" label="Username" defaultValue="" style={{margin:10}}/>
                    <TextField  required id="standard-required" label="Role" defaultValue="" style={{margin:10}}/>


                    <FormControl style={{margin:'5px'}}>
                        <InputLabel htmlFor="standard-adornment-password">Password </InputLabel>
                        <Input
                               id="standard-adornment-password"

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
                            id="standard-adornment-password"

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

                    <Button variant="contained" style={{margin:30,padding:10}}>Register</Button>






                </Grid>

            </Paper>
        </Grid>
    );

}
export default Registration;