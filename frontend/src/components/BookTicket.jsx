import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookTicket = () => {
    // const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    const [showPassengerForm, setShowPassengerForm] = useState(false);
    const [selectedTrain, setSelectedTrain] = useState(null);

    // Sample stations data - replace with actual API call
    const stations = [
        { id: 1, name: 'Delhi' },
        { id: 2, name: 'Mumbai' },
        { id: 3, name: 'Chennai' },
        { id: 4, name: 'Kolkata' },
        { id: 5, name: 'Bangalore' },
    ];

    const classTypes = [
        { id: 'SL', name: 'Sleeper' },
        { id: '3A', name: 'AC 3 Tier' },
        { id: '2A', name: 'AC 2 Tier' },
        { id: '1A', name: 'First Class AC' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        // Simulate API call with sample data
        setSearchResults([
            {
                id: 1,
                trainNumber: '12345',
                trainName: 'Rajdhani Express',
                departureTime: '08:00',
                arrivalTime: '20:00',
                duration: '12h',
                fare: {
                    SL: 500,
                    '3A': 1200,
                    '2A': 1800,
                    '1A': 2500,
                },
                availability: {
                    SL: 20,
                    '3A': 15,
                    '2A': 10,
                    '1A': 5,
                },
            },
            // Add more sample trains
        ]);
    };

    const handleBookNow = (train) => {
        setSelectedTrain(train);
        setShowPassengerForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Train Ticket</h1>

                {/* Search Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* From Station */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    From Station
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Select Station</option>
                                    {stations.map((station) => (
                                        <option key={station.id} value={station.id}>
                                            {station.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* To Station */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    To Station
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Select Station</option>
                                    {stations.map((station) => (
                                        <option key={station.id} value={station.id}>
                                            {station.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Journey
                                </label>
                                <input
                                    type="date"
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>

                            {/* Class Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Class Type
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {classTypes.map((classType) => (
                                        <option key={classType.id} value={classType.id}>
                                            {classType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition shadow-lg hover:shadow-xl"
                            >
                                Search Trains
                            </button>
                        </div>
                    </form>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 && !showPassengerForm && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Trains</h2>
                        <div className="space-y-4">
                            {searchResults.map((train) => (
                                <div
                                    key={train.id}
                                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="text-lg font-semibold">{train.trainName}</h3>
                                            <p className="text-gray-600">Train No: {train.trainNumber}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600">
                                                {train.departureTime} → {train.arrivalTime}
                                            </p>
                                            <p className="text-gray-600">Duration: {train.duration}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {classTypes.map((classType) => (
                                            <div
                                                key={classType.id}
                                                className="border rounded p-3 text-center"
                                            >
                                                <p className="font-medium">{classType.name}</p>
                                                <p className="text-gray-600">₹{train.fare[classType.id]}</p>
                                                <p className="text-sm text-gray-500">
                                                    Available: {train.availability[classType.id]}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button
                                            onClick={() => handleBookNow(train)}
                                            className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Passenger Details Form */}
                {showPassengerForm && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Details</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Gender
                                    </label>
                                    <select
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Concession Type
                                    </label>
                                    <select
                                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="none">No Concession</option>
                                        <option value="senior">Senior Citizen</option>
                                        <option value="student">Student</option>
                                        <option value="military">Military Personnel</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3">
                                        <input type="radio" name="payment" value="online" className="h-4 w-4" />
                                        <span>Online Payment</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input type="radio" name="payment" value="cash" className="h-4 w-4" />
                                        <span>Pay at Station</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPassengerForm(false)}
                                    className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookTicket; 