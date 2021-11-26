import {Dispatch} from "react";
import $api, {API_URL_AUTH} from "../../http";
import {setAuth, setIsLoading, setRefreshToken, setToken, unAuth} from "./actions";
import axios from "axios";

export const login = (name, password) => {
    return (dispatch: Dispatch) => {
        const bodyFormData = new FormData()
        bodyFormData.append('username', name);
        bodyFormData.append('password', password);
        $api.post('/token/',bodyFormData).then((res) => {
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
    return (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        const bodyFormData = new FormData()
        bodyFormData.append('refresh', localStorage.getItem("RefreshToken"));
        axios.post(`${API_URL_AUTH}/token/refresh/`,bodyFormData).then((res) => {
            localStorage.setItem("AccessToken", 'Bearer ' + res.data.access);
            dispatch(setToken(res.data.access));
            dispatch(setAuth(true));
            dispatch(setIsLoading(false))
        }).catch(e => {
            localStorage.removeItem("AccessToken");
            localStorage.removeItem("RefreshToken");
            localStorage.removeItem("RefreshToken");
            dispatch(setToken(''));
            dispatch(setRefreshToken(''));
            dispatch(setAuth(false));
            dispatch(setIsLoading(false))
        })
    }
}
