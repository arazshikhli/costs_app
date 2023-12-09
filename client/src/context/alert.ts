import { createDomain } from "effector";
import { IAlert } from "../types/types";

const error=createDomain()

export const setAlert=error.createEvent<IAlert>()

export const $alert=error.createStore<IAlert>({
    alertText:'',alertStatus:''
}).on(setAlert,(_,value)=>value)