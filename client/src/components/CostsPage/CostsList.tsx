import { ICost } from "../../types/types"
import { CostItem } from "./CostsItem/CostItem"

export const CostsList=({costs}:{costs:ICost[]})=>{
    return (
        <ul className="list-group">
            {costs.map((cost,index)=><CostItem
             cost={cost} index={index+1} key={index}/>)}
        </ul>
    )
}