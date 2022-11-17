const initialState = {
    chat: [],
    isLoading: false,
    isError: false,
};

export default function chatReducer(state = initialState, action){
    switch(action.type){
        case "SET":
            return { ...state, isLoading: false, isError: false, chat: action.payload };
        case "RESET":
            return { ...state, isLoading: false, isError: false, chat: [] };
        case "FETCH_CHAT_LIST_PENDING":
            return { ...state, isLoading: true, isError: false };
        case "FETCH_CHAT_LIST_REJECTED":
            return { ...state, isLoading: false, isError: true };
        default:
            return state;
    }
}