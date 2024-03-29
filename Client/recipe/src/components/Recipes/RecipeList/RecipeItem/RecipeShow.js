import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useCommentStore from '../../../../features/comment/_commentStore';
import { Comment } from './Comment';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Navigation } from '../../../Navigation';
import { useUser } from '../../../../features/context';
import DeleteConfirmation from './DeleteConfirmation';
import { deleteRecipeAsync, fetchRecipesAsync } from '../../../../features/recipe/Slice/recipe_slice';
import { IoChatboxEllipses } from "react-icons/io5";
import { addChat } from '../../../../app/service/ChatApi';
import { useProgress } from '../../../../features/ProgressContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchUserDetailsbyUsername } from '../../../../app/service/userApi';

export const RecipeShow = () => {
  const [CommentText, setCommentText] = useState("");
  const [deleteClick, setDeleteClick] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { user, loading: userLoading } = useUser();
  const { updateProgress } = useProgress();
  const [recipe, setRecipe] = useState(null);
  const [owner, setOwner] = useState(null); // Declare owner state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const recipeId = params.id;

  const recipes = useSelector((state) => state.recipes.recipes);
  // console.log(recipes);
  const status = useSelector((state) => state.recipes.status);
  const error = useSelector((state) => state.recipes.error);

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipesAsync(updateProgress));
    }
  }, [dispatch, recipes.length]);

  useEffect(() => {
    const r = recipes.find((r) => r._id === recipeId);
    setRecipe(r);
  }, [recipes, recipeId]);

  useEffect(() => {
    // Fetch owner when recipe is available
    if (recipe) {
      setOwner(recipe.owner);
      const getUserData = async () => {
        try {
          const user = await fetchUserDetailsbyUsername(recipe.owner);
          setProfilePic(user.profileImage);
          setUserDetails(user);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      };
      getUserData();
    }
  }, [recipe]);

  const { commentByRecipe, addComment, removeComment, fetchComment } = useCommentStore(
    (state) => ({
      commentByRecipe: state.commentByRecipe,
      removeComment: state.removeComment,
      addComment: state.addComment,
      fetchComment: state.fetchComment,
    })
  );
  // console.log(commentByRecipe);

  // Loading state while fetching data
  if (userLoading || !recipe) {
    return <div>Loading...</div>;
  }
  const { _id, title, description, updatedAt, ingredients, image, createdAt } = recipe;

  // Function to calculate relative time
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

  // Function to handle delete button click
  const handleDeleteClick = () => {
    setDeleteClick(true);
  };

  // Function to handle cancel delete button click
  const handleCancelDelete = () => {
    setDeleteClick(false);
  };

  // Function to handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    const data = {
      recipeId: _id,
      owner: owner
    };

    dispatch(deleteRecipeAsync({ data, updateProgress }))
      .then(response => {
        updateProgress(100);
        if (status.delete === 'failed') {
          toast.error(error.deleteError, { autoClose: 2000, theme: "colored" });
        }
        else if (status.delete === 'success') {
          toast.success(response.payload.message, { autoClose: 2000, theme: "colored" });
        }
      })
      .catch(error => {
        toast.error(error, { autoClose: 2000, theme: "colored" });
      });
    setDeleteClick(false);
    navigate('/');
  };

  // Function to handle comment submit
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
    setCommentText("");
  };

  // Function to handle edit click
  const handleEditClick = () => {
    navigate(`/editrecipe/${params.id}`);
  };

  // Function to create new chat
  const makeNewChat = async (owner) => {
    try {
      const response = await addChat({ sender: user.username, receiver: owner });

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

  // Check if the current user is the owner of the recipe
  const isRecipeOwner = (user.username === owner);

  return (
    <div className="relative">
      {deleteClick && <DeleteConfirmation deleteClick={deleteClick} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />}
      <div>
        <Navigation />
      </div>
      <div className='pt-7'>
        <div className="mx-auto block w-3/4 px-4 pt-6 text-sm border border-gray-300 rounded-lg shadow-md p-4 relative">
          <div className="flex items-center justify-between">
            <div>
              <div className='flex mb-3'>
                <div className='flex'>
                  <div className='font-customFont bg-red-300 rounded-full w-12 h-12 flex items-center justify-center'>
                    {userDetails?.profileImage ? (
                      <img
                        src={userDetails?.profileImage.url}
                        alt="card-image"
                        className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                      />
                    ) : (
                      <>
                        {userDetails?.firstname?.charAt(0)}{userDetails?.lastname?.charAt(0)}
                      </>
                    )}
                  </div>
                  <div className='text-base text-center mt-[12px] mx-3'>
                    {isRecipeOwner ? (
                     <Link to={`/user-profile/${user.username}`} className="text-blue-800 font-semibold no-underline cursor-pointer">
                     Your Profile
                   </Link>
                    ) : (
                      <Link to={`/user-profile/${owner}`} className="text-blue-900 font-semibold text-lg no-underline cursor-pointer ">
                        {owner}  
                      </Link>
                    )}
                  </div>

                </div>
              </div>
              <h5 className="text-xl font-semibold">{title}</h5>
              <p className="text-gray-600">
                <small>{imageLoaded ? (updatedAt !== createdAt ? ('Updated ' + calculateRelativeTime(updatedAt)) : ('Created ' + calculateRelativeTime(createdAt))) : ''}</small>
              </p>
              {image ? (
                <img
                  src={image.url}
                  onLoad={handleImageLoad}
                  alt="card-image"
                  className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                />
              ) : (
                <img
                  src={require(`../../../../components/Uploads/default.png`)}
                  onLoad={handleImageLoad}
                  alt="card-image"
                  className="object-cover w-full h-full rounded-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
                />
              )}
            </div>
          </div>
          <div className=''>
            {user.username === recipe.owner ? '' : (
              <p className="absolute right-0 top-0 mt-[30px] mr-8">
                <IoChatboxEllipses size={25} className="cursor-pointer text-gray-500 hover:text-gray-800" onClick={() => makeNewChat(recipe.owner)} />
              </p>
            )}
          </div>
          {user.username === recipe.owner ? (
            <div className="absolute top-0 right-0 mr-8 mt-[30px] flex">
              <div className='mx-2'>
                <FaEdit onClick={handleEditClick} size={25} className="cursor-pointer hover:text-blue-500 transition-colors duration-300" />
              </div>
              <div>
                <FaTrash onClick={handleDeleteClick} size={25} className="cursor-pointer ml-4 hover:text-red-500 transition-colors duration-300" />
              </div>
            </div>
          ) : null}
          <div className="mt-4">
            <h6 className="text-lg font-semibold">Ingredients:</h6>
            <ul className="list-disc list-inside">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient.ingredient_name} ({ingredient.quantity} {ingredient.quantity_type})
                </li>
              ))}
            </ul>
            <h6 className="card-subtitle mt-3 mb-2 text-muted">Steps:</h6>
            <ol className="space-y-2">
              {description.split('. ').map((sentence, index) => (
                <li key={index} className="mb-2">{index + 1}. {sentence.trim()}</li>
              ))}
            </ol>

            <div className="mt-3">
              <input
                className="form-control"
                value={CommentText} onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type here..." />
              <button className="btn btn-primary mt-2"
                onClick={() => handleCommentSubmit()}>
                Add Comment
              </button>
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

export default RecipeShow;
