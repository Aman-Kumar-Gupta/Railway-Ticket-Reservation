import React, { useState } from 'react';

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedBooking, setSelectedBooking] = useState(null);

    // Sample bookings data
    const bookings = {
        upcoming: [
            {
                pnr: '1234567890',
                trainNumber: '12345',
                trainName: 'Rajdhani Express',
                journeyDate: '2024-04-15',
                fromStation: 'Delhi (DEL)',
                toStation: 'Mumbai (BOM)',
                class: '3A',
                status: 'Confirmed',
                passengers: 2,
                totalFare: 2400,
            },
            {
                pnr: '0987654321',
                trainNumber: '54321',
                trainName: 'Shatabdi Express',
                journeyDate: '2024-04-20',
                fromStation: 'Mumbai (BOM)',
                toStation: 'Ahmedabad (ADI)',
                class: 'CC',
                status: 'Confirmed',
                passengers: 1,
                totalFare: 1200,
            },
        ],
        past: [
            {
                pnr: '1122334455',
                trainNumber: '67890',
                trainName: 'Duronto Express',
                journeyDate: '2024-03-01',
                fromStation: 'Chennai (MAS)',
                toStation: 'Bangalore (SBC)',
                class: '2A',
                status: 'Completed',
                passengers: 1,
                totalFare: 1500,
            },
            {
                pnr: '5566778899',
                trainNumber: '98765',
                trainName: 'Garib Rath',
                journeyDate: '2024-02-15',
                fromStation: 'Kolkata (HWH)',
                toStation: 'Delhi (DEL)',
                class: 'SL',
                status: 'Completed',
                passengers: 3,
                totalFare: 1800,
            },
        ],
    };

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

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`${activeTab === 'upcoming'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Upcoming Journeys
                            </button>
                            <button
                                onClick={() => setActiveTab('past')}
                                className={`${activeTab === 'past'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Past Journeys
                            </button>
                        </nav>
                    </div>

                    {/* Bookings List */}
                    <div className="mt-8">
                        {bookings[activeTab].map((booking) => (
                            <div
                                key={booking.pnr}
                                className="bg-gray-50 rounded-xl p-6 mb-6 hover:shadow-md transition-shadow"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">PNR Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{booking.pnr}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {booking.trainName} ({booking.trainNumber})
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Journey</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {booking.fromStation} → {booking.toStation}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Status</p>
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                booking.status
                                            )}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between items-center">
                                    <div className="text-sm text-gray-500">
                                        <p>Date: {booking.journeyDate}</p>
                                        <p>Class: {booking.class} | Passengers: {booking.passengers}</p>
                                        <p>Total Fare: ₹{booking.totalFare}</p>
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
                                                    // Handle download ticket
                                                }}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                            >
                                                Download Ticket
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
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
                                        <p className="text-lg font-semibold text-gray-900">{selectedBooking.pnr}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedBooking.trainName} ({selectedBooking.trainNumber})
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Journey</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedBooking.fromStation} → {selectedBooking.toStation}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Date & Class</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedBooking.journeyDate} | {selectedBooking.class}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            selectedBooking.status
                                        )}`}
                                    >
                                        {selectedBooking.status}
                                    </span>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Fare Details</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        Total Fare: ₹{selectedBooking.totalFare}
                                    </p>
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