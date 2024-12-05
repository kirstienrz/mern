// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Profile = () => {
//   const { token, backendUrl } = useContext(ShopContext);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [profilePicture, setProfilePicture] = useState('');
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     // Fetch the current user's profile
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/user/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const { name, email, profilePicture } = response.data.user;
//         setName(name);
//         setEmail(email);
//         setProfilePicture(profilePicture);
//       } catch (error) {
//         toast.error('Failed to fetch profile');
//         console.error(error);
//       }
//     };

//     if (token) {
//       fetchProfile();
//     }
//   }, [token, backendUrl]);

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   const onUpdateHandler = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       if (password) formData.append('password', password);
//       if (selectedFile) formData.append('profilePicture', selectedFile);

//       const response = await axios.put(`${backendUrl}/api/user/profile`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         toast.success('Profile updated successfully!');
//         setPassword(''); // Clear password field after successful update
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Failed to update profile');
//       console.error(error);
//     }
//   };

//   return (
//     <form
//       onSubmit={onUpdateHandler}
//       className='flex flex-col items-center w-[90%] max-w-96 m-auto mt-14 gap-4 text-gray-800'
//     >
//       <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//         <p className='prata-regular text-3xl'>My Profile</p>
//         <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//       </div>
//       <input
//         onChange={(e) => setName(e.target.value)}
//         value={name}
//         type='text'
//         className='w-full px-3 py-2 border border-gray-800'
//         placeholder='Name'
//         required
//       />
//       <input
//         onChange={(e) => setEmail(e.target.value)}
//         value={email}
//         type='email'
//         className='w-full px-3 py-2 border border-gray-800'
//         placeholder='Email'
//         required
//       />
//       <input
//         onChange={(e) => setPassword(e.target.value)}
//         value={password}
//         type='password'
//         className='w-full px-3 py-2 border border-gray-800'
//         placeholder='New Password (Optional)'
//       />
//       <div className='w-full'>
//         <label className='block mb-2 text-sm text-gray-700'>Profile Picture</label>
//         <input type='file' onChange={handleFileChange} className='w-full px-3 py-2 border border-gray-800' />
//         {profilePicture && (
//           <img
//             src={profilePicture}
//             alt='Profile'
//             className='mt-4 w-24 h-24 rounded-full object-cover mx-auto'
//           />
//         )}
//       </div>
//       <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update Profile</button>
//     </form>
//   );
// };

// export default Profile;
// import React, { useContext, useState, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { Box, Typography, Button, TextField, Modal } from '@mui/material';

// const Profile = () => {
//   const { backendUrl, token } = useContext(ShopContext);
//   const [userData, setUserData] = useState(null);
//   const [editOpen, setEditOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   // Fetch user data
//   const loadUserData = async () => {
//     try {
//       if (!token) {
//         console.error("No token found, user is not authenticated.");
//         return;
//       }
  
//       // Log the token to check if it's available
//       console.log("Token being sent:", token);
  
//       // Send the token as Bearer token in the Authorization header
//       const response = await axios.get(backendUrl + '/api/user/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
  
//       if (response.data.success) {
//         setUserData(response.data.user);
//         setName(response.data.user.name);
//         setEmail(response.data.user.email);
//       } else {
//         console.error("Error fetching user data:", response.data.message);
//       }
//     } catch (error) {
//       // Detailed error handling
//       console.error("Error loading user data:", error.response ? error.response.data : error);
//       if (error.response && error.response.status === 401) {
//         alert("Unauthorized access. Please log in.");
//       }
//     }
//   };
  
//   // Update user profile
//   const handleProfileUpdate = async () => {
//     try {
//       if (!token) {
//         console.error("No token found, user is not authenticated.");
//         return;
//       }

//       const response = await axios.post(backendUrl + '/api/user/update', {
//         name,
//         email,
//         password,
//         newPassword
//       }, {
//         headers: { token }
//       });

//       if (response.data.success) {
//         alert('Profile updated successfully');
//         loadUserData();
//         setEditOpen(false);  // Close the edit modal
//       } else {
//         console.error('Failed to update profile:', response.data.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error.response ? error.response.data : error);
//     }
//   };

//   // Open edit modal
//   const handleEditOpen = () => {
//     setEditOpen(true);
//   };

//   // Close edit modal
//   const handleEditClose = () => {
//     setEditOpen(false);
//     setPassword('');  // Clear the current password field
//     setNewPassword('');  // Clear the new password field
//   };

//   useEffect(() => {
//     loadUserData();
//   }, [token]);

//   return (
//     <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
//         <Title text1={'My'} text2={'Profile'} />
//       </Typography>

//       {userData ? (
//         <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 2, boxShadow: 5 }}>
//           <Typography variant="h6" sx={{ fontWeight: 600, color: '#2C3E50' }}>User Information</Typography>
//           <Typography variant="body1" sx={{ marginBottom: 2 }}>Name: {userData.name}</Typography>
//           <Typography variant="body1" sx={{ marginBottom: 2 }}>Email: {userData.email}</Typography>

//           <Button
//             variant="contained"
//             onClick={handleEditOpen}
//             sx={{
//               textTransform: 'none',
//               fontWeight: 500,
//               backgroundColor: '#3498DB',
//               '&:hover': { backgroundColor: '#2980B9' },
//               padding: '8px 20px',
//               borderRadius: '20px',
//               marginTop: 2,
//             }}
//           >
//             Edit Profile
//           </Button>
//         </Box>
//       ) : (
//         <Typography variant="body1">Loading...</Typography>
//       )}

//       {/* Edit Profile Modal */}
//       <Modal
//         open={editOpen}
//         onClose={handleEditClose}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           width: '400px',
//           boxShadow: 24
//         }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
//             Edit Profile
//           </Typography>

//           <TextField
//             label="Name"
//             variant="outlined"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />

//           <TextField
//             label="Email"
//             variant="outlined"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />

//           <TextField
//             label="Current Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />

//           <TextField
//             label="New Password"
//             variant="outlined"
//             type="password"
//             fullWidth
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="outlined" onClick={handleEditClose} color="secondary">
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleProfileUpdate} color="primary">
//               Update Profile
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default Profile;
// import React, { useEffect, useState, useContext } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const Profile = () => {
//     const { token, setToken, navigate } = useContext(ShopContext);
//     const [userData, setUserData] = useState(null);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;

//     const loadUserData = async () => {
//         try {
//             if (!token) {
//                 console.error("No token found, user is not authenticated.");
//                 return;
//             }

//             console.log("Token being sent:", token);

//             const response = await axios.get(backendUrl + '/api/user/profile', {
//                 headers: {
//                     Authorization: `Bearer ${token}` // Send token in Authorization header
//                 }
//             });

//             if (response.data.success) {
//                 setUserData(response.data.user);
//                 setName(response.data.user.name);
//                 setEmail(response.data.user.email);
//             } else {
//                 console.error("Error fetching user data:", response.data.message);
//             }
//         } catch (error) {
//             console.error("Error loading user data:", error.response ? error.response.data : error);
//             if (error.response && error.response.status === 401) {
//                 alert("Unauthorized access. Please log in.");
//                 navigate('/login'); // Redirect to login page if unauthorized
//             }
//         }
//     };

//     useEffect(() => {
//         loadUserData();
//     }, [token]); // Trigger when token changes

//     return (
//         <div className="profile-page">
//             {userData ? (
//                 <div className="user-profile">
//                     <h1>Profile</h1>
//                     <p>Name: {name}</p>
//                     <p>Email: {email}</p>
//                     {/* Add more profile data here */}
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Profile;
// src/components/Profile.jsx
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const token = localStorage.getItem('token'); // Get token from localStorage

//     useEffect(() => {
//         if (!token) {
//             toast.error("No token found, please log in.");
//             navigate("/login");  // Redirect to login if no token
//         } else {
//             // Fetch user profile
//             const fetchUserProfile = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:4000/api/user/profile', {
//                         headers: {
//                             'Authorization': `Bearer ${token}`,
//                         }
//                     });
//                     if (response.data.success) {
//                         setUser(response.data.user);
//                     }
//                 } catch (error) {
//                     console.error(error);
//                     toast.error("Error loading user profile.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchUserProfile();
//         }
//     }, [token, navigate]);

//     if (loading) return <div>Loading...</div>;

//     if (!user) return <div>User not found</div>;

//     return (
//         <div className="profile">
//             <h1>My Profile</h1>
//             <div className="profile-details">
//                 <img src={user.profilePicture || "default-avatar.jpg"} alt="Profile" />
//                 <p>Name: {user.name}</p>
//                 <p>Email: {user.email}</p>
//             </div>
//         </div>
//     );
// };

// export default Profile;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//     const [userData, setUserData] = useState({});
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [profilePicture, setProfilePicture] = useState(null);
//     const navigate = useNavigate();

//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         if (!token) {
//             navigate('/login');
//         }

//         const getUserData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/user/profile', {
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 setUserData(response.data.user);
//                 setName(response.data.user.name);
//                 setEmail(response.data.user.email);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         getUserData();
//     }, [token, navigate]);

//     const handleFileChange = (e) => {
//         setProfilePicture(e.target.files[0]);
//     };

//     const handleProfileUpdate = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('email', email);
//         if (profilePicture) {
//             formData.append('profilePicture', profilePicture);
//         }

//         try {
//             const response = await axios.put('http://localhost:4000/api/user/profile', formData, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.data.success) {
//                 alert('Profile updated successfully!');
//                 window.location.reload();
//             } else {
//                 alert(response.data.message);
//             }
//         } catch (error) {
//             console.error('Error updating profile:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Update Profile</h2>
//             <form onSubmit={handleProfileUpdate}>
//                 <div>
//                     <label>Name:</label>
//                     <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div>
//                     <label>Profile Picture:</label>
//                     <input type="file" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">Update Profile</button>
//             </form>
//         </div>
//     );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography } from '@mui/material';

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // Fetch user data on page load
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }

        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUserData(response.data.user);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
                if (response.data.user.profilePicture) {
                    setProfilePicture(response.data.user.profilePicture);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        getUserData();
    }, [token, navigate]);

    // Handle file change (uploading profile picture)
    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    // Update profile information
    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (profilePicture) {
            formData.append('profilePicture', profilePicture);
        }

        try {
            const response = await axios.put('http://localhost:4000/api/user/profile', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Profile updated successfully!');
                window.location.reload();
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Update Profile</Typography>

            <form onSubmit={handleProfileUpdate}>
                <div>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                </div>

                {/* Display the Profile Picture if it exists */}
                {userData.profilePicture && (
                    <div>
                        <img 
                            src={`http://localhost:4000${userData.profilePicture}`} 
                            alt="Profile"
                            style={{ width: 100, height: 100, borderRadius: '50%' }} 
                        />
                    </div>
                )}

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    style={{ marginTop: '20px' }}
                >
                    Update Profile
                </Button>
            </form>
        </Container>
    );
};

export default Profile;
