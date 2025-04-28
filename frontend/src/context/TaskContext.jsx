import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const API_URL = 'http://localhost:5000/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/tasks?status=${filter === 'all' ? '' : filter}`);
            setTasks(response.data);
            setError(null);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        try {
            const response = await axios.post(`${API_URL}/tasks`, taskData);
            setTasks([response.data, ...tasks]);
            return { success: true };
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add task');
            return { success: false, error: error.response?.data?.message };
        }
    };

    const updateTask = async (id, updates) => {
        try {
            const response = await axios.patch(`${API_URL}/tasks/${id}`, updates);
            setTasks(tasks.map(task => task._id === id ? response.data : task));
            return { success: true };
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to update task');
            return { success: false, error: error.response?.data?.message };
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
            return { success: true };
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to delete task');
            return { success: false, error: error.response?.data?.message };
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [filter]);

    return (
        <TaskContext.Provider value={{
            tasks,
            loading,
            error,
            filter,
            setFilter,
            addTask,
            updateTask,
            deleteTask,
            fetchTasks
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
}; 