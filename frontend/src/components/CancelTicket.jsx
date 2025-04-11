import React, { useState } from 'react';

const CancelTicket = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [bookingDetails, setBookingDetails] = useState(null);
    const [error, setError] = useState('');
    const [isCancelled, setIsCancelled] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');
        setIsCancelled(false);

        // Validate PNR number
        if (!/^\d{10}$/.test(pnrNumber)) {
            setError('Please enter a valid 10-digit PNR number');
            return;
        }

        // Simulate API call with sample data
        setBookingDetails({
            pnrNumber: pnrNumber,
            trainNumber: '12345',
            trainName: 'Rajdhani Express',
            journeyDate: '2024-04-15',
            fromStation: 'Delhi (DEL)',
            toStation: 'Mumbai (BOM)',
            passengers: [
                {
                    name: 'John Doe',
                    age: 25,
                    gender: 'Male',
                    bookingStatus: 'Confirmed',
                    coach: 'B1',
                    seatNumber: '23',
                    class: '3A',
                    fare: 1200,
                },
                {
                    name: 'Jane Smith',
                    age: 22,
                    gender: 'Female',
                    bookingStatus: 'Confirmed',
                    coach: 'B1',
                    seatNumber: '24',
                    class: '3A',
                    fare: 1200,
                },
            ],
            totalFare: 2400,
            bookingDate: '2024-04-01',
            cancellationCharges: 240, // 10% of total fare
            refundAmount: 2160,
        });
    };

    const handleCancel = () => {
        // Simulate API call to cancel ticket
        setIsCancelled(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancel Ticket</h1>
                    <p className="text-lg text-gray-600">Enter PNR number to cancel your booking</p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PNR Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={pnrNumber}
                                    onChange={(e) => setPnrNumber(e.target.value)}
                                    placeholder="Enter 10-digit PNR number"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                    maxLength={10}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-gray-500">🔍</span>
                                </div>
                            </div>
                            {error && (
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            )}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Search Booking
                            </button>
                        </div>
                    </form>
                </div>

                {/* Booking Details */}
                {bookingDetails && !isCancelled && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300">
                        <div className="space-y-8">
                            {/* Journey Details */}
                            <div className="border-b pb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Journey Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{bookingDetails.trainNumber}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{bookingDetails.trainName}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                                        <p className="text-lg font-semibold text-gray-900">{bookingDetails.journeyDate}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">From/To</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {bookingDetails.fromStation} → {bookingDetails.toStation}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Details */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Passenger Details</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Passenger
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Age/Gender
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Class
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Coach/Seat
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Fare
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {bookingDetails.passengers.map((passenger, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {passenger.name}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {passenger.age} / {passenger.gender}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {passenger.class}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {passenger.coach} / {passenger.seatNumber}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            ₹{passenger.fare}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Fare Details */}
                            <div className="border-t pt-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Fare Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Total Fare</p>
                                        <p className="text-lg font-semibold text-gray-900">₹{bookingDetails.totalFare}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Cancellation Charges</p>
                                        <p className="text-lg font-semibold text-red-600">₹{bookingDetails.cancellationCharges}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Refund Amount</p>
                                        <p className="text-lg font-semibold text-green-600">₹{bookingDetails.refundAmount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cancel Button */}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleCancel}
                                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                                >
                                    Cancel Ticket
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Cancellation Confirmation */}
                {isCancelled && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300">
                        <div className="text-center space-y-6">
                            <div className="text-green-500 text-6xl mb-4">✓</div>
                            <h2 className="text-2xl font-bold text-gray-900">Ticket Cancelled Successfully</h2>
                            <p className="text-lg text-gray-600">
                                Your refund of ₹{bookingDetails.refundAmount} will be processed within 5-7 business days.
                            </p>
                            <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto">
                                <p className="text-sm text-gray-500 mb-2">Cancellation Reference Number</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    CAN-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setPnrNumber('');
                                    setBookingDetails(null);
                                    setIsCancelled(false);
                                }}
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Cancel Another Ticket
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CancelTicket; 