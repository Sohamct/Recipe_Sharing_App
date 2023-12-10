import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {addRecipe} from '../../../features/recipe/recipeSlice'

export const CreateRecipe = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: ''
  })
  const dispatch = useDispatch();

  const createRecipe = (e)=>{
    e.preventDefault();
    dispatch(addRecipe(formData.title))
    setFormData({id: '', title: ''})
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }

  return (
    <div>
        <form onSubmit={createRecipe}>
        <div className="mb-3">
          <label htmlFor="recipeId" className="form-label">
            Recipe ID
          </label>
          <input
            type="text"
            className="form-control"
            id="recipeId"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="recipeTitle" className="form-label">
            Recipe Title
          </label>
          <input
            type="text"
            className="form-control"
            id="recipeTitle"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
