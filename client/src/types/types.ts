export interface ICost {
    text: string;
    price: number;
    date: Date | string;
    _id?: number ;
}

export interface IAlert {
    alertText: string;
    alertStatus: string
}
export interface IAlertProps {
    props: IAlert;
}

export interface ISpinnerProps {
    top: number;
    left: number;
}

export interface IcostsHeaderPrice {
    costs: ICost[]
}

export interface IcreateCost extends IBaseEffectArgs{
    cost:ICost;
}


export interface IResponseLogin{
    access_token:string;
    refresh_token:string;
    username:string;
    message:string
}

export interface IRefreshToken extends IBaseEffectArgs{
    username:string;
}

export interface IBaseEffectArgs{
    url:string;
    token:string;
}

export interface IHandleAxiosErrorPayload{
    type:string;
    createCost?:Partial<IcreateCost>;
    getCosts?:Partial<IBaseEffectArgs>;
    deleteCost?:Partial<IDeleteCost>;
    updateCost?:Partial<IUpdateCost>
}

export interface ICostsItemProps{
    cost:ICost;
    index:number
}

export interface IDeleteCost extends IBaseEffectArgs{
    id:string|number|unknown
}

export interface IUpdateCost extends IBaseEffectArgs {
    cost:ICost;
    id:string|number|unknown
}