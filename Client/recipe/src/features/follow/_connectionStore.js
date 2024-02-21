import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { fetchConnections, newConnection } from '../../app/service/ConnectionApi';

export const useConnectionStore = create(
  devtools(
    persist((set) => ({
      ConnectionList: [],
      newConnection: async (user_id) => {
        try{
          console.log(user_id)
          const newConnection = await newConnection(user_id);
          set((state) => ({
            ConnectionList: [newConnection, ...state.ConnectionList],
          }));
          console.log(CommentList);

        }catch(error){
          console.log("Error while adding connection!: ", error.message)
        }
      },
      fetchConnections: async (user_id) => {
        try {
          const connections = await fetchConnections(user_id);
          set({ ConnectionList: connections });
        } catch (error) {
          // Handle error, maybe show a notification to the user
        }
      },
      // removeComment: (CommentId) => {
      //   set((state) => ({
      //     CommentList: state.CommentList.filter((c) => c.id !== CommentId),
      //   }));
      // },
      // toggleCourseStatus: (CommentId) => {
      //   set((state) => ({
      //     CommentList: state.CommentList.map((Comment) =>
      //       Comment.id === CommentId ? { ...Comment, completed: !Comment.completed } : Comment
      //     ),
      //   }));
      // },
      // setCommentList: (newCommentList) => {
      //   set({ CommentList: newCommentList });
      // },
    }), {
      name: "Comments",
    })
  )
);

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