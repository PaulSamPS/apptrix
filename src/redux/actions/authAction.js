import {Dispatch} from "react";
import $api, {API_URL_AUTH} from "../../http/apiLogin";
import {
    setIsLoading, setNavVisible,
    unAuth
} from "./actions";
import axios from "axios";

export const login = (name, password) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        dispatch(setNavVisible(false))
        const bodyFormData = new FormData()
        bodyFormData.append('username', name);
        bodyFormData.append('password', password);
        await $api.post('/token/',bodyFormData).then((res) => {
            localStorage.setItem("AccessToken", 'Bearer ' + res.data.access);
            localStorage.setItem("RefreshToken",res.data.refresh);
            dispatch(setNavVisible(false))
            dispatch(setIsLoading(false))
        }).catch(e => {
            dispatch(unAuth(true))
            dispatch(setIsLoading(false))
        })
    }
}

export const logout = () => {
    return (dispatch: Dispatch) => {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        dispatch(setNavVisible(false))
    }
}

export const checkAuth = () => {
        return async (dispatch: Dispatch) => {
            try {
                const bodyFormData = new FormData()
                bodyFormData.append('refresh', localStorage.getItem("RefreshToken"));
                const res = await axios.post(`${API_URL_AUTH}/token/refresh/`,bodyFormData)
                localStorage.setItem("AccessToken", 'Bearer ' + res.data.access);
            }catch (e) {
                dispatch(setNavVisible(false))
                localStorage.removeItem("AccessToken");
                localStorage.removeItem("RefreshToken");
            } finally {
                dispatch(setIsLoading(false))
            }
        }
}


