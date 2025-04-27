import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Проверка данных из localStorage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const user = storedUsers.find(u =>
            (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
        );

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            navigate('/');
        } else {
            alert('Incorrect username, email, or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Sign in</h2>
                <input
                    type="text"
                    placeholder="Username or email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                />
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition"
                >
                    Login
                </button>

                {/* Ссылка на страницу регистрации */}
                <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                    Not registered?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        Create an account
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
