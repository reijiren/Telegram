import axios from "axios";

export const getRecipe = (title, token, handleSuccess) => ({
    type: 'GET_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/detail/${title}`, {
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

export const addRecipe = (form, token, handleSuccess) => ({
    type: 'ADD_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/recipe/add`, form, {
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

export const updateRecipe = (form, token, title, handleSuccess) => ({
    type: 'UPDATE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/recipe/${title}`, form, {
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

export const updateImage = (form, token, title, handleSuccess) => ({
    type: 'UPDATE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.put(`${process.env.REACT_APP_BACKEND_URL}/recipe/${title}/changeimg`, form, {
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

export const deleteRecipe = (title, token, handleSuccess) => ({
    type: 'DELETE_RECIPE',
    payload: new Promise((resolve, reject) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_URL}/recipe/${title}`, {
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
export const getListRecipe = (title, sort, page, asc, token) => {
    return{
        type: 'GET_LIST_RECIPE',
        payload: axios({
            url: `${process.env.REACT_APP_BACKEND_URL}/recipe?title=${title}&sort=${sort}&page=${page}&asc=${asc}`,
            method: 'GET',
            // headers: { token: token },
        }),
    }
}