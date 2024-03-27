import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import StudentLogin from './components/StudentLogin'
import StaffLogin from './components/StaffLogin'
import AdminLogin from './components/AdminLogin'
import StudentRegister from './components/StudentRegister'
import StudentDashboard from './components/StudentDashboard'
import StaffRegister from './components/StaffRegister'
import StaffDashboard from './components/StaffDashboard'
import CreateRoom from './components/CreateRoom'
import AttendanceView from './components/AttendanceView'


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
        <Route path='staff-dashboard' element={<StaffDashboard />}/>
        <Route path='create-room' element={<CreateRoom />}/>
        <Route path='staff-dashboard/attendance-view' element={<AttendanceView />}/>
      </Routes>
    </Router>
  )
}

export default App