import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useChatStore from '../../../../features/recipe/chatStore';


export const RecipeShow = () => {
  const {chatList, addChat, removeChat, setChatList} = useChatStore(
    (state) => ({
      chatList: state.chatList,
      removeChat: state.removeChat,
      addChat: state.addChat
    })
  )
  const params = useParams();

  const recipes = useSelector((state) => state.recipes.recipes);
  const navigate = useNavigate()
  const recipe = recipes.find((r) => r._id === params.id)
  // console.log(recipe)

  const handleChatSubmit = () => {
    if (!chatText) {
      return alert("please add chat-text");
    }

    chatList = chatList.filter((chat) => chat.recipeId === params.id)
    const filteredChats = chatList.filter((chat) => chat.recipeId === params.id);

    const newChat = {
      id: Math.ceil(Math.random() * 1000000),
      text: chatText,
      recipeId: params.id,
    };
  
    addChat(newChat);
    setChatList((prevChatList) => [...prevChatList, newChat]);
    setChatText("");
  }
  
  const [chatText, setChatText] = useState("")
  console.log("Chat is rendered")

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const { _id, title, description, date, ingredients } = recipe;

  // console.log(recipe);
  // console.log(params);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-subtitle text-muted">Recipe ID: {_id}</p>
        <p className="card-text">
          <small className="text-muted">{new Date(date).toLocaleString()}</small>
        </p>
      </div>
      {/* Add your image component here */}
      {/* <img src="..." className="card-img-top" alt="Recipe Image" /> */}

      <div className="card-body">

        <h6 className="card-subtitle mb-2 text-muted">Ingredients:</h6>
        <ul className="list-group list-group-flush">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="list-group-item">
              {ingredient.ingredient_name} ({ingredient.quantity} {ingredient.quantity_type})
            </li>
          ))}
        </ul>

        {/* Add your steps here */}
        <h6 className="card-subtitle mt-3 mb-2 text-muted">Steps:</h6>
        <ol>
          {description}
        </ol>

        <div className="mt-3">
          <button className="btn btn-primary me-2">Like</button>
          <button className="btn btn-info me-2" onClick={() => navigate('/chat')}>
            Chat
          </button>
          <i className="far fa-heart me-2"></i>
          <button className="btn btn-success me-2">Follow</button>
          <button className="btn btn-warning me-2">Add to Favorite</button>
        </div>

        <div className="mt-3">
          <input
           className="form-control" 
           value={chatText} onChange={(e)=>setChatText(e.target.value)} 
           placeholder="Type your message" />
          <button className="btn btn-primary mt-2" 
          onClick={()=>{
            handleChatSubmit()
          }}>Add Chat</button>
        </div>

        <div className="mt-3">
          <h6 className="card-subtitle list-group-flush">
            <ul className="list-grroup list-group-flush">
              {chatList.map((chat, i) => {
                return (
                  <li key={i} className="list-group-item">
                    {chat.text}
                    <span className='mx-5' 
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                    }}onClick={() => removeChat(chat.id)}>X</span>
                  </li>
                )
              })}
            </ul>
          </h6>
        </div>
      </div>
    </div>
  );
};
