const uri = "http://localhost:5501/api/comment";

export const fetchComments = async (comment_id) => {
    try{
        const response = await fetch(`${uri}/fectchComments?id=${comment_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        if(!response.ok){
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error fetching comments: ", error.message)
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
