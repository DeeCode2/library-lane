import { Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './config/AuthContext';
import './App.css'

//COMPONENT IMPORTS
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import SignIn from './components/SignIn';
import NewLocation from './components/NewLocation';
import ProtectedRoute from './config/ProtectedRoute';

function App() {
  
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Gallery />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/newlocation' element={<ProtectedRoute><NewLocation /></ProtectedRoute>} />
      </Routes>
      
    </AuthContextProvider>
  )
}

export default App
