import React, { useState } from 'react';
import { FaTrain, FaPlus, FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';

const ManageStations = () => {
    const [stations, setStations] = useState([
        {
            id: 1,
            name: 'Delhi Junction',
            code: 'DLI',
            location: 'Delhi, India',
            trains: ['12345', '12346'],
            platforms: 12
        },
        {
            id: 2,
            name: 'Mumbai Central',
            code: 'MMCT',
            location: 'Mumbai, India',
            trains: ['12345', '12347'],
            platforms: 8
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStation, setEditingStation] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        location: '',
        trains: [''],
        platforms: ''
    });

    const handleAddTrain = () => {
        setFormData({
            ...formData,
            trains: [...formData.trains, '']
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingStation) {
            setStations(stations.map(station =>
                station.id === editingStation.id ? { ...formData, id: station.id } : station
            ));
        } else {
            setStations([...stations, { ...formData, id: stations.length + 1 }]);
        }
        setIsModalOpen(false);
        setEditingStation(null);
        setFormData({
            name: '',
            code: '',
            location: '',
            trains: [''],
            platforms: ''
        });
    };

    const handleEdit = (station) => {
        setEditingStation(station);
        setFormData(station);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setStations(stations.filter(station => station.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Stations</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <FaPlus /> Add New Station
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stations.map(station => (
                        <div key={station.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-4">
                                <FaMapMarkerAlt className="text-2xl text-red-600" />
                                <div>
                                    <h2 className="text-xl font-semibold">{station.name}</h2>
                                    <span className="text-gray-500">({station.code})</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Location:</span>
                                    <span className="font-medium">{station.location}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Platforms:</span>
                                    <span className="font-medium">{station.platforms}</span>
                                </div>

                                <div className="border-t pt-4">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <FaTrain /> Trains
                                    </h3>
                                    <div className="space-y-2">
                                        {station.trains.map((train, index) => (
                                            <div key={index} className="text-sm">
                                                <span className="font-medium">Train {train}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => handleEdit(station)}
                                        className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-yellow-600 transition-colors"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(station.id)}
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
                    <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingStation ? 'Edit Station' : 'Add New Station'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Station Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Station Code</label>
                                    <input
                                        type="text"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Number of Platforms</label>
                                    <input
                                        type="number"
                                        value={formData.platforms}
                                        onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-semibold">Trains</h3>
                                    <button
                                        type="button"
                                        onClick={handleAddTrain}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Add Train
                                    </button>
                                </div>
                                {formData.trains.map((train, index) => (
                                    <div key={index} className="mb-2">
                                        <input
                                            type="text"
                                            placeholder="Train Number"
                                            value={train}
                                            onChange={(e) => {
                                                const newTrains = [...formData.trains];
                                                newTrains[index] = e.target.value;
                                                setFormData({ ...formData, trains: newTrains });
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                        setEditingStation(null);
                                        setFormData({
                                            name: '',
                                            code: '',
                                            location: '',
                                            trains: [''],
                                            platforms: ''
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
                                    {editingStation ? 'Update Station' : 'Add Station'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageStations; 