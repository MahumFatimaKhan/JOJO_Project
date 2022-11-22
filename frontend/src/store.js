// import { createStore, combineReducers, applyMiddleware } from "redux"
// import thunk from "redux-thunk"
// import { composeWithDevTools } from "redux-devtools-extension"
// import { productDetailsReducer, productReducer } from "./reducers/ProductReducer"
// import { UserReducer } from "./reducers/UserReducer"

// const reducer = combineReducers({
//     products: productReducer,
//     productDetails: productDetailsReducer,
//     user: UserReducer
// })

// let initialState = {}

// const middleware = [thunk]

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middleware))
// )

// export default store