const uri = "http://localhost:5501/api/comment";

export const fetchComments = async (recipe_id) => {
    try {

        // console.log("Going to fetch comment of recipeId:", recipe_id);
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
        console.log(newComment)
        const response = await fetch(`${uri}/addComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(newComment),
        });

        // console.log(response);

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

export const deleteComment = async (commentId) => {
    try {
        console.log(commentId)
        const response = await fetch(`${uri}/deleteComment`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({commentId : commentId})
        });

        if (!response.ok) {
            throw new Error(`Failed to delete comment. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("deleted commented returned data: ", data);
        return data;
    } catch (error) {
        console.log("Error deleting comment: ", error.message);
        throw error;
    }
}


export const updateComment = async (commentId, updatedText) => {
    try {
        const response = await fetch(`${uri}/updateComment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({commentId : commentId, updatedText: updatedText})
        });

        if (!response.ok) {
            throw new Error(`Failed to update comment. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("updated commented returned data: ", data);
        return data;
    } catch (error) {
        console.log("Error updating comment: ", error.message);
        throw error;
    }
}
