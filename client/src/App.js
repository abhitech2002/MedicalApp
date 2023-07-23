import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import ProtectRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Doctors from './pages/admin/Doctors';
import Profile from './pages/doctor/Profile';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
     <BrowserRouter>
     {loading ? (
      <Spinners/>
     ) : (
     <Routes>
        <Route path='/' 
        element={
        <ProtectRoute>
          <HomePage/>
        </ProtectRoute>
        }/>
        <Route path='/apply-doctor' 
        element={
        <ProtectRoute>
          <ApplyDoctor/>
        </ProtectRoute>
        }/>
        <Route path='/admin/users' 
        element={
        <ProtectRoute>
          <Users/>
        </ProtectRoute>
        }/>
        <Route path='/admin/doctors' 
        element={
        <ProtectRoute>
          <Doctors/>
        </ProtectRoute>
        }/>
        <Route path='/doctor/profile/:id' 
        element={
        <ProtectRoute>
          <Profile/>
        </ProtectRoute>
        }/>
        <Route path='/notification' 
        element={
        <ProtectRoute>
          <NotificationPage/>
        </ProtectRoute>
        }/>
        <Route path='/login' 
        element={<PublicRoute>
          <Login/>
        </PublicRoute>}/>
        <Route path='/register' 
        element={<PublicRoute>
          <Register/>
          </PublicRoute>}/>
     </Routes>
     )}
     </BrowserRouter>
    </>
  );
}

export default App;
