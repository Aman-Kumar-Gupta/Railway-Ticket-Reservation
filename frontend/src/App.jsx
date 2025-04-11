import './App.css'
import LoginPage from './components/LoginPage'
import UserDashboard from './components/UserDashboard';
import SignupPage from './components/SignupPage';
import Navbar from './components/Navbar';
import BookTicket from './components/BookTicket';
import PNRStatus from './components/PNRStatus';
import TrainSchedule from './components/TrainSchedule';
import SeatAvailability from './components/SeatAvailability';
import CancelTicket from './components/CancelTicket';
import MyBookings from './components/MyBookings';
import ManageTrains from './components/ManageTrains';
import ManageStations from './components/ManageStations';
import ReportsAndInsights from './components/ReportsAndInsights';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        {/* <Navbar /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={ <UserDashboard />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignupPage" element={<SignupPage />} />
            <Route path="/book-ticket" element={<><Navbar /><BookTicket /></>} />
            <Route path="/pnr-status" element={<><Navbar /><PNRStatus /></>} />
            <Route path="/train-schedule" element={<><Navbar /><TrainSchedule /></>} />
            <Route path="/seat-availability" element={<><Navbar /><SeatAvailability /></>} />
            <Route path="/cancel-ticket" element={<><Navbar /><CancelTicket /></>} />
            <Route path="/my-bookings" element={<><Navbar /><MyBookings /></>} />
            <Route path="/manage-trains" element={<><Navbar /><ManageTrains /></>} />
            <Route path="/manage-stations" element={<><Navbar /><ManageStations /></>} />
            <Route path="/reports" element={<><Navbar /><ReportsAndInsights /></>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
