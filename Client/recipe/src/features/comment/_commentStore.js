import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addComment, fetchComments, deleteComment, updateComment } from '../../app/service/CommentApi';

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
            console.log(comments.data);
            set((state) => ({
            commentByRecipe: {
              ...state.commentByRecipe, [recipeId]:comments.data
            }
          }));
          
        } catch (error) {
          console.log("Error occurred while fetching comments:", error);
        }
      },
      removeComment: async (recipeId, commentId) => {
        console.log(recipeId, commentId);
        try{
          await deleteComment(commentId);
        }catch(error){
          console.log("Error while deleting comment...", error);
        }
        set((state) => ({
          commentByRecipe: {
            ...state.commentByRecipe, [recipeId]: state.commentByRecipe[recipeId].filter((c) => c._id !== commentId)
          }
        }));
      },
      updateComment: async (recipeId, commentId, updatedText) => {
        console.log("Updated comment: ", updatedText);
        try {
          const updated = await updateComment(commentId, updatedText); 
          console.log(updated)
          set((state) => ({
            commentByRecipe: {
              ...state.commentByRecipe,
              [recipeId]: state.commentByRecipe[recipeId].map((c) =>
                c._id === commentId ? updated.data : c 
              )
            }
          }));
        } catch (error) {
          console.log("Error while updating comment:", error);
        }
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
