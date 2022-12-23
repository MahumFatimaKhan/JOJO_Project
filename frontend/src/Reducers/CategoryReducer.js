import {
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    CLEAR_ERRORS
} from "../Constants/CategoryConstants"

export const categoryReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case ALL_CATEGORY_REQUEST:
            return {
                categories: []
            }
        case ALL_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.payload
            }
        case ALL_CATEGORY_FAIL:
            return {
                error: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
}
