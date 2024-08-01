
import axios from '../../axiosConfig';
import LoadingSpinner from '../../shared/LoadingSpinner';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Container, CssBaseline, Card, CardContent, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EmployerProfileDetails from './EmployerProfileDetails';
import EmployerProfileEdit from './EmployerProfileEdit';

const theme = createTheme();

const EmployerProfile = ({ tokenId }) => {
 const { id } = useParams();
 const [followers, setFollowers] = useState([]);
 const [userProfile, setUserProfile] = useState(null);
 const [isEditing, setIsEditing] = useState(false);
 const [isOwner, setIsOwner] = useState(false);
 const [formData, setFormData] = useState({
   companyName: '',
   aboutCompany: '',
   phone: '',
   avatar: '',
 });
 const [avatarPreview, setAvatarPreview] = useState('');
 const [error, setError] = useState('');

 useEffect(() => {
   const fetchProfile = async () => {
     try {
       const response = await axios.post('/dataUser', {
         userId: id,
         userType: "employer"
       });
       const currentUser = tokenId;
       setUserProfile(response.data);
       setFormData({
         companyName: response.data.companyName,
         aboutCompany: response.data.aboutCompany,
         email: response.data.email,
         phone: response.data.phone || '',
         avatar: ''
       });

       setAvatarPreview(response.data.avatar ? `http://localhost:5000/${response.data.avatar}` : '');

       setIsOwner(response.data._id === currentUser);
     } catch (error) {
       console.error('Error fetching user profile:', error);
     }
   };

   fetchProfile();
 }, [id, tokenId]);
 useEffect(() => {
   const fetchfreinds = async () => {
       try {
         const response = await axios.get(`/followers/${id}`);
         setFollowers(response.data);
       console.log(response.data)
       } catch (error) {
         console.error('Error fetching Followers:', error);
       }
     };
 
     fetchfreinds();
 }, []);
 const handleChange = (e) => {
   const { name, value } = e.target;

   if (name === 'phone' && value.trim() !== '' && !/^\d{10,15}$/.test(value)) {
     setError('Phone number must contain only digits and be 10 to 15 characters long.');
   } else {
     setError('');
   }

   setFormData({
     ...formData,
     [name]: value,
   });
 };

 const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     if (!file.type.startsWith('image/')) {
       setError('Please select a valid image file.');
       return;
     }
     if (file.size > 5 * 1024 * 1024) { // Example: 5MB
       setError('Image size should be less than 5MB.');
       return;
     } else {
       setError('');
     }
 
     setFormData({
       ...formData,
       avatar: file,
     });
     setAvatarPreview(URL.createObjectURL(file));
   }
 };

 const handleDeleteAvatar = () => {
   setFormData({
     ...formData,
     avatar: '',
   });
   setAvatarPreview('');
   setError('')
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
  console.log( formData.avatar,'ok',userProfile.avatar)
   if (
     formData.companyName === userProfile.companyName &&
     formData.aboutCompany === userProfile.aboutCompany &&
     formData.phone === (userProfile.phone || '') 
     &&
      (formData.avatar===userProfile.avatar||!formData.avatar)
   ) {
     setError('No changes detected.');
     return;
   }
   

   if (!formData.companyName.trim()) {
     setError('Company Name cannot be empty.');
     return;
   }
   if (formData.companyName.length > 20) {
     setError('Company name is too long.');
     return;
   }
   if (formData.aboutCompany.length < 50) {
     setError('Company description must be at least 50 characters long.');
     return;
   }
   if (error) {
     alert('Please fix the error before saving.');
     return;
   }

   const token = Cookies.get('token');

   const formDataToSend = new FormData();
   formDataToSend.append('companyName', formData.companyName);
   formDataToSend.append('aboutCompany', formData.aboutCompany);
   formDataToSend.append('phone', formData.phone);
   if (formData.avatar) {
     formDataToSend.append('avatar', formData.avatar);
   }

   try {
     const response = await axios.put('/updateEmployerProfile', formDataToSend, {
       headers: {
         'Content-Type': 'multipart/form-data',
         Authorization: token,
       },
     });

     if (response.data.success) {
       console.log(response.data)
       setUserProfile({
         ...userProfile,
         companyName: formData.companyName,
         aboutCompany: formData.aboutCompany,
         phone: formData.phone,
         avatar: formData.avatar ? URL.createObjectURL(formData.avatar) : userProfile.avatar,
       });
       alert('Profile updated successfully!');
       setIsEditing(false);
     } else {
       alert('Failed to update profile.');
     }
   } catch (error) {
     console.error('Error updating profile:', error);
     alert('An error occurred. Please try again.');
   }
 };

 const handleCancel = () => {
   setFormData({
     companyName: userProfile.companyName,
     aboutCompany: userProfile.aboutCompany,
     phone: userProfile.phone || "",
     avatar: '',
   });
   setAvatarPreview(userProfile.avatar ? `http://localhost:5000/${userProfile.avatar}` : '');
   setIsEditing(false);
   setError('');
 };

 if (userProfile === null) {
   return <LoadingSpinner />;
 }

 return (
   <ThemeProvider theme={theme}>
     <Container component="main" maxWidth="md">
       <CssBaseline />
       <Box
         sx={{
           marginTop: 8,
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
         }}
       >
         <Card sx={{ width: '100%', maxWidth: 800, padding: 4, borderRadius: 2, boxShadow: 3 }}>
           <CardContent>
             {isEditing ? (
               <EmployerProfileEdit
                 formData={formData}
                 avatarPreview={avatarPreview}
                 error={error}
                 handleChange={handleChange}
                 handleFileChange={handleFileChange}
                 handleDeleteAvatar={handleDeleteAvatar}
                 handleSubmit={handleSubmit}
                 handleCancel={handleCancel}
               />
             ) : (
               <EmployerProfileDetails
                 userProfile={userProfile}
                 avatarPreview={avatarPreview}
                 followers={followers}
                 isOwner={isOwner}
                 onEditClick={() => setIsEditing(true)}
               />
             )}
           </CardContent>
         </Card>
       </Box>
     </Container>
   </ThemeProvider>
 );
};

export default EmployerProfile;
