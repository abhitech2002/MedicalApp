import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinners from './components/Spinners';
import ProtectRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

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