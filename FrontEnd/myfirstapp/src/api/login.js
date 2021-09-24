const user = {
    name: "Shrestha Ghosh",
    type: "admin",
    accessToken: "accessToken",
    refreshToken: "refreshToken"
}

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
    // call the api here???

    const loggedInUser = user
    saveUser(loggedInUser)
    window.location.reload()
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
