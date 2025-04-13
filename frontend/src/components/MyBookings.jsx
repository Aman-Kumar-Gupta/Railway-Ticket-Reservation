import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import logo from '../assets/logo.jpg';
import irctc from '../assets/IRCTC.jpg'
import oip from '../assets/OIP.jpeg'

const MyBookings = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [bookings, setBookings] = useState({ upcoming: [], past: [] });
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [userId, setUserId] = useState(""); // State to hold the userID input
    const [token] = useState("242734"); // Example token, you can adjust as needed

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const generatePDF = (booking) => {
        const doc = new jsPDF();

        // Page setup
        const margin = 10;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;

        // Border
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

        // Header
        doc.setFontSize(20);
        const headerText = "Electronic Reservation Slip (ERS)";
        const textWidth = doc.getTextWidth(headerText);
        const xPosition = (pageWidth - textWidth) / 2;
        const yPosition = margin + 15;
        doc.text(headerText, xPosition, yPosition);
        doc.setLineWidth(0.5);
        doc.line(xPosition, yPosition + 2, xPosition + textWidth, yPosition + 2);

        // Logos
        const imgWidth = 30;
        const imgHeight = 30;
        doc.addImage(logo, 'PNG', margin + 5, yPosition - 12, imgWidth, imgHeight);
        doc.addImage(irctc, 'PNG', pageWidth - margin - imgWidth - 5, yPosition - 12, imgWidth, imgHeight);

        // Journey Info Section Title
        doc.setFontSize(16);
        const sectionTitle = "Journey Information";
        const sectionTitleWidth = doc.getTextWidth(sectionTitle);
        const sectionY = yPosition + 25;
        doc.text(sectionTitle, (pageWidth - sectionTitleWidth) / 2, sectionY);
        doc.line((pageWidth - sectionTitleWidth) / 2, sectionY + 2, (pageWidth + sectionTitleWidth) / 2, sectionY + 2);

        let infoY = sectionY + 25;

        // Source and Destination with arrow
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');

        const sourceX = margin + 30;
        const destX = pageWidth - margin - 80;

        doc.text(booking.FromStation, sourceX, infoY);
        doc.text(booking.ToStation, destX, infoY);

        // Arrow image instead of triangle
        const arrowStartX = sourceX + doc.getTextWidth(booking.FromStation) + 10;
        const arrowEndX = destX - 10;
        const arrowY = infoY - 7; // Slight vertical adjustment

        // Line between source and destination
        

        // Add arrow image in center
        const arrowImgWidth = 10;
        const arrowImgHeight = 10;
        const arrowImgX = (arrowStartX + arrowEndX - arrowImgWidth) / 2;
        doc.addImage(oip, 'PNG', arrowImgX, arrowY, arrowImgWidth, arrowImgHeight);

        infoY += 20;

        // Reset font
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');

        const col1X = margin + 10;
        const col2X = pageWidth * 0.5;
        const colWidth = (pageWidth * 0.5) - margin - 15;

        const wrapText = (text, x, y, maxWidth) => {
            const lines = doc.splitTextToSize(text, maxWidth);
            doc.text(lines, x, y);
            return lines.length;
        };

        // Row 1: Train and PNR
        infoY += 12;
        doc.setFont(undefined, 'bold');
        doc.text("Train:", col1X, infoY);
        doc.text("PNR:", col2X, infoY);
        doc.setFont(undefined, 'normal');

        const trainText = `${booking.TrainNumber} - ${booking.TrainName}`;
        const lines1 = wrapText(trainText, col1X + 45, infoY, colWidth - 45);
        wrapText(booking.PNRNumber, col2X + 45, infoY, colWidth - 45);
        infoY += Math.max(0, (lines1 - 1) * 10);

        // Row 2: Date and Class
        infoY += 15;
        doc.setFont(undefined, 'bold');
        doc.text("Date of Journey:", col1X, infoY);
        doc.text("Class:", col2X, infoY);
        doc.setFont(undefined, 'normal');
        const dateText = new Date(booking.JourneyDate).toLocaleDateString();
        wrapText(dateText, col1X + 45, infoY, colWidth - 45);
        wrapText(booking.ClassType, col2X + 45, infoY, colWidth - 45);

        // Row 3: Fare and Status
        infoY += 15;
        doc.setFont(undefined, 'bold');
        doc.text("Fare (INR):", col1X, infoY);
        doc.text("Booking Status:", col2X, infoY);
        doc.setFont(undefined, 'normal');
        wrapText(`Rs. ${booking.FareAmount}`, col1X + 45, infoY, colWidth - 45);
        const lines3 = wrapText(booking.BookingStatus, col2X + 45, infoY, colWidth - 45);
        infoY += Math.max(0, (lines3 - 1) * 10);

        // Travel Instructions
        infoY += 25;
        doc.setFontSize(12);
        doc.setFont(undefined, 'bold');
        doc.text("Important Instructions for Passengers:", margin + 10, infoY);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(11);
        doc.setTextColor(50);

        const notes = [
            "1. Arrive at the boarding station at least 30 minutes before departure.",
            "2. Carry the original ID proof used during ticket booking.",
            "3. This e-ticket is valid only for the train and date shown.",
            "4. IRCTC refund/cancellation rules will apply as per policy.",
            "5. Contact 139 for railway enquiry or assistance.",
            "6. Keep your luggage secure. Avoid unauthorized agents.",
            "7. Smoking, drinking, and carrying banned items is prohibited."
        ];

        const lineSpacing = 6;
        notes.forEach((line, index) => {
            doc.text(line, margin + 10, infoY + 10 + index * lineSpacing);
        });

        // Save PDF
        doc.save(`ticket_${booking.PNRNumber}.pdf`);
    };

    useEffect(() => {
        const dev = localStorage.getItem('p_id');
        setUserId(dev);
        if (!userId) return; // Don't fetch if no userID is entered

        const fetchBookings = async () => {
            try {
                const res = await fetch(`http://localhost:3000/users/bookings/${userId}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await res.json();
                console.log("Fetched Data:", data);

                const today = new Date();
                const upcoming = [];
                const past = [];

                data.forEach(booking => {
                    const journeyDate = new Date(booking.JourneyDate);
                    if (journeyDate >= today) {
                        upcoming.push(booking);
                    } else {
                        past.push(booking);
                    }
                });

                setBookings({ upcoming, past });
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [userId, token]); // Run when userId or token changes

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleViewDetails = (booking) => {
        setSelectedBooking(booking);
    };

    const handleCloseDetails = () => {
        setSelectedBooking(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bookings</h1>
                    <p className="text-lg text-gray-600">View and manage your train bookings</p>
                </div>

                {/* User ID Input Box */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter your User ID"
                        className="border border-gray-300 px-4 py-2 rounded-md w-1/4 mx-auto"
                    />
                    <button
                        onClick={() => setUserId(userId)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-4"
                    >
                        Fetch Bookings
                    </button>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {['upcoming', 'past'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`${activeTab === tab
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                                >
                                    {tab === 'upcoming' ? 'Upcoming Journeys' : 'Past Journeys'}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Bookings List */}
                    <div className="mt-8">
                        {bookings[activeTab].length === 0 ? (
                            <p className="text-center text-gray-500">No bookings found.</p>
                        ) : (
                            bookings[activeTab].map((booking) => (
                                <div
                                    key={booking.TicketID}
                                    className="bg-gray-50 rounded-xl p-6 mb-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">PNR Number</p>
                                            <p className="text-lg font-semibold text-gray-900">{booking.PNRNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {booking.TrainName} ({booking.TrainNumber})
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Journey</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {booking.FromStation} → {booking.ToStation}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Status</p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                    booking.BookingStatus
                                                )}`}
                                            >
                                                {booking.BookingStatus}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            <p>Date: {new Date(booking.JourneyDate).toLocaleDateString()}</p>
                                            <p>Class: {booking.ClassType} | Fare: ₹ {formatCurrency(booking.FareAmount)}</p>
                                        </div>
                                        <div className="space-x-4">
                                            <button
                                                onClick={() => handleViewDetails(booking)}
                                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                View Details
                                            </button>
                                            {activeTab === 'upcoming' && (
                                                <button
                                                    onClick={() => generatePDF(booking)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                                >
                                                    Download Ticket
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Booking Details Modal */}
                {selectedBooking && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
                                <button
                                    onClick={handleCloseDetails}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">PNR Number</p>
                                        <p className="text-lg font-semibold text-gray-900">{selectedBooking.PNRNumber}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500 mb-1">Train Details</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {selectedBooking.TrainName} ({selectedBooking.TrainNumber})
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm text-gray-500 mb-1">Status</p>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                            selectedBooking.BookingStatus
                                        )}`}
                                    >
                                        {selectedBooking.BookingStatus}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;
