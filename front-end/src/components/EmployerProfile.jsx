import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
//import '.'; 

const EmployerProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user.companyName,
    aboutCompany: user.aboutCompany,
    phone: user.phone,
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate phone number format only if value is not empty
    if (name === 'phone' && value.trim() !== '') {
      if (!/^\d{10,15}$/.test(value)) {
        setError('Phone number must contain only digits and be 10 to 15 characters long.');
      } else {
        setError(''); // Clear error message if valid
      }
    } else {
      setError(''); // Clear error message if valid
    }
  
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyName.trim()) {
      setError('Company Name cannot be empty.');
      return;
    }
    if (formData.aboutCompany.length < 50) {
      setError('Company description must be at least 50 characters long.');
      return;
    }
  if (error){
    alert('fix the error');

    return
  }
    ///const token = Cookies.get('token');

    // try {
    //   const response = await axios.put('/api/updateProfile', formData, {
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
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>About Company:</label>
            <input
              type="text"
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Company Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Company Name:</strong> {user.companyName}</p>
          <p><strong>About Company:</strong> {user.aboutCompany}</p>
          <p><strong>Company Phone:</strong> {user.phone}</p>
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default EmployerProfile;
