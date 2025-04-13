import React, { useEffect, useState } from "react";
import logo from '../assets/logo2.webp';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";


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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchType, setSearchType] = useState('stations');
    const [date, setDate] = useState('');
    const [trainNumber, setTrainNumber] = useState('');
    const [searched, setSearched] = useState(false);

    const stations = [
        { StationID: 1, StationName: 'Mumbai Central' },
        { StationID: 2, StationName: 'Delhi Junction' },
        { StationID: 3, StationName: 'Chennai Central' },
        { StationID: 4, StationName: 'Howrah Junction' },
        { StationID: 5, StationName: 'Bangalore City' },
        { StationID: 6, StationName: 'Secunderabad Junction' },
        { StationID: 7, StationName: 'Ahmedabad Junction' },
        { StationID: 8, StationName: 'Pune Junction' },
        { StationID: 9, StationName: 'Jaipur Junction' },
        { StationID: 10, StationName: 'Lucknow Junction' },
        { StationID: 11, StationName: 'Patna Junction' },
        { StationID: 12, StationName: 'Bhubaneswar Junction' },
        { StationID: 13, StationName: 'Thiruvananthapuram Central' },
        { StationID: 14, StationName: 'Guwahati Junction' },
        { StationID: 15, StationName: 'Amritsar Junction' }
    ];

    // Fetch trains based on source and destination stations or train number
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setTrains([]);
        setSearched(true);

        try {
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
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const generatePDF = (train) => {
        const doc = new jsPDF();

        // Add logo or header
        doc.setFontSize(20);
        doc.text('Indian Railways', 105, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text('E-Ticket / Journey Details', 105, 30, { align: 'center' });

        // Add ticket details
        doc.setFontSize(10);
        const ticketDetails = [
            ['PNR Number', Math.random().toString(36).substring(2, 10).toUpperCase()],
            ['Train Number', train.TrainNumber],
            ['Train Name', train.TrainName],
            ['From', train.SourceStation],
            ['To', train.DestinationStation],
            ['Departure', train.DepartureTime],
            ['Arrival', train.ArrivalTime],
            ['Date', new Date().toLocaleDateString()],
            ['Class', 'General'],
            ['Fare', '₹500']
        ];

        // Add passenger details table
        doc.autoTable({
            startY: 50,
            head: [['Ticket Details', '']],
            body: ticketDetails,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
            styles: { cellPadding: 5 }
        });

        // Add terms and conditions
        doc.setFontSize(8);
        doc.text('Terms and Conditions:', 14, doc.autoTable.previous.finalY + 20);
        doc.text('1. This is a computer generated ticket and does not require any signature.', 14, doc.autoTable.previous.finalY + 30);
        doc.text('2. Please carry a valid ID proof while traveling.', 14, doc.autoTable.previous.finalY + 35);
        doc.text('3. Boarding point will be closed 5 minutes before departure.', 14, doc.autoTable.previous.finalY + 40);

        // Save the PDF
        doc.save(`ticket-${train.TrainNumber}.pdf`);
    };

    const handleDownloadTicket = (train) => {
        generatePDF(train);
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {trains.map((train) => (
                                            <tr key={train.TrainID} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{train.TrainNumber}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.TrainName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.DepartureTime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.ArrivalTime}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button
                                                        onClick={() => handleDownloadTicket(train)}
                                                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 flex items-center gap-2"
                                                    >
                                                        <FaDownload />
                                                        Download Ticket
                                                    </button>
                                                </td>
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
                                href="/LoginPage"
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