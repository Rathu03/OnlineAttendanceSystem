import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import StudentLogin from './components/StudentLogin'
import StaffLogin from './components/StaffLogin'
import AdminLogin from './components/AdminLogin'
import StudentRegister from './components/StudentRegister'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='student-login' element={<StudentLogin />}/>
        <Route path='staff-login' element={<StaffLogin />}/>
        <Route path='admin-login' element={<AdminLogin />}/>
        <Route path='student-register' element={<StudentRegister />}/>
      </Routes>
    </Router>
  )
}

export default App