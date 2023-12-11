import {createDomain} from 'effector';

const auth=createDomain()
const username=createDomain()
export const setAuth=auth.createEvent<boolean>()
export const setUsername=username.createEvent<string>()
export const $auth=auth.createStore<boolean>(false).
on(setAuth,(_, value)=>value)

export const $username=username.createStore<string>('')
.on(setUsername,(_,value)=>value)