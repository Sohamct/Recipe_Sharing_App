
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

export const fetchUserDetailsbyUsername = async (username) => {
  try {
    const token = localStorage.getItem('token');
    console.log(username);
    if (!token) {
      throw new Error("Token not found !!");
    }

      // console.log(token);
    const response = await axios.get(`${uri}/detailsbyusername?username=${username}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ username }),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details: ", error);
    throw error;
  }
}

export const updateUserDetails = async (updatedDetails) => {
  try {

    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error("Token not found !!");
    }

    const response = await axios.put(`${uri}/update-details`, updatedDetails, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    }); 
    return response.data;
  } catch (error) {
    throw new Error('Error updating user details: ' + error.message);
  }
};

export const followUser = async (userIdToFollow) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case when the token is not present
      throw new Error('Token not found');
    }

    const response = await fetch(`${uri}/follow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ userIdToFollow }),
    });

    if (!response.ok) {
      // Handle the case when the response is not successful
      const data = await response.json();
      throw new Error(data.error);
    }

    return response.json();
  } catch (error) {
    console.error("Error following user: ", error);
    throw error;
  }
};

export const unfollowUser = async (userIdToUnfollow) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      // Handle the case when the token is not present
      throw new Error('Token not found');
    }

    const response = await fetch(`${uri}/unfollow`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({ userIdToUnfollow }),
    });

    if (!response.ok) {
      // Handle the case when the response is not successful
      const data = await response.json();
      throw new Error(data.error);
    }

    return response.json();
  } catch (error) {
    console.error("Error unfollowing user: ", error);
    throw error;
  }
};
