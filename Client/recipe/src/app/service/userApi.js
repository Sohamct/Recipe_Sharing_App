import axios from 'axios';

const uri = "http://localhost:5501/api/user";

export const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case when the token is not present
      throw new Error('Token not found');
    }

    const response = await axios.get(`${uri}/details`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details: ", error);
    throw error;
  }
};
