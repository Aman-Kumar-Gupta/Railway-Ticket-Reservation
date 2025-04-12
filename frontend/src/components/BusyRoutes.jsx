import React, { useState, useEffect } from 'react';
import { FaRoute, FaUsers, FaChartLine } from 'react-icons/fa';

const BusyRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Mock data for demonstration
    const mockRoutes = [
        { id: 1, from: 'Delhi', to: 'Mumbai', passengers: 2500, percentage: 100 },
        { id: 2, from: 'Kolkata', to: 'Chennai', passengers: 2100, percentage: 84 },
        { id: 3, from: 'Bangalore', to: 'Hyderabad', passengers: 1800, percentage: 72 },
        { id: 4, from: 'Mumbai', to: 'Ahmedabad', passengers: 1500, percentage: 60 },
        { id: 5, from: 'Delhi', to: 'Kolkata', passengers: 1200, percentage: 48 },
    ];

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setRoutes(mockRoutes);
            setLoading(false);
        }, 1000);
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
                                                        {route.from} → {route.to}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">Route #{index + 1}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaUsers className="text-gray-400" />
                                                <span className="text-lg font-semibold text-gray-900">
                                                    {route.passengers.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm text-gray-600">
                                                <span>Passenger Load</span>
                                                <span>{route.percentage}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className={`h-2.5 rounded-full ${getColorForPercentage(route.percentage)}`}
                                                    style={{ width: `${route.percentage}%` }}
                                                ></div>
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