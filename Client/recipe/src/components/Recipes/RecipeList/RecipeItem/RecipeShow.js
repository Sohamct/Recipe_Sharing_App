import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useCommentStore from '../../../../features/comment/_commentStore';
import { Comment } from './Comment';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Navigation } from '../../../Navigation';
import { useUser } from '../../../../features/UserContext';
import DeleteConfirmation from './DeleteConfirmation';
import { deleteRecipeAsync } from '../../../../features/recipe/Slice/recipe_slice';
import { IoChatboxEllipses } from "react-icons/io5";
import { addChat } from '../../../../app/service/ChatApi';
import { useProgress } from '../../../../features/ProgressContext';

export const RecipeShow = () => {
  const [CommentText, setCommentText] = useState("")
  const [deleteClick, setDeleteClick] = useState(false);
  const debouncedText = useDebounce(CommentText, 300); // 300ms
  const { username } = useUser();
  const {updateProgress} = useProgress();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const calculateRelativeTime = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = now - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  const { commentByRecipe, addComment, removeComment, fetchComment } = useCommentStore(
    (state) => ({
      commentByRecipe: state.commentByRecipe,
      removeComment: state.removeComment,
      addComment: state.addComment,
      fetchComment: state.fetchComment,
    })
  )
  const params = useParams();

  const recipes = useSelector((state) => state.recipes.recipes);
  const status = useSelector(state => state.recipes.status);
  const error = useSelector(state => state.recipes.error);
  let recipe;
  // console.log(recipes)
  recipe = recipes.find((r) => r._id === params.id);

  useEffect(() => {
    if(recipe && commentByRecipe[params.id] === undefined){
        fetchComment(params.id);
    }

  }, [params.id])

  if(!recipe){
    return navigate('/');
  }

  const { _id, title, description, date, ingredients, owner } = recipe;

  const handleDeleteClick = () => {
    setDeleteClick(true);
  }
  const handleCancelDelete = () => {
    setDeleteClick(false)
  }
  const handleConfirmDelete = () => {
    const data = {
      recipeId: _id, owner: owner
    }

    dispatch(deleteRecipeAsync({data, updateProgress}))
      .then(response => {
        console.log(response);
        updateProgress(100);
        if (status.delete === 'failed') {
          toast.error(error.deleteError, { autoClose: 2000, theme: "colored" });
        }
        else if (status.delete === 'success') {
          toast.success(response.payload.message, { autoClose: 2000, theme: "colored" });
        }
        console.log(response);
      })
      .catch(error => {
        //console.log(error);
        toast.error(error, { autoClose: 2000, theme: "colored" });

      });
    setDeleteClick(false);
    navigate('/');
  }

  const handleCommentSubmit = () => {
    if (!CommentText) {
      return alert("please add Comment-text");
    }
    const newComment = {
      text: CommentText,
      _to: params.id,
      repliedTo: 'recipe'
    };

    addComment(params.id, newComment);
    // setCommentList((prevCommentList) => [...prevCommentList, newComment]);
    setCommentText("");
  }

  if (!recipe) {
    return <div>Recipe not found</div>;
  }
  const handleEditClick = () => {
    navigate(`/editrecipe/${params.id}`)
  }

  const makeNewChat = async (owner) => {
    try {
      const response = await addChat({ sender: username, receiver: owner });
      console.log(response)
      if (response.data) {
        navigate('/chat')
      } else {
        toast.error('Failed to create chat. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
      toast.error('An error occurred while creating chat. Please try again later.');
    }

  }

  return (
    <div>
      {deleteClick && <DeleteConfirmation deleteClick={deleteClick} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />}
      <div>
        <Navigation />
      </div>
      <div className='pt-7'>
        <div className="mx-auto block w-3/4 px-4 pt-6 text-sm border border-gray-300 rounded-lg shadow-md p-4">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h5 className="text-xl font-semibold">{title}</h5>
                <p className="text-gray-600">Recipe ID: {_id}</p>
                <p className="text-gray-600">
                  <small>{calculateRelativeTime(date)}</small>
                </p>
              </div>
              {username === recipe.owner ? '' :<p className="relative">
                <IoChatboxEllipses size={25} className="cursor-pointer text-gray-500 hover:text-gray-800" onClick={() => makeNewChat(recipe.owner)} />
              </p>}
              {
                username === recipe.owner ? (
                  <div className="flex">

                    <FaEdit onClick={handleEditClick} size={25} className="mx-4 cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                    <FaTrash onClick={handleDeleteClick} size={25} className="mx-4 cursor-pointer hover:text-red-500 transition-colors duration-300" />
                  </div>
                ) : null
              }

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
                <input
                  className="form-control"
                  value={CommentText} onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Type here..." />
                <button className="btn btn-primary mt-2"
                  onClick={() => {
                    handleCommentSubmit()
                  }}>Add Comment</button>
              </div>
            </div>

            <div className="mt-3">
              <h6 className="card-subtitle list-group-flush">
                <ul className="list-grroup list-group-flush">
                  <Comment recipeId={params.id} commentByRecipe={commentByRecipe} removeComment={removeComment} addComment={addComment} />
                </ul>
              </h6>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}



function useDebounce(value, delay) {
  const [debounceValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    }
  }, [value, delay])
  return debounceValue;
}