
import React from 'react';

const EmployerProfile = ({ user }) => {
  return (
    <div>
           <h1>Profile</h1>
          <p>Email: {user.email}</p>
          <p>Company Name: {user.companyName}</p>
          <p>Company Address: {user.aboutCompany}</p>
          <p>Company Phone: {user.phone}</p>
   
    </div>
  );
};

export default EmployerProfile;
