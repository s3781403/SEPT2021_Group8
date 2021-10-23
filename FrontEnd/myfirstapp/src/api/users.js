import axios from "axios";

const roleRequestURL = "http://localhost:8080/api/rolerequests"

export const getAllRoleRequests = async () => {
    const getUrl = `${roleRequestURL}/getAll?column=all`
    const requestsData = (await axios.get(getUrl)).data
   // [{"id":4,"userID":1,"roleRequested":"Seller","create_At":null,"update_At":null},...]
    // [{"id":4,"userID":1,"roleRequested":"Seller","create_At":null,"update_At":null, "username": "ajfis3@gmail.com",
    //     "fullName": "Aaron Fisher",
    //     "role": "Seller",
    //     "password": "$2a$10$BKVoxgS.ycRJY4lEbdIrfOygMvYdlEhAqaI7Ooq387kVDsZMut4/m",
    //     "abn": null,
    //     "address": "1234 test street",
    //     "phoneNumber": "test"},...]

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


export const approveRoleRequest = async (id) => {

    //http://localhost:8080/api/rolerequests/approve/7
    const getByIDUrl = `${roleRequestURL}/approve/${id}`
    return (await axios.put(getByIDUrl, "")).data

}



