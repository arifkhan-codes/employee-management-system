import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
      axios.get('http://localhost:8080/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
    }
  }, [token, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Employee Management System</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.fullName} ({user?.role})</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user?.fullName}</h2>

        {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium">All Employees</h3>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.department || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{emp.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${emp.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {emp.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {user?.role === 'EMPLOYEE' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-2">Your Profile</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
