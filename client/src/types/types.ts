export interface Icost {
    text: string;
    price: number;
    date: string,
    userId: string
}

export interface IAlert {
    alertText: string;
    alertStatus: string
}
export interface IAlertProps {
    props: IAlert;
}

export interface ISpinnerProps{
    top:number;
    left:number;
}