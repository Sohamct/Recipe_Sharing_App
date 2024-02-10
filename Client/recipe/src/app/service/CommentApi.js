const uri = "http://localhost:5501/api/comment";

export const fetchComments = async (recipe_id) => {
    try {
        console.log("Going to fetch comment of recipeId:", recipe_id);
        const response = await fetch(`${uri}/fetchComments/${recipe_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching comments: ", error.message);
        throw error;
    }
};

export const addComment = async (newComment) => {
    try {
        const response = await fetch(`${uri}/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(newComment),
        });

        console.log(response); // Add this line

        if (!response.ok) {
            throw new Error(`Failed to add comment. Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error adding comment: ", error.message)
        throw error;
    }
}
