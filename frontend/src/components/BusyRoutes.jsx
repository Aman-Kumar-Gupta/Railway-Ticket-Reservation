import React, { useState, useEffect } from 'react';
import { FaRoute, FaUsers, FaChartLine } from 'react-icons/fa';

const BusyRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Mock data for demonstration
    const fetchBusiestRoutes = async () => {
        setLoading(true);
        setError('');
        setRoutes([]); // assuming `routes` is the state to store the data

        try {
            const res = await fetch('http://localhost:3000/busiest-routes', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong while fetching routes');
            }

            // console.log(data);
            setRoutes(data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch busiest routes');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        // Simulate API call
        fetchBusiestRoutes()
    }, []);

    const getColorForPercentage = (percentage) => {
        if (percentage >= 80) return 'bg-red-500';
        if (percentage >= 60) return 'bg-orange-500';
        if (percentage >= 40) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 px-6 py-8 text-center">
                        <div className="flex justify-center items-center gap-3 mb-4">
                            <FaRoute className="text-white text-4xl" />
                            <h1 className="text-2xl font-bold text-white">Top Busiest Routes</h1>
                        </div>
                        <p className="text-blue-100">Based on passenger count</p>
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">Loading route data...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-8 text-red-500">{error}</div>
                        ) : (
                            <div className="space-y-6">
                                {routes.map((route, index) => (
                                    <div key={route.id} className="bg-gray-50 rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-blue-100 p-3 rounded-full">
                                                    <FaRoute className="text-blue-600 text-xl" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {route.SourceStation} → {route.DestinationStation}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">Route #{index + 1}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="text-gray-400" />
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {route.PassengerCount}
                                                </span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusyRoutes; 