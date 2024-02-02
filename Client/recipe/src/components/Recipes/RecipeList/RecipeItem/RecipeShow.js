import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useCommentStore from '../../../../features/comment/_commentStore';
import { Comment } from './Comment';

export const RecipeShow = () => {
  const {CommentList, addComment, removeComment, fetchComment} = useCommentStore(
    (state) => ({
      CommentList: state.CommentList,
      removeComment: state.removeComment,
      addComment: state.addComment,
      fetchComment : state.fetchComment
    })
  )
  const params = useParams();


  useEffect(
    () => {  
      fetchComment(params.id);
      console.log("===============================---------",CommentList, "{================================")
    }, [params])

  const recipes = useSelector((state) => state.recipes.recipes);
  const navigate = useNavigate()
  const recipe = recipes.find((r) => r._id === params.id)
  // console.log(recipe)

  const handleCommentSubmit = () => {
    if (!CommentText) {
      return alert("please add Comment-text");
    }

    // CommentList = CommentList.filter((Comment) => Comment.recipeId === params.id)
    // const filteredComments = CommentList.filter((Comment) => Comment.recipeId === params.id);

    const newComment = {
      text: CommentText,
      _to: params.id,
      repliedTo: 'recipe'
    };
  
    addComment(newComment);
    // setCommentList((prevCommentList) => [...prevCommentList, newComment]);
    setCommentText("");
  }
  
  const [CommentText, setCommentText] = useState("")
  console.log("Comment is rendered")

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
          <button className="btn btn-info me-2" onClick={() => navigate('/Comment')}>
            Comment
          </button>
          <i className="far fa-heart me-2"></i>
          <button className="btn btn-success me-2">Follow</button>
          <button className="btn btn-warning me-2">Add to Favorite</button>
        </div>

        <div className="mt-3">
          <input
           className="form-control" 
           value={CommentText} onChange={(e)=>setCommentText(e.target.value)} 
           placeholder="Type your message" />
          <button className="btn btn-primary mt-2" 
          onClick={()=>{
            handleCommentSubmit()
          }}>Add Comment</button>
        </div>

        <div className="mt-3">
          <h6 className="card-subtitle list-group-flush">
            <ul className="list-grroup list-group-flush">
              <Comment CommentList={CommentList} removeComment={removeComment} addComment={addComment}/>
            </ul>
          </h6>
        </div>
      </div>
    </div>
  );
};
