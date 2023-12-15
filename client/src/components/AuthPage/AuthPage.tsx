import { Link } from 'react-router-dom'
import './styles.css';
import { useState, useRef, MutableRefObject } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthClient } from '../../Api/authClient';
import { IAlert } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
import { handleAlertMessage } from '../../utils/auth';

export const Authpage = ({ type }: { type: 'login' | 'registration' }) => {

    const currentAuthTitle = type === 'login' ? 'Авторизация' : 'Регистрация'

    const handleAuthResponse = (result: boolean | undefined,
        navigatePath: string | undefined,
        alertText: string
    ) => {
        if (!result) {
            setSpinner(false)
            return
        }
        usernameRef.current.value = ''
        passwordRef.current.value = ''
        setSpinner(false)
        navigate(`/${navigatePath}`)
        handleAlertMessage({ alertText, alertStatus: 'success' })
        // setAlert({ alertText: `${alertText}`, alertStatus: 'success' });
    }
    const navigate = useNavigate()

    const [spinner, setSpinner] = useState(false)
    const [alert, setAlert] = useState<IAlert>()
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>


    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false)
            handleAlertMessage({
                alertStatus: 'warning',
                alertText: 'Заполните все поля'
            })
            return
        }
        const result = await AuthClient.login(username, password)
        if (!result) {
            setSpinner(false)
            return
        }
        handleAuthResponse(result, 'costs', 'Вход выполнен')


    }

    const handleRegistration = async (username: string, password: string) => {
        if (!username || !password) {
            setSpinner(false)
            handleAlertMessage({
                alertStatus: 'warning',
                alertText: 'Заполните все поля'
            })
            return
        }


        if (password.length < 4) {
            handleAlertMessage({
                alertText: 'Минимум 6 символов', alertStatus: 'warning'
            })
            setSpinner(false)
            return
        }
        const result = await AuthClient.registration(username, password)
        console.log(result)
        if (!result) {
            setSpinner(false)
            handleAlertMessage({
                alertText: `Message: ${result} `, alertStatus: 'warning'
            })
            return
        }

        handleAuthResponse(result, 'login', 'Регистрация выполнена')

    }

    const handleAuth = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSpinner(true)
        switch (type) {
            case 'login':
                handleLogin(
                    usernameRef.current.value,
                    passwordRef.current.value)
                break;
            case 'registration':
                handleRegistration(
                    usernameRef.current.value,
                    passwordRef.current.value)
                break;
        }
    }




    return (
        <div className="container">
            <h1>{currentAuthTitle}</h1>
            <form
                onSubmit={handleAuth}
                className="form-group">
                <label className="auth-label">
                    <input
                        type="text"
                        className="form-control"
                        ref={usernameRef}
                    />
                </label>
                <label className="auth-label">
                    <input
                        type="password"
                        className="form-control"
                        ref={passwordRef}
                    />
                </label>
                <button
                    type='submit'
                    className="btn btn-primary auth-btn"
                >{spinner ? <Spinner
                    top={5} left={50} /> : currentAuthTitle}</button>
            </form>
            {
                type === 'login' ? (<div>
                    <span className='question-text'>
                        Еще нет аккаунта?
                        <Link
                            className='link'
                            to={'/registration'}>
                            Зарегистрироваться
                        </Link>
                    </span>
                </div>) : (<div>
                    <span className='question-text'>
                        Уже есть аккаунт?
                        <Link to={'/login'}
                            className='link'>
                            Войти
                        </Link>
                    </span>
                </div>)
            }
        </div>
    )

}