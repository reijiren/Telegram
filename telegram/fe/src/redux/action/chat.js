import axios from "axios";

export const allChat = (id, handleSuccess) => ({
    type: "FETCH_CHAT_LIST",
    payload: new Promise((resolve, reject) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/chat/${id}`)
        .then((res) => {
            handleSuccess(res.data);
            resolve(res);
        })
        .catch((err) => {
            reject(err);
        });
    }),
})

export const setChat = (data) => ({
    type: "SET",
    payload: data,
})

export const reset = () => {
    return {
        type: "RESET",
    }
}