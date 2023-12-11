
import { AxiosError } from 'axios'
import {IHandleAxiosErrorPayload} from '../types/types'
import { getAuthDataFromLS, handleAlertMessage } from './auth';
import { getCostsFx, refreshTokenFx } from '../Api/costsClient';
import { setCosts } from '../context';
import { removeUser } from './auth';
export const handleAxiosError=async(
    error:unknown,
    payload:IHandleAxiosErrorPayload |null=null
    )=>{
        const errorMessage=
        ((error as AxiosError).response?.data as {message:String}).message||
        ((error as AxiosError).response?.data as {error:String}).error

        if(errorMessage){
            if(errorMessage==='jwt expired'){
                const payloadData=payload as IHandleAxiosErrorPayload;
                const authData=getAuthDataFromLS()
                refreshTokenFx({
                    url:'/auth/refresh',
                    token:authData.refresh_token,
                    username:authData.username
                })
                if(payload !==null){
                    switch(payloadData.type){
                        case 'get':
                            const costs=await getCostsFx({
                                url:'/costs',
                                token:authData.access_token
                            })
                            setCosts(costs)
                        break;
                    }
                }
            }
            else{
                handleAlertMessage({
                    alertText:errorMessage as string,alertStatus:'warning'
                })
                removeUser()
            }
        }
        else{
            handleAlertMessage({
                alertText:errorMessage as string,alertStatus:'warning'
            })
        }

}