import {SET_IS_LOADING, SET_NAV_VISIBLE, SET_UNAUTHORIZED} from "../constants/constants";

export const setIsLoading = (loading) => ({type: SET_IS_LOADING, payload: loading})
export const setNavVisible = (visible) => ({type: SET_NAV_VISIBLE, payload: visible})
export const unAuth = (auth) => ({type: SET_UNAUTHORIZED, payload: auth})
