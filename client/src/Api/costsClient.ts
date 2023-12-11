import { createEffect } from "effector";
import { IcreateCost, IBaseEffectArgs } from '../types/types'
import {IRefreshToken} from '../types/types'
import api from './axiosClient'
import { removeUser } from "../utils/auth";
import { handleAxiosError } from "../utils/errors";


export const createCostFx = createEffect(async ({ url, cost, token }: IcreateCost) => {
    try {
        const { data } = await api.post(url, { ...cost }, { headers: { 'Authorization': `Bearer ${token}` } })
        return data;
    } catch (error) {
        console.log(error)
    }
})

export const getCostsFx = createEffect(async ({ url, token }: IBaseEffectArgs) => {
    try {
        const { data } = await api.get(url, { headers: { 'Authorization': `Bearer ${token}` } })
        return data;
    } catch (error) {
        handleAxiosError(error,{type:'get'})
    }
})

export const refreshTokenFx=createEffect(async ({
    url,token,username
}:IRefreshToken)=>{
try {
    const result=await api.post(url,{refresh_token:token,username})
    if(result.status===200){
        localStorage.setItem('auth',JSON.stringify(
            {
                ...result.data,
                username
            }
        ))
        return result.data
    }
    else{
        removeUser()
    }

} catch (error) {
    
}
})