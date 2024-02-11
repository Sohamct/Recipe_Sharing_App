import React from 'react'
import { useNavigate } from 'react-router-dom';

export const RecipeItem = ({ _id, title, owner }) => {
    const navigate = useNavigate();
    const goToSpecificRecipe = () => {
        navigate(`/viewrecipe/${_id}`)
    }
    return (
        <div class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="relative h-56 mx-4 -mt-6 overflow-hidden shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img src={require("../../../../assets/pizza_photo.png")} alt="card-image" />
            </div>
            <div class="p-6">
                <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    recipde id : {_id}
                </h5>
                <p class="block font-sans font-semibold leading-relaxed text-inherit">
                    {title}
                </p>
                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    By {owner}
                </p>
                <p class="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                    12 min ago
                </p>

            </div>
            <div class="p-6 pt-0">
                <button
                    class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button" onClick={goToSpecificRecipe}>
                    View Recipe
                </button>
            </div>
        </div>
    )
}
