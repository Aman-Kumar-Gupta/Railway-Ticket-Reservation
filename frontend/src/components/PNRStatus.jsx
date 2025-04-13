import React, { useState } from 'react';

const PNRStatus = () => {
    const [pnrNumber, setPnrNumber] = useState('');
    const [pnrStatus, setPnrStatus] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        setPnrStatus(null);

        // Validate PNR number
        if (!/^PNR\d{6}$/.test(pnrNumber)) {
            setError('Please enter a valid PNR number in the format "PNR123456"');
            return;
        }

        try {

            const res = await fetch(`http://localhost:3000/pnr-enquiry?pnr=${pnrNumber}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${1234}`,
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            console.log(data[0]);

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setPnrStatus(data[0]);
        } catch (err) {
            setError(err.message || 'Failed to fetch PNR status');
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">PNR Status</h1>

                {/* Search Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enter PNR Number
                            </label>
                            <input
                                type="text"
                                value={pnrNumber}
                                onChange={(e) => setPnrNumber(e.target.value)}
                                placeholder="Enter 10-digit PNR number"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                maxLength={10}
                                required
                            />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-indigo-800 transition shadow-lg hover:shadow-xl"
                            >
                                Check Status
                            </button>
                        </div>
                    </form>
                </div>

                {/* PNR Status Results */}
                {pnrStatus && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-6">
                            {/* Journey Details */}
                            <div className="border-b pb-4">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Journey Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Train Number</p>
                                        <p className="font-medium">{pnrStatus.TrainNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Train Name</p>
                                        <p className="font-medium">{pnrStatus.TrainName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Journey Date</p>
                                        <p className="font-medium">{pnrStatus.JourneyDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">From/To</p>
                                        <p className="font-medium">
                                            {pnrStatus.SourceStation} → {pnrStatus.DestinationStation}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Passenger Details */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Passenger Details</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Passenger Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Class
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Coach/Seat
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {pnrStatus.PassengerName}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {pnrStatus.ClassType}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pnrStatus.BookingStatus)}`}>
                                                        {pnrStatus.BookingStatus}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                       {pnrStatus.BookingStatus === "Confirmed" ? pnrStatus.CoachSeat : pnrStatus.BookingStatus}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Additional Information */}
                            <div className="border-t pt-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Chart Status</p>
                                        <p className="font-medium">{pnrStatus.BookingStatus}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Booking Date</p>
                                        <p className="font-medium">{pnrStatus.BookingDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Total Fare</p>
                                        <p className="font-medium">₹{pnrStatus.TotalFare}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PNRStatus; 