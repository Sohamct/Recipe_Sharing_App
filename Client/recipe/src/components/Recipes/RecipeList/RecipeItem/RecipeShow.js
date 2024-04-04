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
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { RecipeItem } from './RecipeItem';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { fetchUserDetailsbyUsername } from '../../../../app/service/userApi';

export const RecipeShow = () => {
  const [CommentText, setCommentText] = useState("");
  const [deleteClick, setDeleteClick] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const { user, loading: userLoading } = useUser();
  const { updateProgress } = useProgress();
  const [recipe, setRecipe] = useState(null);
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [suggestedRecipesIds, setSuggestedRecipesIds] = useState([]);
  const [suggestedRecipes, setSuggestedRecipes] = useState(new Array(6).fill(null));
  const [isSuggestionLoaded, setIsSuggestionLoaded] = useState(false);
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
    let result = [];
    for (const rId of suggestedRecipesIds) {
      for (const recipe of recipes) {
        if (recipe?._id === rId) {
          result.push(recipe);
          break;
        }
      }
    }
    setSuggestedRecipes(result);
    // console.log(result);
  }, [suggestedRecipesIds])

  const onLoad = () => {
    window.scrollTo(0, 0)
    setIsSuggestionLoaded(false);
    console.log(recipeId);
    console.log(recipes)
    fetch(`http://localhost:5000/get_recommondation`, {
      method: "POST",
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({"recipeId": recipeId, "recipes": recipes})
    }).then(
      res => res.json()
    ).then(
      data => {
        console.log("Response from Flask server:", data.recommendations);
        setSuggestedRecipesIds(data.recommendations);
        setIsSuggestionLoaded(true);
      }
    ).catch((error) => {
      console.error("Error sending data", error);
    })
  }

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
    return (
      <div className='text-center text-lg mt-32 bg-center '>
        Loading...
      </div>
    );

  }

  const { _id, title, description, updatedAt, ingredients, image, createdAt, category, vegNonVeg, dishType } = recipe;

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
    onLoad()
  };

  // Function to handle confirm delete
  const handleConfirmDelete = () => {
    const data = {
      recipeId: _id,
      owner: owner
    };
    dispatch(deleteRecipeAsync({ data, updateProgress }))
      .then(response => {
        console.log(response);
        if (response.type === 'recipe/deleteRecipe/fulfilled') {
          updateProgress(90);
          console.log(recipeId)
          axios.delete(`http://localhost:5000/deleteRecipe?recipeId=${recipeId}`)
            .then(response => {
              console.log(response.data.message);
            })
            .catch(error => {
              console.error("Error deleting recipe: ", error);
            })

        }

        if (status.delete === 'failed') {
          toast.error(error.deleteError, { autoClose: 2000, theme: "colored" });
        }
        else if (status.delete === 'success') {
          toast.success(response.payload.message, { autoClose: 2000, theme: "colored" });
        }
      })
      .catch(error => {
        toast.error(error, { autoClose: 2000, theme: "colored" });
      })
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
      const response = await addChat({ sender: user?.username, receiver: owner });
      // console.log(response)
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


  const isRecipeOwner = (user?.username === owner);

  return (
    <div className="relative">
      {deleteClick && <DeleteConfirmation deleteClick={deleteClick} handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />}
      <div>
        <Navigation />
      </div>
      <div className='pt-7'>

        <div className="mx-auto block w-3/4 px-4 pt-6 text-sm border border-gray-300 rounded-lg shadow-md p-4 relative">
          <div>
            <div>
              {owner && (
                <div className='flex mb-3'>
                  <div className='flex'>
                    <div className='font-customFont bg-red-300 rounded-full w-12 h-12 flex items-center justify-center'>
                      {userDetails?.profileImage ? (
                        <img
                          src={userDetails?.profileImage.url}
                          alt="card-image"
                          className="object-cover w-full h-full rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md"
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
                  <div className="absolute top-0 right-0 mr-8 mt-[35px] flex">
                    {isRecipeOwner ? (
                      <>
                        <div className='mx-2'>
                          <FaEdit onClick={handleEditClick} size={25} className="cursor-pointer hover:text-blue-500 transition-colors duration-300" />
                        </div>
                        <div>
                          <FaTrash onClick={handleDeleteClick} size={25} className="cursor-pointer ml-4 hover:text-red-500 transition-colors duration-300" />
                        </div>
                      </>
                    ) : (
                      <p className="relative">
                        <IoChatboxEllipses size={25} className="cursor-pointer text-gray-500 hover:text-gray-800" onClick={() => makeNewChat(recipe?.owner)} />
                      </p>
                    )}
                  </div>
                </div>

              )}
            </div>
            <hr />
            <div className="relative">
              <div className="flex justify-between items-center">
                <div>
                  <div className='flex bg-center'>
                    <h3 className="text-3xl font-semibold">{title}</h3>
                    <div className='mx-2 mt-2'>
                      {vegNonVeg === 'Veg' ? (
                        <img width="28" height="28" src="https://img.icons8.com/fluency/48/vegetarian-food-symbol.png" alt="vegetarian-food-symbol" />
                      ) : (
                        <img width="28" height="28" src="https://img.icons8.com/color/48/non-vegetarian-food-symbol.png" alt="non-vegetarian-food-symbol"/>
                      )}

                    </div>
                    <p className="text-gray-600 mt-[13px]">
                        <small>({imageLoaded ? (updatedAt !== createdAt ? ('Updated ' + format(updatedAt)) : ('Created ' + format(createdAt))) : ''})</small>
                      </p>
                  </div>
                  <div className="flex items-center space-x-4 w-full">
                    <h3 className="text-2xl font-semibold">{dishType}</h3>
                    <h3 className="text-2xl font-semibold">({category})</h3>
                    <div className="flex items-center my-2">
                      
                    </div>
                  </div>
                  <div className='mt-2'>
                    {image ? (
                      <img
                        src={image.url}
                        onLoad={handleImageLoad}
                        alt="card-image"
                        className=" border-1 border-gray-300 object-cover w-3/4 h-72 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                      />
                    ) : (
                      <img
                        src={require(`../../../../components/Uploads/default.png`)}
                        onLoad={handleImageLoad}
                        alt="card-image"
                        className="object-cover w-3/4 h-full rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                      />
                    )}
                  </div>

                </div>
              </div>
              <div className='mt-4'>
                <FacebookShareButton
                  url={`Image: ${image.url}\nRecipe Link: ${window.location.href}`}
                  quote={`Unleash the chef in you and create magic in the kitchen with our irresistible and tasty ${dishType} ${title}`}
                  hashtag={`#${dishType}${title} ${category}`}>
                  <FacebookIcon widths={42} height={42} round={true}></FacebookIcon>
                </FacebookShareButton>
                <WhatsappShareButton
                  title={`Elevate your taste buds with our mouthwatering ${dishType} ${title}`}
                  url={`Image: ${image.url} \nRecipe Link: ${window.location.href}`}
                  hashtag={title}
                >
                  <WhatsappIcon widths={42} height={42} round={true}></WhatsappIcon>
                </WhatsappShareButton>
                <TwitterShareButton>
                  <TwitterIcon widths={42} height={42} round={true}></TwitterIcon>
                </TwitterShareButton>
              </div>

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

              <h6 className="card-subtitle mt-3 mb-2">Steps:</h6>
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
                <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>Add Comment</button>
              </div>
            </div>

            <div className="mt-3">
              <h6 className="card-subtitle list-group-flush">
                <ul className="list-grroup list-group-flush">
                  <Comment recipeId={params.id} commentByRecipe={commentByRecipe} removeComment={removeComment} addComment={addComment} />
                </ul>
              </h6>
            </div>
            <div className="mt-3">
              <h2 className="text-2xl font-semibold mb-2">Recommended Recipes : </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-5 mb-10">
                {isSuggestionLoaded ? suggestedRecipes.map((recipe, index) => (
                  <RecipeItem key={index} {...recipe} />
                )) : <h5>Loading ...</h5>}
              </div>
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

export default RecipeShow;
