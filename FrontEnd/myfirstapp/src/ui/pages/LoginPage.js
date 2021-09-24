import {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {login, logout} from "../../api/login";

function NotLoggedIn({setUser}) {
    return <button onClick={() => login('', '')}>Login</button>
}


function LoginPage() {

    const {user, setUser} = useContext(AppContext)

    return(
        <div>
            {user ? <button onClick={() => logout()}>Logout</button> : <NotLoggedIn setUser={setUser}/>}
        </div>
    )
}

export default LoginPage