import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api';

export const useAuth = () => {
    const [user, setUser] = useState(() => {
        // Try to get user from localStorage on initial load
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Initialize auth state
    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const response = await axios.get(`${API_URL}/auth/me`);
                    console.log('Fetched user data:', response.data);
                    if (response.data) {
                        setUser(response.data);
                        localStorage.setItem('user', JSON.stringify(response.data));
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    if (error.response?.status === 401) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        delete axios.defaults.headers.common['Authorization'];
                        setUser(null);
                    }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('Attempting login with:', { email });
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            console.log('Login response:', response.data);
            const { token, user } = response.data;
            
            // Store token and user data
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Update user state immediately
            setUser(user);
            
            // Force a re-render of components using this hook
            setLoading(false);
            
            return { success: true };
        } catch (error) {
            console.error('Login error:', error.response?.data || error);
            const errorMessage = error.response?.data?.message || 'Login failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
            return { success: true };
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
            return { success: false, error: error.response?.data?.message || 'Registration failed' };
        }
    };

    const logout = async () => {
        console.log('Logging out user');
        // Clear all auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
        
        // Update state
        setUser(null);
        setLoading(false);
        
        // Navigate to login
        navigate('/login', { replace: true });
    };

    return { user, loading, error, login, register, logout };
}; 