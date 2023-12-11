
import {ISpinnerProps} from '../../types/types'
import './style.css'
export const Spinner=({top,left}:ISpinnerProps)=>{
   return(
    <div
    style={{top:`${top}px`,left:`${left}px`}}
    className="spinner-border main-spinner"
    role="status"
    > 
    </div>
   )
}