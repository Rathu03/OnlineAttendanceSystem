import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import StudentLogin from './components/StudentLogin'
import StaffLogin from './components/StaffLogin'
import AdminLogin from './components/AdminLogin'
import StudentRegister from './components/StudentRegister'
import StudentDashboard from './components/StudentDashboard'
import StaffRegister from './components/StaffRegister'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='student-login' element={<StudentLogin />}/>
        <Route path='staff-login' element={<StaffLogin />}/>
        <Route path='admin-login' element={<AdminLogin />}/>
        <Route path='student-register' element={<StudentRegister />}/>
        <Route path='staff-register' element={<StaffRegister />}/>
        <Route path='student-dashboard' element={<StudentDashboard />} />
      </Routes>
    </Router>
  )
}

export default App