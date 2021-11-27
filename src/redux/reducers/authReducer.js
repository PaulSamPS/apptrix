const initialState = {
    token: '',
    isAuth: false,
    refresh: '',
    isLoading: false,
    login: '',
    authErr: false,
    db: [],
    item: []
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload
            }
            case 'SET_UNAUTHORIZED':
            return {
                ...state,
                authErr: action.payload
            }
        case 'SET_REFRESH_TOKEN':
            return {
                ...state,
                refresh: action.payload
            }
        case 'SET_AUTH':
            return {
                ...state,
                isAuth: action.payload
            }

        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }

        case 'SET_DB':
            return {
                ...state,
                db: action.payload,
                isLoading: false
            }

        case 'SET_ITEM':
            return {
                ...state,
                item: action.payload,
                isLoading: false
            }

        default:
            return state
    }
}

export default authReducer