import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeAsync, editRecipeAsync } from '../../../features/recipe/Slice/recipe_slice';
import { toast } from 'react-toastify';
import { Navigation } from '../../Navigation';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../../../features/UserContext';
import { useProgress } from '../../../features/ProgressContext';

export const CreateRecipe = () => {
  const recipesState = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const {username} = useUser();
  const {updateProgress} = useProgress();
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  useEffect(() => {
    setIsEditing(location.pathname.includes('/editrecipe'));
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml', owner: '' }],
  });

  useEffect(() => {
    if (isEditing) {
       console.log("checking editing recipe")
      const recipeToEdit = recipesState.recipes.find((recipe) => recipe._id === params.id);
      if (!recipeToEdit) {
        toast.error("Recipe does not exist!", { autoClose: 2000, theme: "colored" });
        navigate('/');
        return ;
      } else if (username !== recipeToEdit.owner) {
        toast.error("You don't have permission to edit this recipe!", { autoClose: 2000, theme: "colored" });
        navigate('/');
        return ;
      } else {
        setEditingRecipe(recipeToEdit);
        setFormData({
          title: recipeToEdit.title,
          description: recipeToEdit.description,
          image: recipeToEdit.image,
          ingredients: recipeToEdit.ingredients,
          owner: recipeToEdit.owner
        });
      }
    }
  }, [isEditing, params.id, recipesState, username, navigate,]);

  // const { status, error } = useSelector((state) => state.recipes)
  const createRecipeNotify = () => toast.success("Recipe created successfully", { autoClose: 2000, theme: "colored" });
  const editRecipeNotify = () => toast.success("Recipe edited successfully", { autoClose: 2000, theme: "colored" });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const newIngredients = [...prevFormData.ingredients]; // Clone the array
      newIngredients[index] = {
        ...newIngredients[index], 
        [name]: value 
      };
      return {
        ...prevFormData,
        ingredients: newIngredients
      };
    });
  };
  const _handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = (name === "image" ? files[0] : (value || ''));
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ingredient_name: '', quantity: '', quantity_type: 'ml' }
      ]
    });
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = formData.ingredients.every(ingredient => {
      return ingredient.ingredient_name.trim() !== ''
        && ingredient.quantity !== '';
    });

    if (!isValid) {
      alert('Ingredient field can\'t be empty.');
      return;
    }

    console.log('Form submitted:', formData);

    if (isEditing) {
      // If editing, dispatch editRecipeAsync

      const recipeData = {_id: params.id, ...formData}
      dispatch(editRecipeAsync({recipeData, updateProgress}))

        .then((response) => {
          updateProgress(100);
          console.log(response);
          if (response.type === 'recipe/editrecipe/fulfilled') {
            console.log('Recipe updated successfully');
            editRecipeNotify();
            setFormData({
              title: '',
              description: '',
              image: null,
              ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml' }],
            });
          }
        })
        .catch((error) => {
          console.error('Error updating recipe:', error);
        });
        setTimeout(() => {
          navigate('/');
        }, 2500)
    } else {
      console.log(formData);
      dispatch(createRecipeAsync({formData, updateProgress}))
        .then((response) => {
          updateProgress(100);
          if (response.type === 'recipe/createRecipe/fulfilled') {
            createRecipeNotify();
            setFormData({
              title: '',
              description: '',
              image: null,
              ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml' }],
            });
          }
        })
        .catch((error) => {
          console.error('Error creating recipe:', error);
        });
        setTimeout(() => {
          navigate('/');
        }, 2500)
    }

  };
  const isFormEmpty = () => {
    return (
      formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      formData.ingredients.some(
        (ingredient) =>
          ingredient.ingredient_name.trim() === '' ||
          ingredient.quantity === ''
      )
    );
  };

  // useEffect(() => {
  //   if (status.create === 'succeeded') {

  //   } else if (status.create === 'failed') {
  //     console.error(error.createError);
  //     toast.error(error.createError, { autoClose: 2000, theme: "colored" }); // Notify failure
  //   }
  // }, [status, error.createError]);


  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-slate-100 rounded-md shadow-md ">
        <h2 className="text-xl font-semibold mb-4">{!isEditing ? ('Create New Recipe') : 'Edit Recipe'}</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={_handleChange}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Steps:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={_handleChange}
              rows="5"
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={_handleChange}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div> */}

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Choose Recipe Image:
            </label>
            <input
              type="file"
              id="image"
              accept='image/*'
              name="image"
              onChange={_handleChange}
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label className="block py-2 text-sm font-medium text-gray-700">Ingredients:</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Ingredient Name"
                  name="ingredient_name"
                  value={ingredient.ingredient_name}
                  onChange={(e) => handleChange(e, index)}
                  className="px-4 py-2 mr-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleChange(e, index)}
                  className="px-4 py-2 mr-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  name="quantity_type"
                  value={ingredient.quantity_type}
                  onChange={(e) => handleChange(e, index)}
                  className="px-4 py-2 mr-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ml">ml</option>
                  <option value="litre">litre</option>
                  <option value="gm">gm</option>
                  <option value="kg">kg</option>
                </select>
                <button
                  type="button"
                  className="px-3 py-1 text-red-500 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
                  onClick={() => handleRemoveIngredient(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="block px-3 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={handleAddIngredient}
            >
              Add Ingredient
            </button>
          </div>

          <button
            type="submit"
            className="block px-3 py-2 text-sm text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isFormEmpty()}
          >
            {isEditing ? 'Update Recipe' : 'Submit'}
          </button>
        </form>
      </div>
    </div>

  )
}