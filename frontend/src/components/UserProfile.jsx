import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const UserProfile = () => {
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    });

    useEffect(() => {
        // TODO: Replace with actual API call to get user data
        // This is mock data for now
        setUserData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phoneNumber: '1234567890'
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-blue-600 px-6 py-8 text-center">
                        <div className="flex justify-center mb-4">
                            <FaUserCircle className="text-white text-8xl" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">
                            {userData.firstName} {userData.lastName}
                        </h1>
                    </div>

                    {/* Profile Details Section */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-medium text-gray-500">First Name</h3>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">{userData.firstName}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">{userData.lastName}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">{userData.email}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl">
                                    <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                                    <p className="mt-1 text-lg font-semibold text-gray-900">{userData.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile; 