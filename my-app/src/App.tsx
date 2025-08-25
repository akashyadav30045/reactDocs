import {  Navigate,Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Login from './pages/Login';

// import ProtectedRoutes from './pages/ProtectedRoutes';
import Signup from './pages/Signup';

function App() {  
  return (
   <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        {/* <Route path='/home' element={<PrivateRoute element={<Home />} />} /> */}
      </Routes>
  );
}

export default App;
