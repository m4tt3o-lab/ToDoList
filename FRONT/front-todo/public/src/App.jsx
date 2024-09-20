import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ToDoList from './pages/ToDo.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/Login' />} />
        <Route path='/Login' element={<LoginPage />} />
        <Route path="/TaskList" element={<ToDoList />} />
        <Route path='/Register' element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;