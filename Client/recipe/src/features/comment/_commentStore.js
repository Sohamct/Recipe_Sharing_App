import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addComment, fetchComments } from '../../app/service/CommentApi';

export const useCommentStore = create(
  devtools(
    persist((set) => ({
      commentByRecipe: {},

      addComment: async (recipeId, Comment) => {
        try{
          // console.log(Comment)
          const newComment = await addComment(Comment);
          console.log(newComment)
          set((state) => ({
            commentByRecipe: {
              ...state.commentByRecipe, [recipeId] : [newComment.data, ...state.commentByRecipe[recipeId] || []]
            }
          }));
          // console.log(CommentList);

        }catch(error){
          console.log("Error while adding comment!: ", error.message)
        }
      },
      fetchComment: async (recipeId) => {
        try {
            const comments = await fetchComments(recipeId);
            console.log(comments.data)
            set((state) => ({
            commentByRecipe: {
              ...state.commentByRecipe, [recipeId]:comments.data
            }
          }));
          
        } catch (error) {
          console.log("Error occurred while fetching comments:", error);
        }
      },
      removeComment: (recipeId, commentId) => {
        set((state) => ({
          commentByRecipe: {
            ...state.commentByRecipe, [recipeId]: state.commentByRecipe[recipeId].filter((c) => c._id !== commentId)
          }
        }));
      },
      clearCommentsForRecipe: (recipeId)=>{
        set((state) => ({
          commentByRecipe: {
            ...state.commentByRecipe, [recipeId] : []
          }
        }))
      }
    }), {
      name: "Comments",
    })
  )
);

export default useCommentStore;
// import {create} from 'zustand';
// import { devtools, persist } from 'zustand/middleware'; // to check info in browser
// // persist: to store info in browser


// const CommentStore = (set) => ({
//     CommentList: [], // initially
//     addComment: (Comment) => {
//         set((state) => ({
//             CommentList : [Comment, ...state.CommentList],
//         }))
//     },
//     removeComment: (CommentId) => {
//         set((state) => ({
//             CommentList: state.CommentList.filter((c) => c.id !== CommentId)
//         }))
//     },
//     toggleCourseStatus: (CommentId) => {
//         set((state) => ({
//             CommentList: state.CommentList.map((Comment) => Comment.id === CommentId ? {...Comment, completed: !Comment.completed} : Comment)
//         }))
//     }

// })

// const useCommentStore = create(
//     devtools(
//         persist(CommentStore, {
//             name: "Comments",
//         })
//     )
// )

// export default useCommentStore;
