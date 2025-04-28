import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';

import { TaskProvider } from './context/TaskContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/TaskForm.jsx';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    console.log('PrivateRoute - User:', user, 'Loading:', loading);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Check if user exists in localStorage as a fallback
    const storedUser = localStorage.getItem('user');
    const currentUser = user || (storedUser ? JSON.parse(storedUser) : null);
    
    if (!currentUser) {
        console.log('No user found, redirecting to login');
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

function App() {
    return (
        <Router>
            <TaskProvider>
                <div className="app">
                    <Navbar />
                    <main className="container">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/"
                                element={
                                    <PrivateRoute>
                                        <TaskList />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/add"
                                element={
                                    <PrivateRoute>
                                        <TaskForm />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </TaskProvider>
        </Router>
    );
}

export default App;
