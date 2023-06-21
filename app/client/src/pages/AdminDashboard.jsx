import React from 'react';
import Navigator from '../components/Navigator';

const AdminDashboard = () => {
    return (
        <div>
            Admin Dashboard!
            <Navigator to="/admin/create-post">Create Post</Navigator>
        </div>
    );
};

export default AdminDashboard;
