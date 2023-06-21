import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import AdminDashboard from './pages/AdminDashboard';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
    const [token, setToken] = useState(null || localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkToken(token);
    }, []); // Empty dependency array means this useEffect runs once when the component mounts

    const checkToken = (token) => {
        if (!token) {
            setIsAdmin(false);
            return {
                error: 'Please enter a token.',
            };
        }

        // Check if token is valid
        return fetch('/api/check-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setIsAdmin(true);
                    setToken(token);

                    // Save token to local storage
                    localStorage.setItem('token', token);

                    return {
                        success: true,
                    };
                } else {
                    setIsAdmin(false);
                    setToken(null);

                    // Remove token from local storage
                    localStorage.removeItem('token');

                    return {
                        error: 'Invalid token.',
                    };
                }
            })
            .catch((err) => {
                console.log(err);
                setIsAdmin(false);
                setToken(null);

                // Remove token from local storage
                localStorage.removeItem('token');

                return {
                    error: 'An error occurred.',
                };
            });
    };

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />

                <Route path="/post/:id" element={<Post />} />
                <Route path="/admin" element={
                    isAdmin ? <Navigate to="/admin/dashboard" /> : <Admin checkToken={checkToken} />
                } />

                <Route path="/admin/dashboard" element={
                    isAdmin ? <AdminDashboard /> : <Navigate to="/admin" />
                } />
                <Route path="/admin/post/:id" element={
                    isAdmin ? <Post /> : <Navigate to="/admin" />
                } />
                <Route path="/admin/create-post" element={
                    isAdmin ? <CreatePost /> : <Navigate to="/admin" />
                } />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
