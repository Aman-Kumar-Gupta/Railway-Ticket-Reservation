import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo2.webp';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin] = useState(false); // This should be set based on user role
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Add logout logic here
        navigate('/LoginPage');
    };

    const NavItem = ({ to, children }) => (
        <Link to={to} className="px-3 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200">
            {children}
        </Link>
    );

    const MobileNavItem = ({ to, children }) => (
        <Link to={to} className="block px-3 py-2 rounded-md hover:bg-indigo-800 transition-colors duration-200">
            {children}
        </Link>
    );

    return (
        <nav className="bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <img
                        src={logo}
                        alt="Indian Railways Logo"
                        className="h-9 w-auto object-contain mr-0"
                    />
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-xl font-bold hover:text-indigo-200 transition-colors duration-200">
                            Indian Railways
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* Main Navigation */}
                        <div className="flex space-x-1">
                            <NavItem to="/">Home</NavItem>
                            <NavItem to="/book-ticket">Book Ticket</NavItem>
                            <NavItem to="/my-bookings">My Bookings</NavItem>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex space-x-1 border-l border-indigo-700 pl-3">
                            <NavItem to="/pnr-status">PNR Status</NavItem>
                            <NavItem to="/seat-availability">Availability</NavItem>
                            <NavItem to="/cancel-ticket">Ticket Cancellation</NavItem>
                        </div>

                        {/* Admin Section */}
                        {isAdmin && (
                            <div className="flex space-x-1 border-l border-indigo-700 pl-3">
                                <NavItem to="/manage-trains">Trains</NavItem>
                                <NavItem to="/manage-stations">Stations</NavItem>
                                <NavItem to="/reports">Reports</NavItem>
                            </div>
                        )}

                        {/* Auth Section */}
                        <div className="flex space-x-1 border-l border-indigo-700 pl-3">
                            <NavItem to="/analytics">Analytics</NavItem>
                            <NavItem to="/ListPassengers">Passenger</NavItem>
                            <NavItem to="/busy-routes">Busy</NavItem>

                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-800 focus:outline-none transition-colors duration-200"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                    {/* Main Navigation */}
                    <div className="space-y-1">
                        <MobileNavItem to="/">Home</MobileNavItem>
                        <MobileNavItem to="/book-ticket">Book Ticket</MobileNavItem>
                        <MobileNavItem to="/my-bookings">My Bookings</MobileNavItem>
                    </div>

                    {/* Quick Actions */}
                    <div className="border-t border-indigo-700 pt-2 mt-2 space-y-1">
                        <MobileNavItem to="/pnr-status">PNR Status</MobileNavItem>
                        <MobileNavItem to="/seat-availability">Seat Availability</MobileNavItem>
                        <MobileNavItem to="/cancel-ticket">Cancel Ticket</MobileNavItem>
                    </div>

                    {/* Admin Section */}
                    {isAdmin && (
                        <div className="border-t border-indigo-700 pt-2 mt-2 space-y-1">
                            <MobileNavItem to="/manage-trains">Manage Trains</MobileNavItem>
                            <MobileNavItem to="/manage-stations">Manage Stations</MobileNavItem>
                            <MobileNavItem to="/reports">Reports & Insights</MobileNavItem>
                        </div>
                    )}

                    {/* Auth Section */}
                    <div className="border-t border-indigo-700 pt-2 mt-2 space-y-1">
                        <MobileNavItem to="/analtyics">Analytics</MobileNavItem>
                        <MobileNavItem to="/ListPassenger">Passenger</MobileNavItem>
                        <MobileNavItem to="/busy-routes">Busy</MobileNavItem>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 