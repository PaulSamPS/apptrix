import {Dispatch} from "react";
import {setIsLoading} from "./actions";
import {SET_PROJECTS, SET_WORK_ITEM, SET_WORK_ITEMS} from "../constants/constants";
import $apiProjects from "../../http/ApiProjects";


export const getProjects = () => {
    return async (dispatch: Dispatch) => {
       dispatch(setIsLoading(true))
       const res = await $apiProjects.get(`/issues?fields=id,summary,project(name)`)
       dispatch(setProjects(res.data))

    }
}

export const getWorkItems = (projectId) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        const res = await $apiProjects.get(`/issues/${projectId}/timeTracking/workItems`)
        dispatch(setWorkItems(res.data))
    }
}

export const getWorkItem = (projectId,timesheet) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true))
        const res = await $apiProjects.get(`/issues/${projectId}/timeTracking/workItems/${timesheet}?fields=author(id,name),duration(presentation)`)
        dispatch(setWorkItem(res.data))
    }
}

export const setProjects = (projects) => ({type: SET_PROJECTS, payload: projects})
export const setWorkItems = (project) => ({type: SET_WORK_ITEMS, payload: project})
export const setWorkItem = (project) => ({type: SET_WORK_ITEM, payload: project})
