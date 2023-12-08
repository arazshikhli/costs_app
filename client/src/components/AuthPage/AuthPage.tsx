import { Link } from 'react-router-dom'
import './styles.css';
import axios from 'axios';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { AuthClient } from '../../Api/authClient';
import { Alert } from '../Alert/Alert'
import { IAlert } from '../../types/types';
import { Spinner } from '../Spinner/Spinner';
export const Authpage = ({ type }: { type: 'login' | 'registration' }) => {

    const navigate = useNavigate()

    const [spinner, setSpinner] = useState(false)
    const [alert, setAlert] = useState<IAlert>()
    const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
    const passwordRef = useRef() as MutableRefObject<HTMLInputElement>


    const handleLogin = async (username: string, password: string) => {
        if (!username || !password) { return }
        const result = await AuthClient.login(username, password)
        if (!result) {
            setSpinner(false)
            return
        }
        setSpinner(false)
        navigate('/costs')
        setAlert({ alertText: 'Вход выполнен', alertStatus: 'success' });


    }

    const handleRegistration = async (username: string, password: string) => {
        if (!username || !password) { return }
        const result = await AuthClient.registration(username, password)

        if (!result) {
            setSpinner(false)
            return
        }
        setSpinner(false)
        navigate('/login')
        setAlert({ alertText: 'Регистрация выполнена', alertStatus: 'success' });


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
            <h1>Auth</h1>
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
                >{spinner ? <Spinner top={5} left={2} /> : 'currentAuthTitle'}</button>
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