import React, { useState } from 'react';

const CancelTicket = () => {
    const [pnrNumber, setPnrNumber] = useState('');

    const handleCancel = async (e) => {
        e.preventDefault();

        if (!pnrNumber || pnrNumber.length !== 9) {
            alert("Please enter a valid 9-digit PNR number.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:3000/users/cancel_ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pnr: pnrNumber })
            });

            if (!res.ok) throw new Error('Cancellation failed');

            alert("Your ticket has been cancelled.");
            setPnrNumber('');
        } catch (err) {
            alert("Failed to cancel the ticket. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-xl mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Cancel Ticket</h1>
                    <p className="text-gray-600">Enter your PNR number to cancel your ticket</p>
                </div>

                <form onSubmit={handleCancel} className="bg-white p-6 rounded-2xl shadow-xl space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">PNR Number</label>
                        <input
                            type="text"
                            value={pnrNumber}
                            onChange={(e) => setPnrNumber(e.target.value)}
                            placeholder="Enter 10-digit PNR"
                            maxLength={10}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all"
                    >
                        Cancel Ticket
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CancelTicket;
