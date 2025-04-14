import React, { useState } from "react";
import Navbar from "./Navbar";
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';

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
    const [stationsrc, setStationsrc] = useState('');
    const [stationout, setStationout] = useState('');
    const [trains, setTrains] = useState([]);
    const [searchType, setSearchType] = useState('stations');
    const [trainNumber, setTrainNumber] = useState('');
    const [searched, setSearched] = useState(false);

    const stations = [
        { StationID: 1, StationName: 'Mumbai CST' },
        { StationID: 2, StationName: 'Delhi Junction' },
        { StationID: 3, StationName: 'Howrah' },
        { StationID: 4, StationName: 'Chennai Central' },
        { StationID: 5, StationName: 'Secunderabad' },
        { StationID: 6, StationName: 'Pune Junction' },
        { StationID: 7, StationName: 'Nagpur' },
        { StationID: 8, StationName: 'Lucknow NR' },
        { StationID: 9, StationName: 'Patna Jn' },
        { StationID: 10, StationName: 'Bhopal Jn' },
        { StationID: 11, StationName: 'Ahmedabad Jn' },
        { StationID: 12, StationName: 'Jaipur' },
        { StationID: 13, StationName: 'Coimbatore Jn' },
        { StationID: 14, StationName: 'Trivandrum Central' },
        { StationID: 15, StationName: 'Ranchi' },
        { StationID: 16, StationName: 'Guwahati' },
        { StationID: 17, StationName: 'Chandigarh' },
        { StationID: 18, StationName: 'Indore' },
        { StationID: 19, StationName: 'Jabalpur' },
        { StationID: 20, StationName: 'Kanpur Central' },
        { StationID: 21, StationName: 'Visakhapatnam' },
        { StationID: 22, StationName: 'Varanasi Jn' },
        { StationID: 23, StationName: 'Bhubaneswar' },
        { StationID: 24, StationName: 'Madurai' },
        { StationID: 25, StationName: 'Amritsar Jn' },
        { StationID: 26, StationName: 'Gaya Jn' },
        { StationID: 27, StationName: 'Haridwar' },
        { StationID: 28, StationName: 'Kota Jn' },
        { StationID: 29, StationName: 'Raipur Jn' },
        { StationID: 30, StationName: 'Udaipur City' },
        { StationID: 31, StationName: 'Tirupati' },
        { StationID: 32, StationName: 'Nashik Road' },
        { StationID: 33, StationName: 'Gwalior' },
        { StationID: 34, StationName: 'Durg' },
        { StationID: 35, StationName: 'Jamshedpur' },
        { StationID: 36, StationName: 'Bilaspur' },
        { StationID: 37, StationName: 'Surat' },
        { StationID: 38, StationName: 'Meerut City' },
        { StationID: 39, StationName: 'Agra Cantt' },
        { StationID: 40, StationName: 'Aligarh' },
        { StationID: 41, StationName: 'Panipat' },
        { StationID: 42, StationName: 'Ludhiana' },
        { StationID: 43, StationName: 'Jodhpur' },
        { StationID: 44, StationName: 'Baroda' },
        { StationID: 45, StationName: 'Dhanbad' },
        { StationID: 46, StationName: 'Rourkela' },
        { StationID: 47, StationName: 'Kharagpur' },
        { StationID: 48, StationName: 'Jhansi Jn' },
        { StationID: 49, StationName: 'Ajmer' },
        { StationID: 50, StationName: 'Ernakulam Jn' }
    ];

    // Fetch trains based on source and destination stations or train number
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setTrains([]);
            setSearched(true);

            let url;
            if (searchType === 'stations') {
                url = `http://localhost:3000/find-trains?stationsrc=${encodeURIComponent(stationsrc)}&stationout=${encodeURIComponent(stationout)}`;
            } else {
                url = `http://localhost:3000/find-train-by-number?trainNumber=${encodeURIComponent(trainNumber)}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setTrains(data);
        } catch (err) {
            console.error(err.message);
        }
    };

    

    

    return (
        <>

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


                <Navbar />
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
                                            value={stationsrc}
                                            onChange={(e) => setStationsrc(e.target.value)}
                                        >
                                            <option value="">Select station</option>
                                            {stations.map(station => (
                                                <option key={station.StationID} value={station.StationName}>
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
                                            value={stationout}
                                            onChange={(e) => setStationout(e.target.value)}
                                        >
                                            <option value="">Select station</option>
                                            {stations.map(station => (
                                                <option key={station.StationID} value={station.StationName}>
                                                    {station.StationName}
                                                </option>
                                            ))}
                                        </select>
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
                                        <input
                                            type="text"
                                            name="trainNumber"
                                            id="trainNumber"
                                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/90"
                                            placeholder="Enter 5-digit train number"
                                            value={trainNumber}
                                            onChange={(e) => setTrainNumber(e.target.value)}
                                        />
                                    </div>
                                    {/* Date */}


                                </div>
                            </div>
                        )}

                        {/* Search Button */}
                        <div className="flex justify-center mt-6">
                            <button
                                className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition shadow-lg hover:shadow-xl"
                                onClick={handleSearch}
                            >
                                Search Trains
                            </button>
                        </div>
                    </div>

                    {/* Train Results Table */}
                    {trains.length > 0 ? (
                        <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                            <h2 className="text-2xl font-bold text-blue-700 mb-4">Available Trains</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {trains.map((train) => (
                                            <tr key={train.TrainID} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{train.TrainNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.TrainName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.SourceStation}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.DestinationStation}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.DepartureTime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.ArrivalTime}</td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : searched && (
                        <div className="mt-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 text-center">
                            <h2 className="text-2xl font-bold text-gray-700 mb-2">No Trains Available</h2>
                            <p className="text-gray-500">Please try different stations or check back later.</p>
                        </div>
                    )}

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
                                href="/my-bookings"
                            />
                            <DashboardCard
                                title="Route Status"
                                description="Find out the busiest routes."
                                href="/busy-routes"
                            />
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default HomePage;