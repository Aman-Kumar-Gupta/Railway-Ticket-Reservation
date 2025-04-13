import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaChartLine, FaCalendar } from 'react-icons/fa';

const Analytics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenue, setRevenue] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch Total Revenue
    const fetchRevenue = async () => {
        if (!startDate || !endDate) {
            setError('Please provide both start and end dates.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`http://localhost:3000/revenue?start_date=${startDate}&end_date=${endDate}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setRevenue(data.revenue);
        } catch (error) {
            setError('Failed to fetch revenue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        {/* Header Section */}
                        <div className="bg-blue-600 px-6 py-8 text-center">
                            <div className="flex justify-center items-center gap-3 mb-4">
                                <FaChartLine className="text-white text-4xl" />
                                <h1 className="text-2xl font-bold text-white">Revenue Analytics</h1>
                            </div>
                            <p className="text-blue-100">View total revenue for a specific period</p>
                        </div>

                        {/* Form Section */}
                        <div className="p-6 border-b">
                            <form className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Start Date Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaCalendar className="text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>

                                    {/* End Date Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaCalendar className="text-gray-400" />
                                        </div>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{error}</span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={fetchRevenue}
                                        disabled={loading}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <FaChartLine />
                                        {loading ? 'Loading...' : 'Get Revenue'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Results Section */}
                        {revenue !== null && (
                            <div className="p-6">
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h3>
                                    <p className="text-3xl font-bold text-blue-600">₹{revenue.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        From {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;
