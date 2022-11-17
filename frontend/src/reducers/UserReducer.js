import { LOGIN_REQUEST, LOGIN_FAIL, LOGIN_SUCCESS, CLEAR_ERRORS,
    REGISTER_USER_FAIL,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS } from "../constants/userConstants"

export const UserReducer=(state={user:{}},action) =>{
    switch (action.type) {

      case LOGIN_FAIL:
      case REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

      // case LOAD_USER_REQUEST:

        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
          return {
            loading: true,
            isAuthenticated: false,
          };


          // case LOAD_USER_SUCCESS:

        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload,
          };

        case CLEAR_ERRORS:
            return {
            ...state,
            error: null,
            };                                                   
        default:
            return state;
    }
}