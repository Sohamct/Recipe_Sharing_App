import React from 'react';
import '../../../../../src/loading.css';

export const Comment = ({ commentByRecipe, recipeId, removeComment }) => {
  console.log('Inside the Comment.js');
  console.log('\n' + commentByRecipe[recipeId]);

  return (
    <div>
      {commentByRecipe[recipeId] === undefined ? (
        <div className="loading-spinner">
          {/* Insert loading spinner */}
        </div>
      ) : (
        <ul className="list-group">
          {commentByRecipe[recipeId].map((comment, i) => (
            <li key={i} className="list-group-item border-start-0 border-end-0 border-top-0">
              {comment.text}
              <span
                className='mx-5'
                style={{ cursor: 'pointer', color: 'red' }}
                onClick={() => removeComment(comment._id)}>
                X
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
