import React from 'react';
import { Header } from './components/header/Header';
import { Authpage } from './components/AuthPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useUnit } from 'effector-react';
import { $auth, setAuth } from './context/auth';
function App() {

  const [isAuth, authFn] = useUnit([$auth, setAuth]);
  const isLogedIn = false
  console.log(isAuth)
  return (
    <><Header />
      <Routes>
        <Route path='/' element={
          isLogedIn ? (<Navigate to='/costs' />) : (<Authpage type='registration' />)
        } />
        <Route path='/login' element={<Authpage type='login' />} />
        <Route path='/registration' element={<Authpage type='registration' />
        } />
        <Route path='/costs' element={<h1>Costs</h1>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
