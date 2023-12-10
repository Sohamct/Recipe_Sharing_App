import React from 'react'
import {useNavigate} from 'react-router-dom';

export const RecipeItem = ({id, title}) => {
    const navigate = useNavigate();

    const goToSpecificRecipe = () => {
        navigate(`/recipe/${id}`)
    }
    return (

            <div className="card mb-2" style={{ width: '26rem', cursor: 'pointer' }} onClick={goToSpecificRecipe}>
                <div className="card-body">
                    <h5 className="card-title">recipe id: {id}</h5>
                    <p className="card-text">{title}</p>
                    <span className="card-text">12 min ago</span>
                </div>
                <img src="https://tse3.mm.bing.net/th?id=OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo&pid=Api&P=0&h=180" className="card-img-top" alt="Recipe Image" />

                <div className="card-footer d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary">Like</button>
                    <i className="far fa-heart"></i> {/* Add to favorite icon */}
                    <button className="btn btn-info">Follow</button>
                </div>
            </div>
        
    )
}
