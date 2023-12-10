import React from 'react'

export const RecipeItem = () => {
    return (
        <div>
            <div className="card mb-2" style={{ width: '28rem' }}>
                <div className="card-body">
                    <h5 className="card-title">user1</h5>
                    <p className="card-text">Recipe Title</p>
                    <span className="card-text">12 min ago</span>
                </div>
                <img src="https://tse3.mm.bing.net/th?id=OIP.ZZsn6lD6PCjocBzx1tuu1QHaEo&pid=Api&P=0&h=180" className="card-img-top" alt="Recipe Image" />

                <div className="card-footer d-flex justify-content-between align-items-center">
                    <button className="btn btn-primary">Like</button>
                    <i className="far fa-heart"></i> {/* Add to favorite icon */}
                    <button className="btn btn-info">Follow</button>
                </div>
            </div>
        </div>
    )
}
