const uri = "http://localhost:5501/api/connections";

export const fetchConnections = async () => {
    try{
        console.log("--////////***********//////////******///////*---",recipe_id, "-------********/////****////****///****/****/")
        const response = await fetch(`${uri}//fetchConnections/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }).then(response => response.json);
        if(!response.ok){
            throw new Error(`Failed to fetch connection. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        // console.log("Error fetching connections: ", error.message)
        throw error;
    }
};
export const newConnection = async (user_id) => {
    try {
        const response = await fetch(`${uri}/addConnection`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(user_id),
        });

        // console.log(response); // Add this line

        if (!response.ok) {
            throw new Error(`Failed to add connection. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // console.log("Error adding connection: ", error.message)
        throw error;
    }
}
