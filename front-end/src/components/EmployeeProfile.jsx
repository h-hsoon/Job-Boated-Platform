import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const EmployeeProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.trim() !== '') {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('First Name and Last Name cannot be empty.');
      return;
    }
    
    // const token = Cookies.get('token');

    // try {
    //   const response = await axios.put('/api/updateEmployeeProfile', formData, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   if (response.data.success) {
    //     alert('Profile updated successfully!');
    //     setIsEditing(false); // Exit edit mode on success
    //   } else {
    //     alert('Failed to update profile.');
    //   }
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    //   alert('An error occurred. Please try again.');
    // }
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <div className="button-group">
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <p><strong>First Name:</strong> {user.firstName}</p>
          <p><strong>Last Name:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;
