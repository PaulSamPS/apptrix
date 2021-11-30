import {Dispatch} from "react";
import {setIsLoading} from "./actions";
import $apiDb from "../../http/apiUsers";
import {SET_USER, SET_USERS} from "../constants/constants";

export const getUsers = () => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        const res = await $apiDb.get('/users/?fields=id,login,name,email')
        dispatch(setUsers(res.data))
    }
}

export const getUser = (userId) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        const res = await $apiDb.get(`/users/${userId}?fields=id,login,name,email`)
        dispatch(setUser(res.data))
    }
}

export const setUsers = (data) => ({type: SET_USERS, payload: data})
export const setUser = (userId) => ({type: SET_USER, payload: userId})