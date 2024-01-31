import React from 'react'

export const Comment = ({CommentList, removeComment}) => {
  return (
    <div>
        {CommentList.map((Comment, i) => {
                return (
                  <li key={i} className="list-group-item">
                    {Comment.text}
                    <span className='mx-5' 
                    style={{
                      cursor: 'pointer',
                      color: 'red',
                    }}onClick={() => removeComment(Comment._id)}>X</span>
                  </li>
                )
              })}
    </div>
  )
}
