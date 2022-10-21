import axios from "axios";

export const register = (form, handleSuccess) => ({
    type: 'REGISTER',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, form)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const login = (form, handleSuccess) => ({
    type: 'LOGIN',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, form)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const getDetailUser = (email, handleSuccess) => ({
    type: 'GET_DETAIL_USER',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/detail/${email}`)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const changePass = (form, handleSuccess) => ({
    type: 'CHANGE_PASSWORD',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user`, form)
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const changeImg = (form, email, token, handleSuccess) => ({
    type: 'CHANGE_PASSWORD',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/${email}/changeimg`, form, {
            headers: {
                token: token,
            }
        })
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

export const deleteUser = (email, token, handleSuccess) => ({
    type: 'DELETE_USER',
    payload: new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/user/${email}`, {
            headers: {
                token: token,
            }
        })
        .then((res) => {
            handleSuccess(res)
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        })
    }),
})

// dengan reducer
export const getList = (name, sort, page, asc, token) => {
    return{
        type: 'GET_LIST_USER',
        payload: axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/user?name=${name}&sort=${sort}&page=${page}&asc=${asc}`,
            method: 'GET',
            // headers: { token: token },
        }),
    }
}

export const getUser = (email, token) => {
    return{
        type: 'GET_LIST_USER',
        payload: axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/user/detail/${email}`,
            method: 'GET',
            // headers: { token: token },
        }),
    }
}