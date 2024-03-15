const API = 'http://localhost:5501/api';

const AuthService = {
    login: async (username, password) => {
        try {
            const resp = await fetch(`${API}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!resp.ok) {
                const data = await resp.json();
                console.log("Response is not ok");
                // console.log(data)
                return { success: false, message: data.errors || 'Login failed' };
            }

            const data = await resp.json();
            // console.log(resp)

            if (data.errors) {
                console.error('Login failed:', data.errors);
                return { success: false, message: data.errors };
            } else if (data.success) {
                localStorage.setItem('token', data.authtoken);
                return { success: true, message: 'Logged in successful', username: data.username };
            }
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred during login' };
        }
    },

    getDetails: async (uname) => {
        try {
            const resp = await fetch(`${API}/auth/getDetails/${uname}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            //console.log(resp);
            if (!resp.ok) {
                const data = await resp.json();
                // console.log(data)
                return { success: false, message: data.errors || 'Login failed' };
            }

            const data = await resp.json();

            if (data.errors) {
                return { success: false, message: data.errors };
            } else if (data.success) {
                return { success: true, message: 'Logged in successful', data: data.data };
            }
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred while getting details' };
        }
    },

    signup: async (username, password, email, firstname, lastname, gender, isPrivate) => {
        // console.log(username, password, email, firstname, lastname, gender, isPrivate)
        try {
            const resp = await fetch(`${API}/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email, firstname, lastname, gender, isPrivate }),
            });
            // console.log(resp)

            if (!resp.ok) {
                const data = await resp.json();
                return { success: false, message: data.errors || 'Signed up failed' };
            }

            const data = await resp.json();

            if (data.errors) {
                console.error('Login failed:', data.errors);
                return { success: false, message: data.errors };
            } else if (data.success) {
                localStorage.setItem('token', data.authtoken);
                return { success: true, message: 'Signed up in successful' };
            }
        } catch (error) {
            return { success: false, message: error.message || 'An error occurred during signup' };
        }
    }
}


export default AuthService;
