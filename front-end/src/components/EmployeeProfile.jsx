
import React from 'react';

const EmployeeProfile = ({ user }) => {
  return (
    <div>
           <h1>Profile</h1>
           <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
      

    </div>
  );
};

export default EmployeeProfile;
