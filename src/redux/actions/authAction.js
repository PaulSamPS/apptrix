import {Dispatch} from "react";
import $api, {API_URL_AUTH} from "../../http/apiAuth";
import {setAuth, setDb, setIsLoading, setItem, setRefreshToken, setToken, unAuth} from "./actions";
import axios from "axios";
import $apiDb from "../../http/apiUsers";

export const login = (name, password) => {
    return async (dispatch: Dispatch) => {
        const bodyFormData = new FormData()
        bodyFormData.append('username', name);
        bodyFormData.append('password', password);
        await $api.post('/token/',bodyFormData).then((res) => {
            localStorage.setItem("AccessToken", 'Bearer ' + res.data.access);
            localStorage.setItem("RefreshToken",res.data.refresh);
            dispatch(setToken(res.data.access));
            dispatch(setRefreshToken(res.data.refresh));
            dispatch(setAuth(true));
        }).catch(e => {
            dispatch(unAuth(true))
        })
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        try {
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("RefreshToken");
            dispatch(setToken(''));
            dispatch(setRefreshToken(''));
            dispatch(setAuth(false));
        }
        catch (e) {
            throw e
        }
    }
}

export const checkAuth = () => {
    return async (dispatch: Dispatch) => {
        const bodyFormData = new FormData()
        bodyFormData.append('refresh', localStorage.getItem("RefreshToken"));
        await axios.post(`${API_URL_AUTH}/token/refresh/`,bodyFormData).then((res) => {
            localStorage.setItem("AccessToken", 'Bearer ' + res.data.access);
            dispatch(setToken(res.data.access));
            dispatch(setAuth(true));
        }).catch(e => {
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("RefreshToken");
            localStorage.removeItem("RefreshToken");
            dispatch(setToken(''));
            dispatch(setRefreshToken(''));
            dispatch(setAuth(false));
        })
    }
}

export const getDb = () => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        $apiDb.get('/users/?fields=id,login,name,email').then((res) => {
            dispatch(setDb(res.data))
        })
    }
}

export const getItem = (userId) => {
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        $apiDb.get(`/users/${userId}?fields=id,login,name,email`).then((res) => {
            dispatch(setItem(res.data))
        })
    }
}

