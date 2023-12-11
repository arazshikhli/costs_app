import { ICost } from "../../types/types"
import { CostItem } from "./CostsItem/CostItem"

export const CostsList=({costs}:{costs:ICost[]})=>{
    return (
        <ul>
            {costs.map((cost)=><CostItem
             cost={cost} index={Number(cost._id)} key={Number(cost._id)}/>)}
        </ul>
    )
}