import axios from "axios";

export const login = (body, handleSuccess) => ({
    type: "LOGIN",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, body)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const register = (body, handleSuccess) => ({
    type: "REGISTER",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
        .then((res) => {
            handleSuccess(res);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const selectReceiver = (id) => ({
    type: "SELECT_RECEIVER",
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`)
        .then((res) => {
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const findUser = (body, handleSuccess) => ({
    type: "FIND_USER",
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/find`, body)
        .then((res) => {
            handleSuccess(res.data);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const updateUser = (body, handleSuccess) => ({
    type: "UPDATE",
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/user/update/${body.id_user}`, body)
        .then((res) => {
            handleSuccess(res.data);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const updateUserImg = (id, body, handleSuccess) => ({
    type: "UPDATE_IMG",
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/photo/${id}`, body)
        .then((res) => {
            handleSuccess(res.data);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const resetUser = () => {
    return {
        type: "RESET_USER",
    }
}