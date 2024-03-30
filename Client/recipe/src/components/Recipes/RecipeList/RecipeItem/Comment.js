import React, { useState } from 'react';
import './comment.css';
import { FaReply, FaTrash } from 'react-icons/fa';
import { useUser } from '../../../../features/context';
import loadingGif from '../../../../../src/loading.gif'

export const Comment = ({ commentByRecipe, recipeId, removeComment }) => {
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [newComment, setNewComment] = useState('');
  const { user } = useUser();

  // console.log(commentByRecipe);

  // Function to calculate relative time
  const calculateRelativeTime = (timestamp) => {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const timeDifference = now - commentTime;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  };

  const handleNewCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleReplyClick = (commentId) => {
    setReplyToCommentId(commentId);
  };

  const handleNewCommentSubmit = () => {
    // Logic to submit new comment
    console.log('Replying to comment:', replyToCommentId, 'with:', newComment);
    // Clear input field after submitting
    setNewComment('');
    // Reset replyToCommentId
    setReplyToCommentId(null);
    console.log(user.username);
  };
  return (
    <div className="comment-container">
    {commentByRecipe[recipeId] === undefined ? (
      ''
    ) : (
      <ul className="comment-list">
        {commentByRecipe[recipeId].map((comment, i) => (
          <li key={i} className="comment-item">
            <div className="comment-owner">By {comment._from}</div>
            <div className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit">{calculateRelativeTime(comment.time)}</div> {/* Time field */}
            <div className="comment-text">{comment.text}</div>
            {/* {user.username === comment._from && (
              <div className="delete-comment-wrapper">
                <FaTrash
                  className="delete-comment-icon"
                  onClick={() => removeComment(comment._id)}
                />
              </div>
            )} */}
            {/* Reply icon */}
            {/* <FaReply className="reply-icon" onClick={() => handleReplyClick(comment._id)} /> */}
            {/* Reply section */}
            {/* {replyToCommentId === comment._id && (
              <div className="reply-box">
                <input
                  type="text"
                  placeholder="Write your reply..."
                  value={newComment}
                  onChange={handleNewCommentChange}
                />
                <button onClick={handleNewCommentSubmit}>Reply</button>
              </div>
            )} */}
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};

// import React from 'react';
// import '../../../../../src/loading.css';

// export const Comment = ({ commentByRecipe, recipeId, removeComment }) => {
//   console.log('Inside the Comment.js');
//   console.log('\n' + commentByRecipe[recipeId]);

//   return (
//     <div>
//       {commentByRecipe[recipeId] === undefined ? (
//         <div className="loading-spinner">
//         </div>
//       ) : (
//         <ul className="list-group">
//           {commentByRecipe[recipeId].map((comment, i) => (
//             <li key={i} className="list-group-item border-start-0 border-end-0 border-top-0">
//               {comment.text}
//               <span
//                 className='mx-5'
//                 style={{ cursor: 'pointer', color: 'red' }}
//                 onClick={() => removeComment(comment._id)}>
//                 X
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
