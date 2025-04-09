import React from "react";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">Welcome Back</h1>
                <p className="text-sm text-gray-500 text-center mb-8">Sign in to continue</p>

                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex justify-end text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Register here
                    </a>
                </div>

                <div className="mt-4">
                    <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-xl hover:bg-gray-100 transition">
                        Admin Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
