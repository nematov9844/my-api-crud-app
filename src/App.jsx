// src/App.jsx
import React from 'react';
import UsersList from './components/UsersList';

const App = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">CRUD App with Modal</h1>
      <UsersList />
    </div>
  );
};

export default App;
