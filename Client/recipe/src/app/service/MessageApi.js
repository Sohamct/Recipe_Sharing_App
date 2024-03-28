const uri = "http://localhost:5501/api/message";

export const addMessage = async(message) =>{
    try{
        const response = await fetch(`${uri}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify(message)
        })
            if(!response.ok){
                throw new Error(`Failed to fetch comments. Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log(data);
            if(data.status){
                return data;
            }else{
                throw new Error(data.message);
            }
        }catch(error){
            throw new Error(error)
        }
    }

export const getMessages = async(chatId) =>{
    try{
        const response = await fetch(`${uri}/${chatId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
        });
        if(!response.ok){
            throw new Error(`Failed to fetch comments. Status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        if(data.status){
            return data;
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        throw new Error(error)
    }
}
