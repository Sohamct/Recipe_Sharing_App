const uri = "http://localhost:5501/api/comment";
// http://localhost:5501/api/comment//fetchComments/65bcac3e76dfff0a2699e588
export const fetchComments = async (recipe_id) => {
    try{
        console.log("--////////***********//////////******///////*---",recipe_id, "-------********/////****////****///****/****/")
        const response = await fetch(`${uri}//fetchComments/${recipe_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }).then(response => response.json);
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
