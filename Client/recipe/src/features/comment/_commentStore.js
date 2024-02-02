import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addComment, fetchComments } from '../../app/service/CommentApi';

const useCommentStore = create(
  devtools(
    persist((set) => ({
      CommentList: [],
      addComment: async (Comment) => {
        try{
          console.log(Comment)
          const newComment = await addComment(Comment);
          set((state) => ({
            CommentList: [newComment, ...state.CommentList],
          }));
          // console.log(CommentList);

        }catch(error){
          console.log("Error while adding comment!: ", error.message)
        }
      },
      fetchComment: async (recipe_id) => {
        try {
          const comments = await fetchComments(recipe_id);
          set({ CommentList: comments });
        } catch (error) {
          // Handle error, maybe show a notification to the user
        }
      },
      removeComment: (CommentId) => {
        set((state) => ({
          CommentList: state.CommentList.filter((c) => c.id !== CommentId),
        }));
      },
      toggleCourseStatus: (CommentId) => {
        set((state) => ({
          CommentList: state.CommentList.map((Comment) =>
            Comment.id === CommentId ? { ...Comment, completed: !Comment.completed } : Comment
          ),
        }));
      },
      setCommentList: (newCommentList) => {
        set({ CommentList: newCommentList });
      },
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