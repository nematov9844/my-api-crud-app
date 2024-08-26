// src/components/UsersList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModal from './UserModal';
import SearchBar from './SearchBar';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://my-api-all-users-nr-style.vercel.app/api/users');
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (query) => {
    const result = users.filter(user => 
      user.first_name.toLowerCase().includes(query.toLowerCase()) ||
      user.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(result);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://my-api-all-users-nr-style.vercel.app/api/users/${id}`);
      fetchUsers(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCurrentUser(null);
  };

  return (
    <div className="p-6">
      <SearchBar onSearch={handleSearch} />
      <button 
        onClick={() => setModalOpen(true)} 
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add User
      </button>
      <ul className="space-y-4">
        {filteredUsers.map((user,index) => (
          <li 
            key={index} 
            className="flex justify-between items-center p-4 border border-gray-300 rounded shadow-sm"
          >
            <span>{user.first_name} {user.last_name} - {user.age} - {user.hobbies}</span>
            <div>
              <button 
                onClick={() => handleEdit(user)} 
                className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(user.id)} 
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {modalOpen && <UserModal user={currentUser} onClose={handleModalClose} onUpdate={fetchUsers} />}
    </div>
  );
};

export default UsersList;
