import React from "react";

const DashboardCard = ({ title, description, href }) => (
    <a
        href={href}
        className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
    >
        <h3 className="text-lg font-semibold text-blue-600 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </a>
);

const UserDashboard = () => {
    return (
        <div className="min-h-screen w-full bg-gray-50">
            {/* Header with Branding */}
            <header className="w-full bg-blue-600 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center">
                    {/* Logo - replace '/path/to/ir-logo.png' with actual path */}
                    <img
                        src="/path/to/ir-logo.png"
                        alt="Indian Railways Logo"
                        className="h-8 mr-4"
                    />
                    <h1 className="text-white text-xl font-bold">Indian Railways</h1>
                    <div className="ml-auto">
                        <button className="text-white font-semibold hover:underline">
                            Login / Signup
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto p-4 mt-6 space-y-8">
                {/* Search Section */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">
                        Search Trains
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Plan your journey with confidence.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* From Station */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                From
                            </label>
                            <input
                                type="text"
                                placeholder="Enter station name"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        {/* To Station */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                To
                            </label>
                            <input
                                type="text"
                                placeholder="Enter station name"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        {/* Departure Date */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Departure
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        {/* Class */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class
                            </label>
                            <select className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                <option>All Classes</option>
                                <option>Sleeper</option>
                                <option>AC 3-tier</option>
                                <option>AC 2-tier</option>
                                <option>First Class</option>
                            </select>
                        </div>
                    </div>
                    {/* Search Button */}
                    <div className="flex justify-center mt-6">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Search Trains
                        </button>
                    </div>
                </div>

                {/* Quick Access Section */}
                <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Quick Access
                    </h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <DashboardCard
                            title="PNR Enquiry"
                            description="Check the status of your ticket using your PNR."
                            href="/pnr-enquiry"
                        />
                        <DashboardCard
                            title="Upcoming Trips"
                            description="View and manage your booked journeys."
                            href="/upcoming-trips"
                        />
                        <DashboardCard
                            title="Manage Booking"
                            description="Modify or cancel your reservations."
                            href="/manage-bookings"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserDashboard;
