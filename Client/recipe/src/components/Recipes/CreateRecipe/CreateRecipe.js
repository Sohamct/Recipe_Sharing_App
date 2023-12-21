import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { createRecipeAsync } from '../../../features/recipe/Slice/recipe_slice';
import {toast} from 'react-toastify';


export const CreateRecipe = () => {

  const dispatch = useDispatch();
  const {status, error} = useSelector((state) => state.recipes)
  const notify1 = () => toast.success("Recipe created successfully", {autoClose: 2000, theme: "colored"});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ingredients: [
      { ingredient_name: '', quantity: '', quantity_type: 'ml' } 
    ]
  });

  const handleChange = (e, index) => {
    // console.log([...formData.ingredients])
    const { name, value } = e.target;
    const newIngredients = [...formData.ingredients];
    newIngredients[index][name] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };
  const _handleChange = (e) => {
    // console.log([...formData.ingredients])
    const { name, value } = e.target;
    const newStuff = value;
    setFormData({
      ...formData,
      [name]: newStuff
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
      && ingredient.quantity.trim() !== '';
    });

    if (!isValid) {
      alert('Ingredient field can\'t be empty.');
      return;
    }

    console.log('Form submitted:', formData);
    dispatch(createRecipeAsync(formData))
    .then((response) => {
      console.log(response)
      // Reset the form data
      setFormData({
        title: '',
        description: '',
        image: '',
        ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml' }],
      });
    })
    .catch((error) => {
      console.error('Error creating recipe:', error);
    });
    
    
  };
  const isFormEmpty = () => {
    return (
      // formData.title.trim() === '' ||
      formData.description.trim() === '' ||
      formData.ingredients.some(
        (ingredient) =>
          ingredient.ingredient_name.trim() === '' ||
          ingredient.quantity.trim() === ''
      )
    );
  };
useEffect(() => {
  if (status.create === 'succeeded') {
    console.log('Recipe created successfully');
    notify1();
  } else if (status.create === 'failed') {
    console.error(error.createError);
    toast.error(error.createError, { autoClose: 2000, theme: "colored" }); // Notify failure
  }
}, [status, error.createError]);

  return (
    <div>

      <h2>Create new recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={_handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Steps:</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={_handleChange} rows="6" />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input type="text" className="form-control" id="image" name="image" value={formData.image} onChange={_handleChange} />
        </div>
        <div className="form-group">
          <label>Ingredients:</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex align-items-center">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Ingredient Name"
                name="ingredient_name"
                value={ingredient.ingredient_name}
                onChange={(e) => handleChange(e, index)}
              />
              <input
                type="number"
                className="form-control mr-2"
                placeholder="Quantity"
                name="quantity"
                value={ingredient.quantity}
                onChange={(e) => handleChange(e, index)}
              />
              <select
                className="form-control mr-2"
                name="quantity_type"
                value={ingredient.quantity_type}
                onChange={(e) => handleChange(e, index)}
              >
                <option value="ml">ml</option>
                <option value="litre">litre</option>
                <option value="gm">gm</option>
                <option value="kg">kg</option>
              </select>
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveIngredient(index)}>
              X</button>
            </div>
          ))}
          <button type="button" className="btn btn-success mt-2" onClick={handleAddIngredient}>
            Add Ingredient
          </button>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isFormEmpty()}>Submit</button>
      </form>
    </div>
  )
}
