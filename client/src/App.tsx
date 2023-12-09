import React from 'react';
import { Header } from './components/header/Header';
import { Authpage } from './components/AuthPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { $auth, setAuth } from './context/auth';
import { $alert, setAlert } from './context/alert';
import { Alert } from './components/Alert/Alert';
import { CostsPage } from './components/CostsPage/CostsPage';
function App() {

  const [isAuth, authFn] = useUnit([$auth, setAuth]);
  const isLogedIn = false
  const [alert, alertFn] = useUnit([$alert, setAlert]);
  
  console.log(isAuth)
  return (
    <><Header />
    {alert.alertText.length&& <Alert props={alert}/>}
      <Routes>
        <Route path='/' element={
          isAuth ? (<Navigate to='/costs' />) : (<Authpage type='registration' />)
        } />
        <Route path='/login' element={<Authpage type='login' />} />
        <Route path='/registration' element={<Authpage type='registration' />
        } />
        <Route path='/costs' element={<CostsPage/>} />
      </Routes>
    
    </>
  );
}

export default App;
