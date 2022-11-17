const initialState = {
    user: [],
    receiver: [],
    isLoading: false,
    isError: false,
};

export default function userReducer(state = initialState, action){
    switch(action.type){
        case "LOGIN_PENDING":
        case "REGISTER_PENDING":
        case "FIND_USER_PENDING":
        case "UPDATE_PENDING":
        case "UPDATE_IMG_PENDING":
        case "SELECT_RECEIVER_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "LOGIN_REJECTED":
        case "REGISTER_REJECTED":
        case "FIND_USER_REJECTED":
        case "UPDATE_REJECTED":
        case "UPDATE_IMG_REJECTED":
        case "SELECT_RECEIVER_REJECTED":
            return { ...state, isLoading: false, isError: true };
        case "LOGIN_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload.data.data,
                receiver: [],
            };
        case "SELECT_RECEIVER_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                receiver: action.payload.data.data,
            };
        case "UPDATE_FULFILLED":
            return {
                ...state,
                isLoading: false,
                isError: false,
                user: action.payload.data.data[0],
            }
        default:
            return state;
    }
}