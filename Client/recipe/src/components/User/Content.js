import React, { useEffect, useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { fetchUserDetails, updateUserDetails } from '../../app/service/userApi';
import { useUser } from '../../features/context';
import { useNavigate } from 'react-router-dom';

function Content() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    instagramHandle: '',
    linkedinHandle: '',
    twitterHandle: ''
  });
  

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserDetails();
        setUserDetails(user.user);
        setFormData({
          username: user.user.username,
          email: user.user.email,
          firstname: user.user.firstname,
          lastname: user.user.lastname,
          instagramHandle: user.user.instagramHandle,
          linkedinHandle: user.user.linkedinHandle,
          twitterHandle: user.user.twitterHandle
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getUserData();
  }, []);

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async () => {
    try {
      // Create a copy of formData to filter out empty fields
      const updatedData = {};
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          updatedData[key] = formData[key];
        }
      });
  
      // Update user details only with non-empty fields
      await updateUserDetails(updatedData);
  
      // Fetch user details again to get the updated username from local storage
      const updatedUsername = localStorage.getItem('username');
      const updatedUserDetails = await fetchUserDetails(updatedUsername);
      setUserDetails(updatedUserDetails.user);
  
      // Construct a user object with the updated username
      const updatedUser = { ...updatedUserDetails.user, username: formData.username };
  
      // Pass the updated user object to setUser
      setUser(updatedUser);
  
      // Navigate to the new URL with the updated username
      navigate(`/user-profile/${formData.username}`);
  
      setEditingField(null);
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };
  

  return (
    <div>
      {userDetails ? (
        <div className='px-4 py-2'>
          <div className='my-3'>
            <label htmlFor="username" className="block mt-4 text-sm font-medium text-gray-900">Username</label>
            {editingField === 'username' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='username' value={formData.username} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, username: userDetails.username }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className="m-0 p-0" type='text' name='username' id='username'>{userDetails.username}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('username')} />
                </div>
              </div>
            )}
          </div>

          <div className='my-3'>
            <label htmlFor="email" className="block mt-4 text-sm font-medium text-gray-900">Email</label>
            {editingField === 'email' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='email' name='email' value={formData.email} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, email: userDetails.email }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.email}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('email')} />
                </div>
              </div>
            )}
          </div>


          <div className='my-3'>
            <label htmlFor="firstname" className="block mt-4 text-sm font-medium text-gray-900">First Name</label>
            {editingField === 'firstname' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='firstname' value={formData.firstname} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, firstname: userDetails.firstname }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.firstname}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('firstname')} />
                </div>
              </div>

            )}
          </div>
          <div className='my-3'>
            <label htmlFor="lastname" className="block mt-4 text-sm font-medium text-gray-900">Last Name</label>
            {editingField === 'lastname' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='lastname' value={formData.lastname} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, lastname: userDetails.lastname }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.lastname}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('lastname')} />
                </div>
              </div>

            )}
          </div>

          <div className='my-3'>
            <label htmlFor="instagram" className="block mt-4 text-sm font-medium text-gray-900">Instagram</label>
            {editingField === 'instagramHandle' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='instagramHandle' value={formData.instagramHandle} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, instagramHandle: userDetails.instagramHandle }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.instagramHandle}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('instagramHandle')} />
                </div>
              </div>
            )}
          </div>

          <div className='my-3'>
            <label htmlFor="linkedin" className="block mt-4 text-sm font-medium text-gray-900">LinkedIn</label>
            {editingField === 'linkedinHandle' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='linkedinHandle' value={formData.linkedinHandle} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, linkedinHandle: userDetails.linkedinHandle }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>
              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.linkedinHandle}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('linkedinHandle')} />
                </div>
              </div>

            )}
          </div>

          <div className='my-3'>
            <label htmlFor="twitter" className="block mt-4 text-sm font-medium text-gray-900">Twitter</label>
            {editingField === 'twitterHandle' ? (
              <div className='flex py-2'>
                <input className='px-2 py-1 border rounded border-gray-400 w-1/2' type='text' name='twitterHandle' value={formData.twitterHandle} onChange={handleChange} />
                <div className="flex ml-auto">
                  <button className='px-2 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-2' onClick={() => { setFormData({ ...formData, twitterHandle: userDetails.twitterHandle }); setEditingField(null); }}>Cancel</button>
                  <button className='px-2 rounded-sm bg-blue-900 text-white hover:bg-blue-800 ml-2' onClick={handleSubmit}>Save</button>
                </div>

              </div>
            ) : (
              <div className='flex py-2'>
                <p className='m-0 p-0'>{userDetails.twitterHandle}</p>
                <div className='mt-0.5 bg-center ml-auto'>
                  <FiEdit className='text-xl transition duration-400 ease-in-out hover:text-blue-700' onClick={() => handleEdit('twitterHandle')} />
                </div>
              </div>
            )}
          </div>

        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  )
}

export default Content;
