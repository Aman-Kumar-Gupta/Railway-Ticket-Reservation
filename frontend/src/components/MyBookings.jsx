import React, { useState, useEffect } from 'react';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState({ upcoming: [], past: [] });
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [userId, setUserId] = useState(""); // State to hold the userID input
    const [token] = useState("242734"); // Example token, you can adjust as needed



    useEffect(() => {

        const dev = localStorage.getItem('p_id');
        setUserId(dev);
        if (!userId) return; // Don't fetch if no userID is entered

        const fetchBookings = async () => {
            try {
                const res = await fetch(`http://localhost:3000/users/bookings/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();
                console.log("Fetched Data:", data);

                const today = new Date();
                const upcoming = [];
                const past = [];

                data.forEach(booking => {
                    const journeyDate = new Date(booking.JourneyDate);
                    if (journeyDate >= today) {
                        upcoming.push(booking);
                    } else {
                        past.push(booking);
                    }
                });

                setBookings({ upcoming, past });
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [userId, token]); // Run when userId or token changes

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseDetails = () => {
        setSelectedBooking(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
                    <p className="text-lg text-gray-600">View and manage your train bookings</p>
                </div>

                {/* User ID Input Box */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                        className="border border-gray-300 px-4 py-2 rounded-md w-1/4 mx-auto"
                    />
                    <button
                        onClick={() => setUserId(userId)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
                    >
                        Fetch Bookings
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {['upcoming', 'past'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tab === 'upcoming' ? 'Upcoming Journeys' : 'Past Journeys'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Bookings List */}
                    <div className="mt-8">
                        {bookings[activeTab].length === 0 ? (
                            <p className="text-center text-gray-500">No bookings found.</p>
                        ) : (
                            bookings[activeTab].map((booking) => (
                                <div
                                    key={booking.TicketID}
                                    className="bg-gray-50 rounded-xl p-6 mb-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">PNR Number</p>
                                            <p className="text-lg font-semibold text-gray-900">{booking.PNRNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {booking.TrainName} ({booking.TrainNumber})
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Journey</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {booking.FromStation} → {booking.ToStation}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Status</p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    booking.BookingStatus
                                                )}`}
                                            >
                                                {booking.BookingStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            <p>Date: {new Date(booking.JourneyDate).toLocaleDateString()}</p>
                                            <p>Class: {booking.ClassType} | Fare: ₹{booking.FareAmount}</p>
                                        </div>
                                        <div className="space-x-4">
                                            <button
                                                onClick={() => handleViewDetails(booking)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            {activeTab === 'upcoming' && (
                                                <button
                                                    onClick={() => {
                                                        // Download or cancel logic
                                                    }}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Download Ticket
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Booking Details Modal */}
                {selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                                <button
                                    onClick={handleCloseDetails}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">PNR Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{selectedBooking.PNRNumber}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedBooking.TrainName} ({selectedBooking.TrainNumber})
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            selectedBooking.BookingStatus
                                        )}`}
                                    >
                                        {selectedBooking.BookingStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
