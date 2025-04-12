import React, { useState } from 'react';
import { FaSearch, FaTrain } from 'react-icons/fa';

const PassengerList = () => {
    const [trainNumber, setTrainNumber] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Mock data for demonstration
    const mockPassengers = [
        { id: 1, name: 'John Doe', seatNumber: 'A1', class: 'AC3', boarding: 'Delhi', destination: 'Mumbai' },
        { id: 2, name: 'Jane Smith', seatNumber: 'B2', class: 'AC3', boarding: 'Delhi', destination: 'Mumbai' },
        { id: 3, name: 'Mike Johnson', seatNumber: 'C3', class: 'AC3', boarding: 'Delhi', destination: 'Mumbai' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Validate train number format
        if (trainNumber.trim() === '') {
            setError('Please enter a train number');
            setLoading(false);
            return;
        }

        // Check if train number is exactly 5 digits
        if (!/^\d{5}$/.test(trainNumber)) {
            setError('Train number must be exactly 5 digits');
            setLoading(false);
            return;
        }
        
        // TODO: Replace with actual API call
        setPassengers(mockPassengers);
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 px-6 py-8 text-center">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <FaTrain className="text-white text-4xl" />
                            <h1 className="text-2xl font-bold text-white">Passenger List</h1>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="p-6 border-b">
                        <form onSubmit={handleSearch} className="flex gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={trainNumber}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                                        setTrainNumber(value);
                                    }}
                                    placeholder="Enter 5-digit Train Number"
                                    maxLength={5}
                                    className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    noValidate
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <FaSearch />
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                        {error && (
                            <p className="mt-2 text-red-500 text-sm font-medium">
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading passenger list...</p>
                            </div>
                        ) : passengers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passenger Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boarding</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {passengers.map((passenger) => (
                                            <tr key={passenger.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{passenger.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{passenger.seatNumber}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{passenger.class}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{passenger.boarding}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{passenger.destination}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Enter a train number to view passenger list
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassengerList; 