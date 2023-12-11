import { useEffect, useState } from "react"
import { CostsHeader } from "./Header/CostsHeader"
import './style.css';
import { getCostsFx } from '../../Api/costsClient'
import { Spinner } from "../Spinner/Spinner";
import { getAuthDataFromLS } from "../../utils/auth";
import { $costs, setCosts } from "../../context";
import { useUnit } from "effector-react";
import { CostsList } from "./CostsList";
export const CostsPage = () => {

    const [spinner, setSpinner] = useState(false)
    const [store, storeFn] = useUnit([$costs, setCosts]);


    useEffect(() => {
        handleGetCosts()
    }, [])

    const handleGetCosts = async () => {
        setSpinner(true);
        const authData = getAuthDataFromLS();
        const costs = await getCostsFx({
            url: '/costs', token: authData.access_token
        })
        setSpinner(false)
        setCosts(costs)
    }
    return (

        <div className="container">
            <h2
                style={{ textAlign: 'center', marginBottom: '30px' }}
            >Учет моих расходов</h2>
            <CostsHeader costs={[]} />
            <div style={{ position: 'relative' }}>
                {spinner && <Spinner top={0} left={0} />}
            </div>
            {/* <CostsList costs={costs}/> */}
        </div>
    )
}