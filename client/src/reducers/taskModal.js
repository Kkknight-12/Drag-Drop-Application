const taskModalReducer = (state = { showModal: false }, action) => {
    switch (action.type) {
        case "SET_DATA":
            // console.log("taskModalReducer", action);
            return {
                ...state,
                modalData: action.payload,
                showModal: true,
            };
        case "CLOSE_MODAL":
            return {
                ...state,
                showModal: false,
            };
        // case "SEND_DATA":
        //     return { ...state };
        default:
            return state;
    }
};

export default taskModalReducer;
