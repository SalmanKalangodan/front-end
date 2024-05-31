import React, { useState, useEffect } from 'react';
import { FiCamera } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { EditProfile, GetProfile } from '../../../Redux/ApiSlice/Tunk/Tunk';
import { useNavigate } from 'react-router-dom';

const ProfileEdit = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const Navigate = useNavigate()
  useEffect(() => {
    dispatch(GetProfile()).then((res) => {
      setProfile(res.payload);
      setImagePreview(res.payload.profileimg);
    }).catch((error) => {
      setError('Error fetching profile data');
    }).finally(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(null);
    const formData = new FormData();
    formData.append('username', profile.username);
    formData.append('phone', profile.phone);
   
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      await dispatch(EditProfile(formData)).then(()=>{
        setSuccess(true);
        Navigate('/profile')
      })
      
    } catch (error) {
      setError('Error updating profile');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
        {success && <div className="text-green-500 text-center mb-4">Profile updated successfully!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={imagePreview || 'https://via.placeholder.com/150'}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover shadow-md"
              />
              <label htmlFor="image" className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full cursor-pointer shadow-lg hover:bg-blue-600 transition duration-300">
                <FiCamera />
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username:</label>
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone:</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;

