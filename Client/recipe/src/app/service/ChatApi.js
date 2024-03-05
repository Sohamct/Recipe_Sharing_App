const uri = "http://localhost:5501/api/chat";

export const addChat = async(newChat) =>{
    try{
        // console.log(newChat);
        const response = await fetch(`${uri}/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            },
            body: JSON.stringify(newChat),
        })
            if(!response.ok){
                throw new Error(`Failed to fetch comments. Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            if(data.status){
                return data;
            }else{
                throw new Error(data.message);
            }
        }catch(error){
            throw new Error(error)
        }
    }

export const getChats = async() =>{
    try{
        const response = await fetch(`${uri}/fetchAllChats`, {
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
        console.log(data);
        if(data.status){
            return data;
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        throw new Error(error)
    }
}
