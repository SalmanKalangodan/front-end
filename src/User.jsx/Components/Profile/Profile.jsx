import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi';
import Navbar from '../Navbar/Navbar';
import { useDispatch } from 'react-redux';
import { GetProfile } from '../../../Redux/ApiSlice/Tunk/Tunk';
import { Link } from 'react-router-dom';

const ProfileView = () => {

    const dispacth = useDispatch()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    // const fetchProfile = async () => {
    //   try {
    //     const response = await axios.get('/api/profile'); // Adjust the API endpoint as needed
    //     setProfile(response.data);
    //     setLoading(false);
    //   } catch (error) {
    //     setError('Error fetching profile data');
    //     setLoading(false);
    //   }
    // };

    // fetchProfile();
    dispacth(GetProfile()).then((res)=>{
        setLoading(false)
        setProfile(res.payload)
    })
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Profile</h2>
        <Link to={'/profile/edit'}
          
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <FiEdit2 className="inline-block mr-2" /> Edit Profile
          </Link>
      </div>
      <div className="text-center mb-6">
        <img
          src={profile.profileimg || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover mx-auto shadow-md"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-700">Name</h3>
        <p className="text-gray-600">{profile.username}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-700">Email</h3>
        <p className="text-gray-600">{profile.email}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-700">Phone</h3>
        <p className="text-gray-600">{profile?.phone}</p>
      </div>
    </div>
    </>
  );
};

export default ProfileView;
