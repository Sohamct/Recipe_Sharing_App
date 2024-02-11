import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectRecipeById } from '../../../../features/recipe/Slice/recipe_slice'; // Adjust the path accordingly

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipeId = params.id;

  const recipes = useSelector((state) => state.recipes.recipes);
  const navigate = useNavigate()
  const recipe = recipes.find((r) => r._id === params.id)
  // console.log(recipe)
  if (!recipe) {
    navigate('/not-found');
    return null; // Prevent rendering anything else
  }

  const { _id, title, description, date, ingredients } = recipe;

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className='pt-7'>

        <div className="mx-auto block w-3/4 px-4 pt-6 text-sm border border-gray-300 rounded-lg shadow-md p-4">
          <div>
            <h5 className="text-xl font-semibold">{title}</h5>
            <p className="text-gray-600">Recipe ID: {_id}</p>
            <p className="text-gray-600">
              <small>{new Date(date).toLocaleString()}</small>
            </p>
          </div>

          <div className="mt-4">
            <h6 className="text-lg font-semibold">Ingredients:</h6>
            <ul className="list-disc list-inside">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
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
          <input type="text" className="form-control" placeholder="Type your message" />
          <button className="btn btn-primary mt-2">Submit Chat</button>
        </div>
      </div>

    </div>
  );
};
