import React, { useState } from 'react';
import { FaTrain, FaPlus, FaEdit, FaTrash, FaClock, FaChair } from 'react-icons/fa';

const ManageTrains = () => {
    const [trains, setTrains] = useState([
        {
            id: 1,
            trainNumber: '12345',
            trainName: 'Rajdhani Express',
            source: 'Delhi',
            destination: 'Mumbai',
            classes: [
                { name: 'AC First Class', capacity: 50 },
                { name: 'AC 2 Tier', capacity: 100 },
                { name: 'AC 3 Tier', capacity: 150 }
            ],
            schedule: [
                { station: 'Delhi', arrival: '08:00', departure: '08:30' },
                { station: 'Jaipur', arrival: '12:00', departure: '12:30' },
                { station: 'Mumbai', arrival: '20:00', departure: '20:30' }
            ]
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTrain, setEditingTrain] = useState(null);
    const [formData, setFormData] = useState({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        classes: [{ name: '', capacity: '' }],
        schedule: [{ station: '', arrival: '', departure: '' }]
    });

    const handleAddClass = () => {
        setFormData({
            ...formData,
            classes: [...formData.classes, { name: '', capacity: '' }]
        });
    };

    const handleAddSchedule = () => {
        setFormData({
            ...formData,
            schedule: [...formData.schedule, { station: '', arrival: '', departure: '' }]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingTrain) {
            setTrains(trains.map(train =>
                train.id === editingTrain.id ? { ...formData, id: train.id } : train
            ));
        } else {
            setTrains([...trains, { ...formData, id: trains.length + 1 }]);
        }
        setIsModalOpen(false);
        setEditingTrain(null);
        setFormData({
            trainNumber: '',
            trainName: '',
            source: '',
            destination: '',
            classes: [{ name: '', capacity: '' }],
            schedule: [{ station: '', arrival: '', departure: '' }]
        });
    };

    const handleEdit = (train) => {
        setEditingTrain(train);
        setFormData(train);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setTrains(trains.filter(train => train.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Trains</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <FaPlus /> Add New Train
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trains.map(train => (
                        <div key={train.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaTrain className="text-2xl text-blue-600" />
                                <h2 className="text-xl font-semibold">{train.trainName}</h2>
                                <span className="text-gray-500">({train.trainNumber})</span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Source:</span>
                                    <span className="font-medium">{train.source}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Destination:</span>
                                    <span className="font-medium">{train.destination}</span>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <FaChair /> Classes & Capacity
                                    </h3>
                                    <div className="space-y-2">
                                        {train.classes.map((cls, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{cls.name}:</span>
                                                <span className="font-medium">{cls.capacity} seats</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <FaClock /> Schedule
                                    </h3>
                                    <div className="space-y-2">
                                        {train.schedule.map((stop, index) => (
                                            <div key={index} className="text-sm">
                                                <div className="flex justify-between">
                                                    <span className="font-medium">{stop.station}</span>
                                                    <span className="text-gray-600">
                                                        {stop.arrival} - {stop.departure}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(train)}
                                        className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(train.id)}
                                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingTrain ? 'Edit Train' : 'Add New Train'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Train Number</label>
                                    <input
                                        type="text"
                                        value={formData.trainNumber}
                                        onChange={(e) => setFormData({ ...formData, trainNumber: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Train Name</label>
                                    <input
                                        type="text"
                                        value={formData.trainName}
                                        onChange={(e) => setFormData({ ...formData, trainName: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Source</label>
                                    <input
                                        type="text"
                                        value={formData.source}
                                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                                    <input
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Classes & Capacity</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddClass}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Add Class
                                    </button>
                                </div>
                                {formData.classes.map((cls, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Class Name"
                                            value={cls.name}
                                            onChange={(e) => {
                                                const newClasses = [...formData.classes];
                                                newClasses[index].name = e.target.value;
                                                setFormData({ ...formData, classes: newClasses });
                                            }}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Capacity"
                                            value={cls.capacity}
                                            onChange={(e) => {
                                                const newClasses = [...formData.classes];
                                                newClasses[index].capacity = e.target.value;
                                                setFormData({ ...formData, classes: newClasses });
                                            }}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Schedule</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddSchedule}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Add Stop
                                    </button>
                                </div>
                                {formData.schedule.map((stop, index) => (
                                    <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                                        <input
                                            type="text"
                                            placeholder="Station"
                                            value={stop.station}
                                            onChange={(e) => {
                                                const newSchedule = [...formData.schedule];
                                                newSchedule[index].station = e.target.value;
                                                setFormData({ ...formData, schedule: newSchedule });
                                            }}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="time"
                                            value={stop.arrival}
                                            onChange={(e) => {
                                                const newSchedule = [...formData.schedule];
                                                newSchedule[index].arrival = e.target.value;
                                                setFormData({ ...formData, schedule: newSchedule });
                                            }}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                        <input
                                            type="time"
                                            value={stop.departure}
                                            onChange={(e) => {
                                                const newSchedule = [...formData.schedule];
                                                newSchedule[index].departure = e.target.value;
                                                setFormData({ ...formData, schedule: newSchedule });
                                            }}
                                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingTrain(null);
                                        setFormData({
                                            trainNumber: '',
                                            trainName: '',
                                            source: '',
                                            destination: '',
                                            classes: [{ name: '', capacity: '' }],
                                            schedule: [{ station: '', arrival: '', departure: '' }]
                                        });
                                    }}
                                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    {editingTrain ? 'Update Train' : 'Add Train'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageTrains; 