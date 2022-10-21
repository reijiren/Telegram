const initialState = {
    data: [],
    thisUser: {},
    isLoading: false,
    isError: false,
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "GET_LIST_USER_PENDING":
            return {...state, isLoading: true};
        case "GET_LIST_USER_FULFILLED":
            return {...state, isLoading: false, isError: false, data: action.payload.data.data};
        case "GET_LIST_USER_REJECTED":
            return {...state, isLoading: false, isError: true};
        case "LOGIN_PENDING":
            return {...state, isLoading: true};
        // case "LOGIN_FULFILLED":
        //     console.log(action.payload.data.token.data);
        //     return {...state, isLoading: false, isError: false, thisUser: action.payload.data.token.data};
        case "LOGIN_REJECTED":
            return {...state, isLoading: false, isError: true};
        default:
            return state;
    }
}

export default userReducer;