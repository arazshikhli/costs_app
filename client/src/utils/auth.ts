import { IAlert } from "../types/types";
import { setAlert } from "../context/alert";
export const handleAlertMessage = (alert: IAlert) => {
    setAlert(alert)
    setTimeout(() => setAlert({ alertStatus: '', alertText: '' }), 3000)
}