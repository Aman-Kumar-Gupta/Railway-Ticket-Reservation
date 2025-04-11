import React, { useState } from 'react';
import { FaChartLine, FaMoneyBillWave, FaRoute, FaUsers, FaTicketAlt, FaCalendarAlt } from 'react-icons/fa';

const ReportsAndInsights = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [selectedReport, setSelectedReport] = useState('revenue');

    // Sample data - in a real app, this would come from an API
    const reports = {
        revenue: {
            title: 'Revenue Over Time',
            icon: <FaMoneyBillWave className="text-2xl text-green-600" />,
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                values: [12000, 15000, 18000, 14000, 16000, 20000, 17000]
            }
        },
        routes: {
            title: 'Busiest Routes',
            icon: <FaRoute className="text-2xl text-blue-600" />,
            data: [
                { route: 'Delhi - Mumbai', passengers: 2500 },
                { route: 'Chennai - Bangalore', passengers: 1800 },
                { route: 'Kolkata - Delhi', passengers: 1500 }
            ]
        },
        refunds: {
            title: 'Refund Reports',
            icon: <FaMoneyBillWave className="text-2xl text-red-600" />,
            data: {
                total: 50000,
                count: 120,
                average: 416.67
            }
        },
        passengers: {
            title: 'Passenger Counts',
            icon: <FaUsers className="text-2xl text-purple-600" />,
            data: [
                { train: '12345', date: '2024-03-20', count: 450 },
                { train: '12346', date: '2024-03-20', count: 380 },
                { train: '12347', date: '2024-03-20', count: 420 }
            ]
        },
        waitlist: {
            title: 'Waitlist Statistics',
            icon: <FaTicketAlt className="text-2xl text-yellow-600" />,
            data: {
                total: 1200,
                confirmed: 800,
                pending: 400,
                cancellationRate: 15
            }
        }
    };

    const renderReport = () => {
        const report = reports[selectedReport];

        switch (selectedReport) {
            case 'revenue':
                return (
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            {report.icon}
                            <h3 className="text-xl font-semibold">{report.title}</h3>
                        </div>
                        <div className="h-64">
                            {/* In a real app, you would use a charting library like Chart.js or Recharts */}
                            <div className="flex items-end h-48 gap-2">
                                {report.data.values.map((value, index) => (
                                    <div key={index} className="flex-1">
                                        <div
                                            className="bg-green-500 rounded-t"
                                            style={{ height: `${(value / 20000) * 100}%` }}
                                        />
                                        <div className="text-center text-sm mt-2">{report.data.labels[index]}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'routes':
                return (
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            {report.icon}
                            <h3 className="text-xl font-semibold">{report.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {report.data.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="font-medium">{item.route}</span>
                                    <span className="text-gray-600">{item.passengers} passengers</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'refunds':
                return (
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            {report.icon}
                            <h3 className="text-xl font-semibold">{report.title}</h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">₹{report.data.total}</div>
                                <div className="text-sm text-gray-600">Total Refunds</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">{report.data.count}</div>
                                <div className="text-sm text-gray-600">Refund Count</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold">₹{report.data.average}</div>
                                <div className="text-sm text-gray-600">Average Refund</div>
                            </div>
                        </div>
                    </div>
                );

            case 'passengers':
                return (
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            {report.icon}
                            <h3 className="text-xl font-semibold">{report.title}</h3>
                        </div>
                        <div className="space-y-4">
                            {report.data.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div>
                                        <div className="font-medium">Train {item.train}</div>
                                        <div className="text-sm text-gray-600">{item.date}</div>
                                    </div>
                                    <span className="text-lg font-semibold">{item.count} passengers</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'waitlist':
                return (
                    <div className="bg-white rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            {report.icon}
                            <h3 className="text-xl font-semibold">{report.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold">{report.data.total}</div>
                                <div className="text-sm text-gray-600">Total Waitlist</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{report.data.confirmed}</div>
                                <div className="text-sm text-gray-600">Confirmed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">{report.data.pending}</div>
                                <div className="text-sm text-gray-600">Pending</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">{report.data.cancellationRate}%</div>
                                <div className="text-sm text-gray-600">Cancellation Rate</div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Reports & Insights</h1>
                    <div className="flex items-center gap-4">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                            <FaCalendarAlt /> Export Report
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {Object.keys(reports).map((key) => (
                        <button
                            key={key}
                            onClick={() => setSelectedReport(key)}
                            className={`p-4 rounded-xl flex items-center gap-3 transition-colors ${selectedReport === key ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            {reports[key].icon}
                            <span className="font-medium">{reports[key].title}</span>
                        </button>
                    ))}
                </div>

                {renderReport()}
            </div>
        </div>
    );
};

export default ReportsAndInsights; 