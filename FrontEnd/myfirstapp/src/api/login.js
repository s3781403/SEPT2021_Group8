import axios from "axios";


const LOGGEDIN_USER_KEY = "logged_in_user";

export const refreshAccessToken = async () => {
    if (getUser().accessToken === "expired") {
        //get new access token refreshToken.
    }
}

export const saveUser = (user) => {
    localStorage.setItem('logged_in_user', JSON.stringify(user))}

export const getUser = () => {

    const potentialUser =  localStorage.getItem(LOGGEDIN_USER_KEY)
    if (!potentialUser) return null
    else return JSON.parse(potentialUser)
}

export const login = async (username, password) => {
    // API call
    const loginURL = 'http://localhost:8080/api/users/login'
    const res= (await axios.post(loginURL, {username, password})).data
if(res.success) {
    const loggedInUser = {name: username,
        type: "admin",
        accessToken: res.token,
        refreshToken: "refreshToken"}
    saveUser(loggedInUser)
    window.location.reload()
}
}

const currentUser = async () => {
    return getUser()
}

const removeUser = () => localStorage.removeItem(LOGGEDIN_USER_KEY)

export const logout = async () => {
    if (!(await currentUser())) {
        throw new Error("no user is logged in")
    } else {
        removeUser()
    }
    window.location.reload()
}
