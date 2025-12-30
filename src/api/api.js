import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
const Api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

const ApiWithFormData = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "multipart/form-data",
    },
})

const token = localStorage.getItem('_mountview_token_')

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
}

// login api 
export const loginApi = (data) => Api.post('/api/user/login', data);
export const registerApi = (data) => Api.post('/api/user/register', data);
export const getProfileApi = (id) => Api.get(`/api/user/profile/${id}`);
export const updateProfileApi = (id, data) => Api.put(`/api/user/profile/${id}`, data);

//product
export const getAllProductApi = () => Api.get('/api/product/list');
export const getProductByIDApi = (id) => Api.get(`/api/product/single/${id}`);

//cart
export const addToCartApi = (data) => Api.post('/api/cart/add', data);
export const getAllCartItems = (id) => Api.get(`/api/cart/list/${id}`);
// Correct removeFromCart API to send data in axios.delete config
export const removeFromCart = (data) =>
    Api.delete('/api/cart/remove', { data, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

//password reset
export const forgotPasswordApi = (data) => Api.post('/api/user/forgot-password', data);
export const resetPasswordApi = (data) => Api.post('/api/user/reset-password', data);

//newsletter
export const subscribeNewsletterApi = (data) => Api.post('/api/newsletter/subscribe', data);
export const unsubscribeNewsletterApi = (data) => Api.post('/api/newsletter/unsubscribe', data);

//contact
export const submitContactApi = (data) => Api.post('/api/contact/submit', data);

export default Api;
