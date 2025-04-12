import React, { use, useEffect, useState } from "react";
import logo from '../assets/logo2.webp';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const DashboardCard = ({ title, description, href }) => (
    <a
        href={href}
        className="p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all border border-white/20"
    >
        <h3 className="text-lg font-semibold text-blue-700 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </a>
);

const HomePage = () => {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState('stations'); // 'stations' or 'trainNumber'
    const [stations, setStations] = useState([]);
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        const fun = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch("http://localhost:3000/users/fetch", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const res = await response.json();
                setStations(res.stations);
                setTrains(res.trains);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        fun();
    }, []);

    const handleClick = async () => {

    }

    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen w-full relative">

                {/* Railway Background with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                        }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>
                </div>

                {/* Header with Branding */}
                <header className="w-full bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-sm shadow-lg relative z-10 border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">                    {/* Logo - replace '/path/to/ir-logo.png' with actual path */}
                        <img
                            src={logo}
                            alt="Indian Railways Logo"
                            className="h-9 w-auto object-contain mr-4"
                        />
                        <h1 className="text-white text-xl font-bold">Indian Railways</h1>
                        <div className="ml-auto">
                            <button className="text-white/90 hover:text-white font-semibold transition-colors hover:cursor-pointer" onClick={() => navigate('/LoginPage')}>
                                Login / Signup
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto p-4 mt-6 space-y-8 relative z-10">
                    {/* Search Section */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                        <h2 className="text-2xl font-bold text-blue-700 mb-2">
                            Search Trains
                        </h2>
                        <p className="text-gray-700 text-sm mb-6">
                            Plan your journey with confidence.
                        </p>

                        {/* Search Type Toggle */}
                        <div className="flex mb-6 border rounded-lg overflow-hidden">
                            <button
                                className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${searchType === 'stations'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => setSearchType('stations')}
                            >
                                Search by Stations
                            </button>
                            <button
                                className={`flex-1 py-2 px-4 text-center font-medium transition-colors ${searchType === 'trainNumber'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                onClick={() => setSearchType('trainNumber')}
                            >
                                Search by Train Number
                            </button>
                        </div>

                        {/* Search by Stations */}
                        {searchType === 'stations' && (
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* From Station */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-800 mb-1">
                                            From
                                        </label>
                                        <select
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                                        >
                                            <option value="">Select station</option>
                                            {stations.map(station => (
                                                <option key={station.StationID} value={station.StationID}>
                                                    {station.StationName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* To Station */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-800 mb-1">
                                            To
                                        </label>
                                        <select
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                                        >
                                            <option value="">Select station</option>
                                            {stations.map(station => (
                                                <option key={station.StationID} value={station.StationID}>
                                                    {station.StationName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Departure Date */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-800 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            defaultValue={new Date().toISOString().split('T')[0]}
                                            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Search by Train Number */}
                        {searchType === 'trainNumber' && (
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    {/* Train Number */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-800 mb-1">
                                            Train Number
                                        </label>
                                        <input type="text"  name="trainNumber" id="trainNumber" className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90" placeholder="Enter 5-digit train number" />
                                    </div>
                                    {/* Date */}
                                    <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-800 mb-1">
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            defaultValue={new Date().toISOString().split('T')[0]}
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Search Button */}
                        <div className="flex justify-center mt-6">
                            <button className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition shadow-lg hover:shadow-xl" onClick={handleClick()}>
                                Search Trains
                            </button>
                        </div>
                    </div>

                    {/* Quick Access Section */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">
                            Quick Access
                        </h2>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                            <DashboardCard
                                title="PNR Enquiry"
                                description="Check the status of your ticket using your PNR."
                                href="/pnr-status"
                            />
                            <DashboardCard
                                title="Upcoming Trips"
                                description="View and manage your booked journeys."
                                href="/LoginPage"
                            />
                            <DashboardCard
                                title="Manage Booking"
                                description="Modify or cancel your reservations."
                                href="/LoginPage"
                            />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default HomePage;