import {
    SET_IS_LOADING,
    SET_NAV_VISIBLE,
    SET_PROJECTS,
    SET_UNAUTHORIZED,
    SET_USER,
    SET_USERS,
    SET_WORK_ITEM,
    SET_WORK_ITEMS
} from "../constants/constants";

const initialState = {
    isLoading: false,
    authErr: false,
    users: [],
    user: [],
    projects: [],
    navVisible: false,
    workItems: [],
    workItem: []
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

        case SET_WORK_ITEMS:
            return {
                ...state,
                workItems: action.payload,
                navVisible: true,
                isLoading: false
            }

        case SET_WORK_ITEM:
            return {
                ...state,
                workItem: action.payload,
                navVisible: true,
                isLoading: false
            }

        default:
            return state
    }
}

export default authReducer