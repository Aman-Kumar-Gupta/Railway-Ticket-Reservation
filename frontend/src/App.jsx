import './App.css'
import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage';
import ListPassengers from './components/ListPassengers';
import Navbar from './components/Navbar';
import BookTicket from './components/BookTicket';
import PNRStatus from './components/PNRStatus';
import SeatAvailability from './components/SeatAvailability';
import CancelTicket from './components/CancelTicket';
import MyBookings from './components/MyBookings';
import ManageTrains from './components/ManageTrains';
import ManageStations from './components/ManageStations';
import ReportsAndInsights from './components/ReportsAndInsights';
import UserProfile from './components/UserProfile';
import BusyRoutes from './components/BusyRoutes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Analytics from './components/Analytics';

function App() {
  return (
    <Router>
      <div className="app">
        {/* <Navbar /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={ <HomePage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/ListPassengers" element={<ListPassengers />} />
            <Route path="/book-ticket" element={<><Navbar /><BookTicket /></>} />
            <Route path="/pnr-status" element={<><Navbar /><PNRStatus /></>} />
            <Route path="/seat-availability" element={<><Navbar /><SeatAvailability /></>} />
            <Route path="/cancel-ticket" element={<><Navbar /><CancelTicket /></>} />
            <Route path="/my-bookings" element={<><Navbar /><MyBookings /></>} />
            <Route path="/manage-trains" element={<><Navbar /><ManageTrains /></>} />
            <Route path="/manage-stations" element={<><Navbar /><ManageStations /></>} />
            <Route path="/reports" element={<><Navbar /><ReportsAndInsights /></>} />
            <Route path="/user-profile" element={<><Navbar /><UserProfile /></>} />
            <Route path="/busy-routes" element={<><Navbar /><BusyRoutes /></>} />
            {/* <Route path="/passenger-list" element={<><Navbar /><PassengerList /></>} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App
