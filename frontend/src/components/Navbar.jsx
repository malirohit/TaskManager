import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React, { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const { user, loading, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Reset dropdown state when user changes
    useEffect(() => {
        setIsDropdownOpen(false);
    }, [user]);

    const handleLogout = () => {
        setIsDropdownOpen(false);
        logout();
    };

    // Don't render anything while loading
    if (loading) {
        return null;
    }

    return (
        <nav className="navbar">
            {/* Navbar brand */}
            <div className="navbar-brand">
                <Link to="/">Task Manager</Link>
            </div>

            {/* Navbar menu */}
            <div className="navbar-menu">
                {user ? (
                    <div className="user-dropdown" ref={dropdownRef}>
                        <button 
                            className="user-button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {user.name}
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-item user-info">
                                    <div className="user-email">{user.email}</div>
                                    <div className="user-name">{user.name}</div>
                                </div>
                                <button 
                                    className="dropdown-item logout-button"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 