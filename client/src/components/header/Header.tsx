import { useTheme } from "../../hooks"
import './styles.css'

export const Header = () => {

    const { switchTheme, theme } = useTheme()
    return (
        <header
            className={`navbar ${theme==='dark'?'nav-dark':'nav-light'}`}
        >
            <div className="container">
                <h1 style={{ color: 'white' }}>
                    Costs App
                </h1>
                <button
                    onClick={switchTheme}
                    className={`btn btn-${theme === 'dark' ? 'dark' : 'light'}`}
                >{theme === 'dark' ? 'Go light' : 'Go dark'}</button>
            </div>
        </header>
    )
}