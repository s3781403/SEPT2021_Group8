import {getAllBooks} from "../../api/books";
import {createRoleRequest, getAllRoleRequests, getAllUsers} from "../../api/users";


test('api get role requests is working', async ()=> {
    const rolerequests = await getAllRoleRequests()
    expect(rolerequests.length).toBeGreaterThan(0)
})

test ('api get users is working.',async ()=> {
    const users = await getAllUsers()
    expect(users.length).toBeGreaterThan(0)
})

