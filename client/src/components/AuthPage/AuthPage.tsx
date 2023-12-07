import { Link } from 'react-router-dom'
import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Authpage = ({ type }: { type: 'login' | 'registration' }) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const currentAuthTitle = type === 'login' ? "Войти" : " Регистрация"
    useEffect(() => {

    }, [])
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(username)
        if (currentAuthTitle) {
            axios.post('http://localhost:5000/auth/login', { username, password }).then((data) => {
                console.log(data)
            })
        }
        axios.post('http://localhost:5000/auth/registration', { username, password }).then((data) => {
            console.log(data)
        })


    }

    return (
        <div className="container">
            <h1>{currentAuthTitle}</h1>
            <form
                onSubmit={handleSubmit}
                className="form-group">
                <label className="auth-label">
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={e => setUserName(e.target.value)}
                    />
                </label>
                <label className="auth-label">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type='submit'
                    className="btn btn-primary auth-btn"
                >{currentAuthTitle}</button>
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