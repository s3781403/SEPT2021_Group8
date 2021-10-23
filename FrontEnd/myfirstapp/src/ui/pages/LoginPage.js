import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {login, logout} from "../../api/login";
import {Button,  Grid,  Paper, TextField} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import {Link, Redirect} from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export function NotLoggedIn() {

        const paperStyle={
            padding:20,
            height:'80vh',
            width:400,
            margin:"8px auto"
        }


        const handleLogin=()=>{
            const username=document.getElementById("usernameId").value;
            const password=document.getElementById("passwordId").value;
            login(username,password)
            console.log(username)
            console.log(password)

        }

        return (
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align={"center"} >
                        <AccountCircleIcon />

                        <h3>Sign In</h3>

                        <TextField id= "usernameId" label="Username" defaultValue="" fullWidth={true} style={{margin:10}} />


                        <TextField id= "passwordId" label="Password" defaultValue="" fullWidth={true} type={"password"} style={{margin:10}}/>


                        <Button onClick={()=>{handleLogin()}} type={"submit"} color={'primary'} variant={"contained"} style={{margin:40}}>Sign In</Button>
                        <Typography >
                           <Link to="/" >
                                Forgot Password?
                            </Link>
                        </Typography>

                        <Typography > Dont have an account ?
                            <Link to={"/register"} >
                                Sign Up
                            </Link>
                        </Typography>

                    </Grid>

                </Paper>
            </Grid>
        );

}

export function UserAccount(){

    return(
        <div>
        <h1>Order History</h1>
        <div>
    <button onClick={() => logout()}>Logout</button>
        </div>
        </div>
    );
}


function LoginPage() {

    const {user, setUser} = useContext(AppContext)

    return(
        <div>
            {user ? <Redirect to={'/'}/> : <NotLoggedIn/>}
        </div>
    )
}

export default LoginPage