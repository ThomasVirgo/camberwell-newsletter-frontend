import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/accounts'

async function signup(payload) {
    // const payload = {email, password, first_name, last_name} ---- for reference
    const {data, error} = await axios.post(`${BASE_URL}/signup/`, payload)
    return data
}

async function passwordReset(payload) {
    // payload = {email: ''}
    try {
        const {data, error} = await axios.post(`${BASE_URL}/password/reset/`, payload)
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function passwordResetVerify(payload) {
    // payload = {code: '', password: ''}
    try {
        const {data, error} = await axios.post(`${BASE_URL}/password/reset/verified/`, payload)
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function changePassword(payload, token) {
    // payload = {password: ''}
    try {
        const {data, error} = await axios.post(`${BASE_URL}/password/change/`, payload, {
            headers: tokenHeader(token)
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function verify(code) {
    try {
        const {data} = await axios.get(`${BASE_URL}/signup/verify/?code=${code}`)
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function login(payload){
    try {
        const {data} = await axios.post(`${BASE_URL}/login/`, payload)
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function getUser(token){
    try {
        const {data} = await axios.get(`${BASE_URL}/users/me/`, {
            headers: tokenHeader(token)
        })
        return [data, false]
    } catch (error) {
        return [error.response, true]
    }
}

async function logout(){
    try {
        const {data} = await axios.get(`${BASE_URL}/logout`, {
            headers: tokenHeader()
        })
        return data
    } catch (error) {
        console.log('unable to logout');
    }
}

function tokenHeader(token=false){
    if (!token){
        return { "Authorization": `Token ${localStorage.getItem('token')}` }
    }
    return {
        "Authorization": `Token ${token}`
    }
}


export { signup, verify, login, logout, getUser, passwordReset, passwordResetVerify, changePassword }