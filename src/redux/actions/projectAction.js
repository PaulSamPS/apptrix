import {Dispatch} from "react";
import {setIsLoading} from "./actions";
import $apiTasks from "../../http/ApiProjects";
import {SET_PROJECTS} from "../constants/constants";


export const getProjects = () => {
    return async (dispatch: Dispatch) => {
       dispatch(setIsLoading(true))
       const res = await $apiTasks.get(`/issues?fields=id,summary,project(name)`)
       dispatch(setProjects(res.data))

    }
}

export const setProjects = (tasks) => ({type: SET_PROJECTS, payload: tasks})
