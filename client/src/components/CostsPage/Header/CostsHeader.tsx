import './style.css'
import { MutableRefObject, useRef, useEffect, useState } from 'react'
import { Spinner } from '../../Spinner/Spinner'
import { IcostsHeaderPrice } from '../../../types/types';
import { countTotalPrice } from '../../../utils/arrayUtils'
import { $totalPrice, createCost, setTotalPrice } from '../../../context';
import { useUnit } from 'effector-react';
import { validationInputs } from '../../../utils/validation';
import { getAuthDataFromLS, handleAlertMessage } from '../../../utils/auth';
import { createCostFx } from '../../../Api/costsClient';
export const CostsHeader = ({ costs }: IcostsHeaderPrice) => {

    const [spinner, setSpinner] = useState(false)
    const [price, priceFn] = useUnit([$totalPrice, setTotalPrice]);
    const textRef = useRef() as MutableRefObject<HTMLInputElement>
    const priceRef = useRef() as MutableRefObject<HTMLInputElement>
    const dateRef = useRef() as MutableRefObject<HTMLInputElement>

    const handleAddCost = () => {

    }
    useEffect(() => {
        countTotalPrice(costs)
    }, [costs])

    const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSpinner(true);


        const textInputValue = textRef.current.value;
        const priceInputValue = priceRef.current.value;
        const dateInputValue = dateRef.current.value;

        if (!validationInputs(textRef, priceRef, dateRef)) {
            setSpinner(false)
            return
        }
        const authData = getAuthDataFromLS()
        const cost = await createCostFx({
            url: '/costs',
            cost: {
                text: textInputValue,
                price: parseInt(priceInputValue),
                date: dateInputValue
            },
            token: authData.access_token
        });
        if (!cost) {
            setSpinner(false)
            return;
        }
        setSpinner(false);
        createCost(cost)
        handleAlertMessage({
            alertText: 'Успешно создано', alertStatus: 'success'
        })
    }
    return (
        <div className="costs-header">
            <form className='d-flex mb-3'
                onSubmit={formSubmit}
            >
                <div className='form-item'>
                    <span className='mb-3'>Куда было потрачено</span>
                    <input
                        ref={textRef}
                        type="text" className='form-control' />
                </div>

                <div className='form-item'>
                    <span className='mb-3'>Сколько было потрачено</span>
                    <input
                        ref={priceRef}
                        type="text" className='form-control' />
                </div>

                <div className='form-item'>
                    <span className='mb-3'>Дата расхода</span>
                    <input
                        ref={dateRef}
                        type="date" className='form-control' />
                </div>
                <button
                    type='submit'
                    className="btn btn-primary add-btn"
                >{spinner ? <Spinner
                    top={5} left={50} /> : 'Добавить'}</button>
            </form>
            <div
                style={{
                    textAlign: 'end',
                    marginBottom: '10px'
                }}
            >
                Итого:
                <span> {
                    isNaN(parseInt(String(price))) ? 0 : parseInt(String(price))
                }</span>
            </div>
        </div>
    )
}