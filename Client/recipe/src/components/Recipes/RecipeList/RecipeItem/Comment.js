import React, { useState } from 'react';
import './comment.css';
import { useUser } from '../../../../features/context';
import { format } from 'timeago.js';
import { FaEdit, FaTrash } from 'react-icons/fa';

export const Comment = ({ commentByRecipe, recipeId, removeComment, updateComment }) => {
  const [editedComments, setEditedComments] = useState({});
  const [showAllComments, setShowAllComments] = useState(false); // State to track whether to show all comments
  const { user } = useUser();

  const handleEditComment = (commentId, text) => {
    setEditedComments((prevEditedComments) => ({
      ...prevEditedComments,
      [commentId]: text || '',
    }));
  };

  const handleCancelEdit = (commentId) => {
    setEditedComments((prevEditedComments) => ({
      ...prevEditedComments,
      [commentId]: undefined,
    }));
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await updateComment(recipeId, commentId, editedComments[commentId]);
      handleCancelEdit(commentId);
    } catch (error) {
      console.log('Error updating comment:', error);
    }
  };

  const renderComments = () => {
    const commentsToDisplay = showAllComments
      ? commentByRecipe[recipeId]
      : commentByRecipe[recipeId].slice(0, 3); // Show only the first 3 comments if showAllComments is false

    return (
      <ul className="comment-list">
        {commentsToDisplay.map((comment) => (
          <li key={comment._id} className="comment-item">
            <div className="comment-owner">
              By {comment._from === user.username ? 'You' : comment._from}
            </div>
            <div className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit">
              {comment.updatedAt !== null ? (
                <span> updated {format(comment.updatedAt)} </span>
              ) : (
                <span>{format(comment.time)} </span>
              )}
            </div>
            <div className="comment-text">{comment.text}</div>
            {user.username === comment._from && (
              <div className="flex items-center space-x-2">
                <FaEdit
                  className="delete-comment-icon text-blue-600 cursor-pointer hover:opacity-80"
                  onClick={() => handleEditComment(comment._id, comment.text)}
                />
                <FaTrash
                  className="delete-comment-icon text-red-600 cursor-pointer hover:opacity-80"
                  onClick={() => removeComment(recipeId, comment._id)}
                />
              </div>
            )}
            {editedComments[comment._id] !== undefined && (
              <div>
                <textarea
                  autoFocus={true}
                  className="edit-comment-textarea"
                  value={editedComments[comment._id]}
                  onChange={(e) => handleEditComment(comment._id, e.target.value)}
                />
                <button
                  className="update-comment-btn small bg-red-500 hover:bg-red-60 text-white py-2 px-2 rounded mx-2"
                  onClick={() => handleCancelEdit(comment._id)}
                >
                  Cancel
                </button>
                <button
                  className="update-comment-btn small bg-blue-500 hover:bg-blue-60 text-white py-2 px-2 rounded"
                  onClick={() => handleUpdateComment(comment._id)}
                >
                  Update
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="comment-container">
      {commentByRecipe[recipeId] && (
        <>
          {renderComments()}
          {!showAllComments && commentByRecipe[recipeId].length > 3 && (
            <button
              className="more-comments-btn text-blue-600 cursor-pointer"
              onClick={() => setShowAllComments(true)}
            >
              More Comments...
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Comment;

// import React, { useState } from 'react';
// import './comment.css';
// import { useUser } from '../../../../features/context';
// import { format } from 'timeago.js';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// export const Comment = ({ commentByRecipe, recipeId, removeComment, updateComment}) => {
//   const [editedComments, setEditedComments] = useState({});
//   const { user } = useUser();

//   console.log(commentByRecipe);

//   const handleEditComment = (commentId, text) => {
//       setEditedComments((prevEditedComments) => ({
//         ...prevEditedComments,
//         [commentId] : text || '',
//       }))
//   };
//   const handleCancelEdit = (commentId) => {
//     setEditedComments((prevEditedComments) => ({
//       ...prevEditedComments,
//       [commentId] : undefined,
//     }));
//   };
//   const handleUpdateComment = async (commentId) => {
//     try {
//       await updateComment(recipeId, commentId, editedComments[commentId]);
//       handleCancelEdit(commentId);
//     } catch (error) {
//       console.log('Error updating comment:', error);
//     }
//   }

//   return (
//     <div className="comment-container">
//       {commentByRecipe[recipeId] === undefined ? (
//         ''
//       ) : (
//         <ul className="comment-list">
//           {commentByRecipe[recipeId].map((comment, i) => (
//             <li key={i} className="comment-item">
//               <div className="comment-owner">By {comment._from === user.username ? 'You' : comment._from}</div>
//               <div className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit">{comment.updatedAt !== null ? <span> updated {format(comment.updatedAt)} </span>: <span>{format(comment.time)} </span>}</div> 
//               <div className="comment-text">{comment.text}</div>
//               {user.username === comment._from && (
//                 <div className="flex items-center space-x-2">
//                   <FaEdit
//                     className="delete-comment-icon text-blue-600 cursor-pointer hover:opacity-80"
//                     onClick={() => handleEditComment(comment._id, comment.text)}
//                   />
//                   <FaTrash
//                     className="delete-comment-icon text-red-600 cursor-pointer hover:opacity-80"
//                     onClick={() => removeComment(recipeId, comment._id)}
//                   />
//                 </div>
//               )}
//               {editedComments[comment._id] !== undefined && (
//                 <div>
//                   <textarea
//                   autoFocus={true}
//                     className="edit-comment-textarea"
//                     value={editedComments[comment._id]}
//                     onChange={(e) => handleEditComment(comment._id, e.target.value)}
//                   />
//                   <button 
//                   className="update-comment-btn small bg-red-500 hover:bg-red-60 text-white py-2 px-2 rounded mx-2"
//                   onClick={() => handleCancelEdit(comment._id)}>
//                     Cancel
//                   </button>
//                   <button 
//                   className="update-comment-btn small bg-blue-500 hover:bg-blue-60 text-white py-2 px-2 rounded"
//                   onClick={() => handleUpdateComment(comment._id)}>
//                     Update
//                   </button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
