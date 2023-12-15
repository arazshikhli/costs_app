import './style.css'
import { ICostsItemProps } from '../../../types/types'
import { useState } from 'react'
import { getAuthDataFromLS, handleAlertMessage } from '../../../utils/auth';
import { deleteCostsFx } from '../../../Api/costsClient';
import { removeCost } from '../../../context';
import { Spinner } from '../../Spinner/Spinner';
import { formatDate } from '../../../utils/arrayUtils';


export const CostItem = ({ cost, index }: ICostsItemProps) => {
    const [edit, setEdit] = useState(false)
    const [deleteSpinner, setDeleteSpinner] = useState(false);
    const [editSpinner, setEditSpinner] = useState(false);
    const [newText,setNewText]=useState(cost.text)
    const [newPrice,setNewPrice]=useState(cost.price)

    const allowEditCost = () => setEdit(true)
    const cancelEditCost = () => {
        setEdit(false)
        setEditSpinner(false)
    }
    const deleteCost = async () => {
        setDeleteSpinner(true)
        const authData = getAuthDataFromLS();
        await deleteCostsFx({
            url: '/costs',
            token: authData.access_token,
            id: cost._id
        })
        setDeleteSpinner(false)
        removeCost(cost._id as unknown as string)
        handleAlertMessage({
            alertStatus: 'success',
            alertText: 'Успешно удалено'
        })
    }


    return <li
    className="cost-item list-group-item d-flex justify-content-between align-items-center"
    // id={cost._id as string}
>
    <div className='cost-item-left'>
        <span>{index} Магазин</span>
        {edit
        ? <input
            // ref={textRef}
            // onChange={handleChangeText}
            value={newText}
            type='text'
            className="form-control cost-item__shop-input"
        /> 
        : <span> "{cost.text}"</span>}
        {edit
        ? <input
            // ref={dateRef}
            // onChange={handleChangeDate}
            // value={new Date(newDate).toISOString().split('T')[0]}
            // type='date'
            className="form-control cost-item__date-input"
        /> 
        : <span className='cost-date'>Дата {formatDate(cost.date as string)}</span>}
    </div>
    <div className='cost-item-right d-flex align-items-center'>
    {edit
        ? <input
            // ref={priceRef}
            // onChange={handleChangePrice}
            value={newPrice}
            type='text'
            className="form-control cost-item__price-input"
        /> 
        : <span style={{ marginRight: '10px' }}>Сумма {cost.price}</span>}
    {edit
        ? <div className="btn-block__inner">
            <button className="btn btn-success btn-save" >
                {editSpinner ? <Spinner top={5} left={38} /> : 'Сохранить'}
            </button>
            <button className="btn btn-danger btn-cancel" onClick={cancelEditCost}>
                Отмена
            </button>
        </div>
        : <button className="btn btn-primary btn-edit" onClick={allowEditCost}>
            Изменить
        </button>}
        <button className="btn btn-danger btn-delete" onClick={deleteCost}>
            {deleteSpinner ? <Spinner top={5} left={7} /> : <span>&times;</span>}
        </button>
    </div>
</li>
}