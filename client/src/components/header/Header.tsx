import { useUnit } from "effector-react"
import { useTheme } from "../../hooks"
import './styles.css';
import { setUsername, $username, $auth, setAuth } from '../../context/auth'
import { removeUser } from '../../utils/auth'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IResponseLogin } from "../../types/types";
export const Header = () => {

    const { switchTheme, theme } = useTheme()
    const [username, userfn] = useUnit([$username, setUsername]);
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const handleLogout = () => {
        removeUser()
        navigate('/login')

    }

    return (
        <header
            className={`navbar ${theme === 'dark' ? 'nav-dark' : 'nav-light'}`}
        >
            <div className="container">
                <h1 style={{ color: 'white' }}>
                    Costs App
                </h1>
                {username.length ? <h1
                    style={{ color: 'white' }}
                >{username}</h1> : ''}
                <button
                    onClick={switchTheme}
                    className={`btn btn-${theme === 'dark' ? 'dark' : 'light'}`}
                >{theme === 'dark' ? 'Go light' : 'Go dark'}</button>
                {username && <button
                    onClick={handleLogout}
                    className="btn btn-light"
                >Выйти</button>}
            </div>
        </header>
    )
}