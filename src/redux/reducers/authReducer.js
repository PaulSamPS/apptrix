const initialState = {
    token: '',
    isAuth: false,
    refresh: '',
    isLoading: false,
    login: '',
    authErr: false
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

        default:
            return state
    }
}

export default authReducer