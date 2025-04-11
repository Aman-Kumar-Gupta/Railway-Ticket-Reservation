import './App.css'
import LoginPage from './components/LoginPage'
import UserDashboard from './components/UserDashboard';
import SignupPage from './components/SignupPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/SignupPage" element={<SignupPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );

}

export default App
