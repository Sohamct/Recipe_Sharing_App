import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createRecipeAsync, editRecipeAsync } from '../../../features/recipe/Slice/recipe_slice';
import { toast } from 'react-toastify';
import { Navigation } from '../../Navigation';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../../../features/ProgressContext';
import { useUser } from '../../../features/context';
import axios from 'axios';

const dishTypes = ['Italian', 'American', 'Chinese', 'Mexican', 'Kathiyawadi', 'Rajasthani', 'South Indian', 'Punjabi', 'Hydrabadi', 'Gujrati', 'Maharashtriyan', 'Indian', 'Jammu Kashmiri', 'Uttar predesh'];
const categories = ['Breakfast', 'Fast food', 'Ice cream', 'Ice cream cake', 'Beverages', 'Snacks', 'Sweets', 'Jain', 'Deserts', 'Cookies'];
const vegNonVegOptions = ['Veg', 'Non-Veg'];

export const CreateRecipe = () => {
  const recipesState = useSelector((state) => state.recipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const {user, loading} = useUser();
  const {updateProgress} = useProgress();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsEditing(location.pathname.includes('/editrecipe'));
  }, [location.pathname]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml', owner: '' }],
    category: '',
    dishType: '',
    vegNonVeg: ''
  });

  useEffect(() => {
    if(user ===  null){

    }else{
      console.log(isEditing);
      let recipeToEdit;
      if (isEditing) {
        recipeToEdit = recipesState?.recipes?.find((recipe) => recipe._id === params.id);
        console.log("checking editing recipe");
        console.log(recipeToEdit);
       if (recipeToEdit === null || recipeToEdit === undefined || !recipeToEdit) {
         toast.error("Recipe does not exist!", { autoClose: 2000, theme: "colored" });
         navigate('/');
         return ;
       } 
       else if (user?.username !== recipeToEdit.owner) {
        console.log(user?.username);
        console.log(recipeToEdit?.owner)
         toast.error("You don't have permission to edit this recipe!", { autoClose: 2000, theme: "colored" });
         navigate('/');
         return ;
       } else {
         setFormData({
           title: recipeToEdit?.title,
           description: recipeToEdit?.description,
           image: recipeToEdit?.image,
           ingredients: recipeToEdit?.ingredients,
           owner: recipeToEdit?.owner,
           category: recipeToEdit?.category,
           vegNonVeg: recipeToEdit?.vegNonVeg,
           dishType: recipeToEdit?.dishType
         });
       }
        // console.log(recipesState.recipes);
    }
    
    }
  }, [user, loading, isEditing, params.id, recipesState, user?.username, navigate]);

  // const { status, error } = useSelector((state) => state.recipes)
  const createRecipeNotify = () => toast.success("Recipe created successfully", { autoClose: 2000, theme: "colored" });
  const editRecipeNotify = () => toast.success("Recipe edited successfully", { autoClose: 2000, theme: "colored" });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setFormData(prevFormData => {
      const newIngredients = [...prevFormData.ingredients];
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

      const recipeData = {_id: params.id, ...formData}
      dispatch(editRecipeAsync({recipeData, updateProgress}))

        .then((response) => {
          updateProgress(100);
          // console.log(response);
          if (response.type === 'recipe/editrecipe/fulfilled') {
            console.log('Recipe updated successfully');
            editRecipeNotify();
            axios.put('http://localhost:5000/updateRecipe', {recipe: response.payload.data})
              .then(() => {
                console.log("Request to /editRecipe completed successfully");
                navigate(`/viewrecipe/${params.id}`);
              }).catch((error) => {
                console.error("Error making reuest to /editRecipe: ", error)
              });
          }
        })
        .catch((error) => {
          console.error('Error updating recipe:', error);
        });
        updateProgress(100);
    } else {
      console.log(formData);
      dispatch(createRecipeAsync({formData, updateProgress}))
        .then((response) => {
          updateProgress(85);
          if (response.type === 'recipe/createRecipe/fulfilled') {
            createRecipeNotify();
            setFormData({
              title: '',
              description: '',
              image: null,
              category: '',
              vegNonVeg: '',
              dishType: '',
              ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml' }],
            });
            // console.log(response.payload);
            axios.post('http://localhost:5000/addRecipe', {"recipe": response.payload})
              .then(() => {
                console.log("Request to /addRecipe completed successfully");
                navigate(`/viewrecipe/${response.payload._id}`);
              }).catch((error) => {
                console.error("Error making request to /addRecipe:", error);
              });
            
          }
        })
        .catch((error) => {
          console.error('Error creating recipe:', error);
        });
        updateProgress(100);
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
      ) ||
      formData.category.trim() === '' ||
      formData.vegNonVeg.trim() === '' ||
      formData.dishType.trim() === ''
    );
  };


  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className="max-w-3xl mx-auto p-6 bg-slate-100 rounded-md shadow-md ">
        <h2 className="text-xl font-semibold mb-4">{!isEditing ? ('Create New Recipe') : 'Update Recipe'}</h2>

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
              rows="7"
              style={{ whiteSpace: 'pre-wrap' }}
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
          <label htmlFor="dishType" className="block text-sm font-medium text-gray-700">Dish Type:</label>
          <select
            id="dishType"
            name="dishType"
            value={formData.dishType}
            onChange={_handleChange}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Dish Type</option>
            {dishTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="vegNonVeg" className="block text-sm font-medium text-gray-700">Veg-Non Veg:</label>
          <select
            id="vegNonVeg"
            name="vegNonVeg"
            value={formData.vegNonVeg}
            onChange={_handleChange}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Option</option>
            {vegNonVegOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={_handleChange}
            className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

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
                  <option value="unit">unit</option>
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