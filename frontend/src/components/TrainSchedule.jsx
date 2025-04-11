import React, { useState } from 'react';

const TrainSchedule = () => {
    const [trainNumber, setTrainNumber] = useState('');
    const [schedule, setSchedule] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');

        // Validate train number
        if (!/^\d{5}$/.test(trainNumber)) {
            setError('Please enter a valid 5-digit train number');
            return;
        }

        // Simulate API call with sample data
        setSchedule({
            trainNumber: trainNumber,
            trainName: 'Rajdhani Express',
            source: 'Delhi (DEL)',
            destination: 'Mumbai (BOM)',
            totalDistance: '1384 km',
            totalDuration: '16h 30m',
            stops: [
                {
                    station: 'Delhi (DEL)',
                    arrival: '-',
                    departure: '08:00',
                    distance: '0 km',
                    day: '1',
                },
                {
                    station: 'Mathura (MTJ)',
                    arrival: '09:30',
                    departure: '09:32',
                    distance: '141 km',
                    day: '1',
                },
                {
                    station: 'Agra (AGC)',
                    arrival: '10:30',
                    departure: '10:32',
                    distance: '200 km',
                    day: '1',
                },
                {
                    station: 'Gwalior (GWL)',
                    arrival: '12:00',
                    departure: '12:02',
                    distance: '321 km',
                    day: '1',
                },
                {
                    station: 'Jhansi (JHS)',
                    arrival: '13:30',
                    departure: '13:32',
                    distance: '403 km',
                    day: '1',
                },
                {
                    station: 'Bhopal (BPL)',
                    arrival: '16:00',
                    departure: '16:05',
                    distance: '702 km',
                    day: '1',
                },
                {
                    station: 'Nagpur (NGP)',
                    arrival: '21:00',
                    departure: '21:05',
                    distance: '1093 km',
                    day: '1',
                },
                {
                    station: 'Mumbai (BOM)',
                    arrival: '00:30',
                    departure: '-',
                    distance: '1384 km',
                    day: '2',
                },
            ],
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Train Schedule</h1>
                    <p className="text-lg text-gray-600">Enter train number to view complete schedule</p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Train Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={trainNumber}
                                    onChange={(e) => setTrainNumber(e.target.value)}
                                    placeholder="Enter 5-digit train number"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                    maxLength={5}
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <span className="text-gray-500">🚂</span>
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
                                View Schedule
                            </button>
                        </div>
                    </form>
                </div>

                {/* Schedule Results */}
                {schedule && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300">
                        <div className="space-y-8">
                            {/* Train Summary */}
                            <div className="border-b pb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Train Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{schedule.trainNumber}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{schedule.trainName}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Route</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {schedule.source} → {schedule.destination}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Total Distance</p>
                                        <p className="text-lg font-semibold text-gray-900">{schedule.totalDistance}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Total Duration</p>
                                        <p className="text-lg font-semibold text-gray-900">{schedule.totalDuration}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Schedule Table */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Station
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Arrival
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Departure
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Distance
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Day
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {schedule.stops.map((stop, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {stop.station}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {stop.arrival}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {stop.departure}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {stop.distance}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-500">
                                                            {stop.day}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainSchedule; 