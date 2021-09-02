import React from "react";
import {
    Button,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel, Link,
    Paper,
    TextField
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";



function MyLogin()
{
        const paperStyle={
            padding:20,
            height:'80vh',
            width:400,
            margin:"8px auto"
        }

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

        const allstyle={
            margin: "30px 0"
        }

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
           <Grid>
               <Paper elevation={10} style={paperStyle}>
                   <Grid align={"center"} >
                      <AccountCircleIcon />

                       <h3>Sign In</h3>
                       <TextField autoComplete={false} label="Username" defaultValue="" fullWidth={true} />


                       <FormControl fullWidth={true} style={allstyle}>
                           <InputLabel htmlFor="standard-adornment-password">Password </InputLabel>
                           <Input autoComplete={false}
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

                       <Button type={"submit"} color={'primary'} variant={"contained"} style={{margin:40}}>Sign In</Button>
                       <Typography >
                           <Link href="#" >
                               Forgot Password?
                           </Link>
                       </Typography>

                       <Typography > Dont have an account ?
                           <Link href= "/register" >
                               Sign Up
                           </Link>
                       </Typography>



                   </Grid>

               </Paper>
           </Grid>
        );

}
export default MyLogin;