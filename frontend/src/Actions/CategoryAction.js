import axios, { Axios } from "axios"

import {
    ALL_CATEGORY_FAIL,
    ALL_CATEGORY_REQUEST,
    ALL_CATEGORY_SUCCESS,
    CLEAR_ERRORS
} from "../Constants/CategoryConstants"

export const getCategories = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CATEGORY_REQUEST })
        await axios.get("http://localhost:3000/category/getCategories").then(response => {
            console.log("RESPONSE")
            console.log(response.data)
            dispatch({
                type: ALL_CATEGORY_SUCCESS,
                payload: response.data
            })
        })
    } catch (error) {
        dispatch({
            type: ALL_CATEGORY_FAIL,
            //payload: error.response.data.message
        })
    }
}