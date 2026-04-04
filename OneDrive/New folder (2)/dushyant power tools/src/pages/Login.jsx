import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you can check for specific email and password if needed
        // For now, logging in with any email
        login(email);
        navigate('/products'); // Show products with prices after login
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50 pt-20">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm border-t-4 border-industrial-red">
                <h2 className="text-2xl font-bold text-center mb-6 text-industrial-dark uppercase tracking-widest">
                    User Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-industrial-red"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-industrial-red"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-industrial-red text-white py-2 rounded-lg font-bold hover:bg-red-700 transition"
                    >
                        LOGIN TO SEE PRICE
                    </button>
                    <p className="text-center text-xs text-gray-500 mt-4">
                        Secure industrial portal for authorized partners.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
