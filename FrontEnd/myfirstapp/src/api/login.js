const user = {
    name: "Shrestha Ghosh",
    type: "admin",
    accessToken: "accessToken",
    refreshToken: "refreshToken"
}

const refreshAccessToken = async () => {
    if (getUser().accessToken === "expired") {
        //get new access token refreshToken.
    }
}

const saveUser = (user) => {
    localStorage.setItem('logged_in_user', user)
}

const getUser = () => {
    return localStorage.getItem("logged_in_user")
}

const login = async (username, password) => {
    // call the api here???

    const loggedInUser = user
    saveUser(loggedInUser)
    return loggedInUser
}

const currentUser = async () => {
    return getUser()
}

const logout = async () => {
    if (!(await currentUser())) {
        throw new Error("no user is logged in")
    } else {
        saveUser(null)
    }
}
