import axios from "axios";

const roleRequestURL = "http://localhost:8080/api/rolerequests"
const usersURL = "http://localhost:8080/api/users"
//http://localhost:8080/api/rolerequests/getAll?column=all
export const getAllRoleRequests = async () => {
    const getUrl = `${roleRequestURL}/getAll?column=all`
    console.log(getUrl)
    const requestsData = (await axios.get(getUrl)).data
    console.log("🤷‍♀️",requestsData)
    const finalData = requestsData.map(async requestData=>{
        let userInfo = await getUserByID(requestData.userID);
        let output = {...userInfo, ...requestData};
        console.log(output)
        return output
    })
    return Promise.all(finalData)
    // [Promise<>, Promise<>, Promise<>, ] -> [{}, {}, {}]
}

export const getUserByID = async (id) => {
    const getURL = `http://localhost:8080/api/users/user/${id}`
    return (await axios.get(getURL)).data
}

export const createRoleRequest = async (roleData) => {
    const getByIDUrl = `${roleRequestURL}/create`
    return (await axios.post(getByIDUrl, roleData)).data
}

export const rejectRoleRequest = async (id) => {
    const rejectURL = `${roleRequestURL}/delete/${id}`
    console.log("🗑: ", rejectURL, " -- http://localhost:8080/api/rolerequests/delete/9")
    return (await axios.delete(rejectURL)).data
}

export const deleteUser = async (id) => {
    const deleteURL = `${usersURL}/delete/${id}`
    return (await axios.delete(deleteURL)).data
}

export const getAllUsers = async ()=>{
    const getUrl = `${usersURL}/getAll?column=all`
    return  (await axios.get(getUrl)).data
}

export const approveRoleRequest = async (id) => {

    const getByIDUrl = `${roleRequestURL}/approve/${id}`
    return (await axios.put(getByIDUrl, "")).data

}



