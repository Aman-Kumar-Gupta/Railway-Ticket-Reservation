import React, { useState } from 'react';

const SeatAvailability = () => {
    const [formData, setFormData] = useState({
        trainNumber: '',
        date: '',
        class: '',
    });
    const [availability, setAvailability] = useState(null);
    const [error, setError] = useState('');

    const classTypes = [
        { id: 'SL', name: 'Sleeper', icon: '🛏️' },
        { id: '3A', name: 'AC 3 Tier', icon: '❄️' },
        { id: '2A', name: 'AC 2 Tier', icon: '❄️' },
        { id: '1A', name: 'First Class AC', icon: '❄️' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setError('');

        // Validate inputs
        if (!/^\d{5}$/.test(formData.trainNumber)) {
            setError('Please enter a valid 5-digit train number');
            return;
        }
        if (!formData.date) {
            setError('Please select a date');
            return;
        }
        if (!formData.class) {
            setError('Please select a class');
            return;
        }

        // Simulate API call with sample data
        setAvailability({
            trainNumber: formData.trainNumber,
            trainName: 'Rajdhani Express',
            date: formData.date,
            class: formData.class,
            totalSeats: 72,
            availableSeats: 24,
            bookedSeats: 48,
            racCount: 12,
            waitlistCount: 8,
            fare: {
                SL: 500,
                '3A': 1200,
                '2A': 1800,
                '1A': 2500,
            }[formData.class],
            quota: 'General',
            lastUpdated: new Date().toLocaleString(),
        });
    };

    const getAvailabilityColor = (available, total) => {
        const percentage = (available / total) * 100;
        if (percentage > 50) return 'text-green-600';
        if (percentage > 20) return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Seat Availability</h1>
                    <p className="text-lg text-gray-600">Check seat availability for your journey</p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 transform transition-all duration-300 hover:shadow-2xl">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Train Number
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="trainNumber"
                                        value={formData.trainNumber}
                                        onChange={handleInputChange}
                                        placeholder="Enter 5-digit train number"
                                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                        maxLength={5}
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <span className="text-gray-500">🚂</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Class
                                </label>
                                <select
                                    name="class"
                                    value={formData.class}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                                    required
                                >
                                    <option value="">Select Class</option>
                                    {classTypes.map((classType) => (
                                        <option key={classType.id} value={classType.id}>
                                            {classType.icon} {classType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 text-center">{error}</p>
                        )}

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Check Availability
                            </button>
                        </div>
                    </form>
                </div>

                {/* Availability Results */}
                {availability && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all duration-300">
                        <div className="space-y-8">
                            {/* Train Summary */}
                            <div className="border-b pb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Train Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{availability.trainNumber}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Name</p>
                                        <p className="text-lg font-semibold text-gray-900">{availability.trainName}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                                        <p className="text-lg font-semibold text-gray-900">{availability.date}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability Summary */}
                            <div className="border-b pb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Availability Summary</h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Total Seats</p>
                                        <p className="text-lg font-semibold text-gray-900">{availability.totalSeats}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Available Seats</p>
                                        <p className={`text-lg font-semibold ${getAvailabilityColor(availability.availableSeats, availability.totalSeats)}`}>
                                            {availability.availableSeats}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">RAC Count</p>
                                        <p className="text-lg font-semibold text-yellow-600">{availability.racCount}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Waitlist Count</p>
                                        <p className="text-lg font-semibold text-red-600">{availability.waitlistCount}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Class</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {classTypes.find(c => c.id === availability.class)?.name}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Fare</p>
                                        <p className="text-lg font-semibold text-gray-900">₹{availability.fare}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Quota</p>
                                        <p className="text-lg font-semibold text-gray-900">{availability.quota}</p>
                                    </div>
                                </div>
                                <div className="mt-6 text-sm text-gray-500 text-right">
                                    Last Updated: {availability.lastUpdated}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatAvailability; 