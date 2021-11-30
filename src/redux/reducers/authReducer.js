import {
    SET_AUTH,
    SET_IS_LOADING, SET_NAV_VISIBLE, SET_PROJECTS,
    SET_REFRESH_TOKEN,
    SET_TOKEN,
    SET_UNAUTHORIZED, SET_USER,
    SET_USERS
} from "../constants/constants";

const initialState = {
    isLoading: false,
    authErr: false,
    users: [],
    user: [],
    projects: [],
    navVisible: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UNAUTHORIZED:
            return {
                ...state,
                authErr: action.payload
            }

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }

        case SET_USERS:
            return {
                ...state,
                users: action.payload,
                navVisible: true,
                isLoading: false,
                authErr: false
            }

        case SET_USER:
            return {
                ...state,
                user: action.payload,
                navVisible: true,
                isLoading: false
            }

        case SET_PROJECTS:
            return {
                ...state,
                projects: action.payload,
                navVisible: true,
                isLoading: false
            }

        case SET_NAV_VISIBLE:
            return {
                ...state,
                navVisible: false
            }

        default:
            return state
    }
}

export default authReducer