import React, { useState } from 'react';

const SeatAvailability = () => {
    const [formData, setFormData] = useState({
        source: '',
        destination: '',
        date: '',
    });
    const [availability, setAvailability] = useState(null);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setAvailability(null);

        const { source, destination, date } = formData;

        if (!source || !destination || !date) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/users/find_available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ source, destination, date }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setAvailability(data);
            } else {
                setError(data.message || 'No availability found');
            }
        } catch (err) {
            setError('Error fetching availability');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Seat Availability</h1>
                    <p className="text-lg text-gray-600">Check seat availability for your journey</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Source Station
                                </label>
                                <input
                                    type="text"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Mumbai"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Destination Station
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Delhi"
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Journey Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                                    required
                                />
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
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Trains</h2>
                        {availability.length === 0 ? (
                            <p className="text-center text-gray-500">No trains available for the selected route and date.</p>
                        ) : (
                            <div className="space-y-6">
                                {availability.map((train, idx) => (
                                    <div key={idx} className="border p-4 rounded-xl shadow-sm bg-gray-50">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h3 className="text-xl font-semibold">{train.TrainName}</h3>
                                                <p className="text-sm text-gray-600">Seat: {train.SeatNumber}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-gray-500">
                                                    Date: {new Date(train.JourneyDate).toISOString().split('T')[0]}
                                                </p>
                                                <p className="text-sm text-gray-500">Class: {train.ClassType}</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                                            <p><strong>Status:</strong> {train.AvailabilityStatus}</p>
                                            <p><strong>Fare:</strong> ₹{train.Fare}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SeatAvailability;
