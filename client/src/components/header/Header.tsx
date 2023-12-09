import { useStore, useUnit } from "effector-react"
import { useTheme } from "../../hooks"
import './styles.css';
import { setUsername, $username } from '../../context/auth'

export const Header = () => {

    const { switchTheme, theme } = useTheme()
    const [username, userfn] = useUnit([$username, setUsername]);
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
            </div>
        </header>
    )
}