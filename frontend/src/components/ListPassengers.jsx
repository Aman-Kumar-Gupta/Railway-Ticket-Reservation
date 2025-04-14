import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaSearch, FaTrain, FaCalendar } from 'react-icons/fa';

const ListPassengers = () => {
    const [trainName, setTrainName] = useState('');
    const [journeyDate, setJourneyDate] = useState('');
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setPassengers([]);

        try {
            const res = await fetch(`http://localhost:3000/users/list_passengers_on_train?trainName=${encodeURIComponent(trainName)}&journeyDate=${encodeURIComponent(journeyDate)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            // console.log(data.data);
            setPassengers(data.data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch passenger list');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'text-green-600';
            case 'rac':
                return 'text-yellow-600';
            case 'waitlisted':
                return 'text-red-600';
            case 'cancelled':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <>
       <Navbar/>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
           
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 px-6 py-8 text-center">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <FaTrain className="text-white text-4xl" />
                            <h1 className="text-2xl font-bold text-white">Passenger List</h1>
                        </div>
                        <p className="text-blue-100">View all passengers on a specific train</p>
                    </div>

                    {/* Search Section */}
                    <div className="p-6 border-b">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Train Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaTrain className="text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={trainName}
                                        onChange={(e) => setTrainName(e.target.value)}
                                        placeholder="Enter Train Name"
                                        className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>

                                {/* Journey Date Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaCalendar className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        value={journeyDate}
                                        onChange={(e) => setJourneyDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Search Button */}
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <FaSearch />
                                    {loading ? 'Searching...' : 'Search Passengers'}
                                </button>
                            </div>
                        </form>

                        {/* Error Message */}
                        {error && (
                            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Passenger Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Age
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Gender
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {passengers.map((passenger, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {passenger.PassengerName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {passenger.Age}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {passenger.Gender}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(passenger.Status)}`}>
                                                        {passenger.Status}
                                                    </span>
                                                </td>
                                               
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                Enter train name and journey date to view passenger list
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ListPassengers; 