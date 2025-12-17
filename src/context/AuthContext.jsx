import React, { createContext, useState, useEffect } from 'react';

// Create a Context for the Auth state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for logged-in user on mount
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password' };
    };

    // Register function
    const register = (userToRegister) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === userToRegister.email)) {
            return { success: false, message: 'User already exists' };
        }
        // Add new user
        users.push(userToRegister);
        localStorage.setItem('users', JSON.stringify(users));
        return { success: true };
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    // Update Profile function
    const updateProfile = (updatedUser) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const index = users.findIndex(u => u.email === user.email);

        if (index !== -1) {
            // Update the user in the "database"
            // Note: If email is changed, key changes. Simple implementation assumes email is constant or handles it.
            // For simplicity, let's allow updating other fields.

            const newUserData = { ...users[index], ...updatedUser };
            users[index] = newUserData;

            localStorage.setItem('users', JSON.stringify(users));

            // Update current user/session
            localStorage.setItem('currentUser', JSON.stringify(newUserData));
            setUser(newUserData);
            return { success: true };
        }
        return { success: false, message: 'User not found' };
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
