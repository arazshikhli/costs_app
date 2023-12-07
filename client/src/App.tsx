import React from 'react';
import { Header } from './components/header/Header';
import { Authpage } from './components/AuthPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const isLogedIn = false
  return (
    <><Header />
      <Routes>
        <Route path='/' element={
          isLogedIn ? (<Navigate to='/costs' />) : (<Authpage type='registration'/>)
        } />
        <Route path='/login' element={<Authpage type='login' />} />
        <Route path='/registration' element={
          isLogedIn ? (<Navigate to={'/costs'} />) : (<Navigate to={'/registration'} />)
        } />
        <Route path='/costs' element={<h1>Costs</h1>} />
      </Routes>

    </>
  );
}

export default App;
