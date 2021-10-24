import axios from "axios";

const ORDER_API_URL='http://localhost:8082/api'

//create order
const createOrder = async (orderData,cartId) => {

    const getUrl = `${ORDER_API_URL}/carts/cart/${cartId}/createOrder`
    return (await axios.post(getUrl, orderData,{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }})).data

}


//get all order
const getAllOrders = async () => {
    const getUrl = `${ORDER_API_URL}/admin/getAllOrders`
    return (await axios.get(getUrl)).data
}

//get order by userid
const getOrderByUserID = async (userId) => {
    const getUrl = `${ORDER_API_URL}/orders/getAll?userid=${userId}`
    return (await axios.get(getUrl)).data
}

//update order status
const updateOrder = async (orderId, status) => {
    const updateUrl = `${ORDER_API_URL}/orders/update?orderid=${orderId}`
    const updateResult = await axios.put(updateUrl, status,{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }});
    return updateResult.data
}

//delete order
const deleteOrder = async (id) => {
    const deleteUrl = `${ORDER_API_URL}/orders/delete/${id}`
    return (await axios.delete(deleteUrl)).data
}

//create cart

const createCart = async (userId) => {

    const getUrl = `${ORDER_API_URL}/carts/create`
    return (await axios.post(getUrl, userId,{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }})).data

}

//add item to cart
const addItem = async (bookId,quantity) => {

    const getUrl = `${ORDER_API_URL}/carts/cart/${cartId}/addItem`
    return (await axios.post(getUrl, { "bookID": bookId,
        "quantity": quantity},{headers: {
            "Accept": "*/*",
            "Access-Control-Allow-Origin": "*"
        }})).data

}

//delete item from cart
const deleteItem = async (id) => {
    const deleteUrl = `${ORDER_API_URL}/item/delete/${id}`
    return (await axios.delete(deleteUrl)).data
}

//delete cart
const deleteCart = async (id) => {
    const deleteUrl = `${ORDER_API_URL}/carts/delete/${id}`
    return (await axios.delete(deleteUrl)).data
}
 export {createOrder,getOrderByUserID,getAllOrders,deleteOrder,deleteItem,deleteCart,updateOrder,addItem,createCart}
