import './style.css'
import { ICostsItemProps } from '../../../types/types'

export const CostItem = ({ cost, index }: ICostsItemProps) => {
    return <li
        id={String(cost._id)}
        className='
    cost-item 
    list-group-item 
    d-flex justify-content-between
    align-items-center
'>
        <div className='cost-item-left'>
            <span> {index} Магазин</span>
            <span> "{cost.text}"</span>
            <span className='cost-date'>Дата {cost.date as string}</span>
        </div>
        <div className='cost-item-right
         d-flex align-items-center'>
            <span> Сумма: {cost.price}</span>
            <button className='btn btn-primary btn-edit'>Изменить</button>
            <button className='btn btn-danger btn-delete'><span>&times;</span></button>
        </div>
    </li>
}