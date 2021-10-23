import axios from "axios";
import {createRoleRequest, getUserByID} from "./users";


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
    const token = res.token
    const jwt = token.split('Bearer ')[1]
    const tokenInfo = parseJwt(jwt)

    const userInfo = await getUserByID(tokenInfo.id)
    const loggedInUser = {name: username,
        type: "admin",
        accessToken: res.token,
        refreshToken: "refreshToken", tokenInfo, userInfo}
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

export const registerUserAPI = async (data) => {
    const API_URL = "http://localhost:8080/api/users/";
    const res = (await axios.post(API_URL + "register", data,
        {
            headers: {
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            }
        })).data;
    if(data.role!=="Customer")
    {
        await createRoleRequest({

            "userID": res.id,
            "roleRequested": res.role
        })
    }
    return "done"
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
