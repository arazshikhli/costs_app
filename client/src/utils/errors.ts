
import { AxiosError } from 'axios'
import {ICost, IHandleAxiosErrorPayload} from '../types/types'
import { getAuthDataFromLS, handleAlertMessage } from './auth';
import { deleteCostsFx, getCostsFx, refreshTokenFx, updateCostFx } from '../Api/costsClient';
import { setCosts, updateCost } from '../context';
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
                        

                        case 'delete':
                            await deleteCostsFx({
                                url:'/costs',
                                token:authData.access_token,
                                id:payload.deleteCost?.id as string
                            })
                        break;
                        case 'update':
                           const updatedCost= await updateCostFx({
                                url:'/costs',
                                token:authData.access_token,
                                cost:{...payloadData.updateCost?.cost} as ICost,
                                id:payload.updateCost?.id as string
                            })
                            if(!updatedCost){
                               return 
                            }
                            updateCost(updatedCost)
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