import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { categoryReducer } from "./Reducers/CategoryReducer"

const reducer = combineReducers({
    categories: categoryReducer
})

let initialState = {}
const middleware = [thunk]
const Store = createStore(reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default Store