export const unAuth = (auth) => ({type: 'SET_UNAUTHORIZED', payload: auth})
export const setToken = (token) => ({type: 'SET_TOKEN', payload: token})
export const setRefreshToken = (token) => ({type: 'SET_REFRESH_TOKEN', payload: token})
export const setAuth = (auth) => ({type: 'SET_AUTH', payload: auth})
export const setIsLoading = (loading) => ({type: 'SET_IS_LOADING', payload: loading})