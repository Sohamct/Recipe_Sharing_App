// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';

// export const RecipeEdit = () => {
//   const recipesState = useSelector((state) => state.recipes);
//   const params = useParams();
//   const recipeId = params.id;
//   const recipeState = recipesState.filter((recipe) => recipe._id == recipeId)

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//     ingredients: [
//       { ingredient_name: '', quantity: '', quantity_type: 'ml' }
//     ]
//   });
//   const handleChange = (e, index) => {
//     // console.log([...formData.ingredients])
//     const { name, value } = e.target;
//     const newIngredients = [...formData.ingredients];
//     newIngredients[index][name] = value;
//     setFormData({
//       ...formData,
//       ingredients: newIngredients
//     });
//   };
//   const _handleChange = (e) => {
//     // console.log([...formData.ingredients])
//     const { name, value } = e.target;
//     const newStuff = value;
//     setFormData({
//       ...formData,
//       [name]: newStuff
//     });
//   };
//   const handleAddIngredient = () => {
//     setFormData({
//       ...formData,
//       ingredients: [
//         ...formData.ingredients,
//         { ingredient_name: '', quantity: '', quantity_type: 'ml' }
//       ]
//     });
//   };
//   const handleRemoveIngredient = (index) => {
//     const newIngredients = [...formData.ingredients];
//     newIngredients.splice(index, 1);
//     setFormData({
//       ...formData,
//       ingredients: newIngredients
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const isValid = formData.ingredients.every(ingredient => {
//       return ingredient.ingredient_name.trim() !== ''
//         && ingredient.quantity.trim() !== '';
//     });

//     if (!isValid) {
//       alert('Ingredient field can\'t be empty.');
//       return;
//     }

//     console.log('Form submitted:', formData);
//     dispatch(createRecipeAsync(formData))
//       .then((response) => {
//         console.log(response)
//         if(response.type === 'recipe/createRecipe/fulfilled'){
//           console.log(response)
//         console.log('Recipe created successfully');
//         notify1();
//         // Reset the form data
//         setFormData({
//           title: '',
//           description: '',
//           image: '',
//           ingredients: [{ ingredient_name: '', quantity: '', quantity_type: 'ml' }],
//         });
//         }
//       })
//       .catch((error) => {
//         console.error('Error creating recipe:', error);
//       });
//   };

//   const isFormEmpty = () => {
//     return (
//       // formData.title.trim() === '' ||
//       formData.description.trim() === '' ||
//       formData.ingredients.some(
//         (ingredient) =>
//           ingredient.ingredient_name.trim() === '' ||
//           ingredient.quantity.trim() === ''
//       )
//     );
//   };

//   return (
//     <div>
//       <div>
//         <Navigation />
//       </div>
//       <div className="max-w-3xl mx-auto p-6 bg-slate-100 rounded-md shadow-md ">
//         <h2 className="text-xl font-semibold mb-4">Create New Recipe</h2>
//         <form onSubmit={handleSubmit} >
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={_handleChange}
//               className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Steps:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={_handleChange}
//               rows="5"
//               className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL:</label>
//             <input
//               type="text"
//               id="image"
//               name="image"
//               value={formData.image}
//               onChange={_handleChange}
//               className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block py-2 text-sm font-medium text-gray-700">Ingredients:</label>
//             {formData.ingredients.map((ingredient, index) => (
//               <div key={index} className="flex items-center mb-2">
//                 <input
//                   type="text"
//                   placeholder="Ingredient Name"
//                   name="ingredient_name"
//                   value={ingredient.ingredient_name}
//                   onChange={(e) => handleChange(e, index)}
//                   className="px-4 py-2 mr-2 w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Quantity"
//                   name="quantity"
//                   value={ingredient.quantity}
//                   onChange={(e) => handleChange(e, index)}
//                   className="px-4 py-2 mr-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <select
//                   name="quantity_type"
//                   value={ingredient.quantity_type}
//                   onChange={(e) => handleChange(e, index)}
//                   className="px-4 py-2 mr-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="ml">ml</option>
//                   <option value="litre">litre</option>
//                   <option value="gm">gm</option>
//                   <option value="kg">kg</option>
//                 </select>
//                 <button
//                   type="button"
//                   className="px-3 py-1 text-red-500 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
//                   onClick={() => handleRemoveIngredient(index)}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               className="block px-3 py-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
//               onClick={handleAddIngredient}
//             >
//               Add Ingredient
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="block px-3 py-2 text-sm text-white font-medium bg-blue-500 rounded-md hover:bg-blue-600"
//             disabled={isFormEmpty()}
//           >
//             Submit
//           </button>

//         </form>
//       </div>

//     </div>

//   )
// }