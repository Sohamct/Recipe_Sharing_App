import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const useChatStore = create(
  devtools(
    persist((set) => ({
      chatList: [],
      addChat: (chat) => {
        set((state) => ({
          chatList: [chat, ...state.chatList],
        }));
      },
      removeChat: (chatId) => {
        set((state) => ({
          chatList: state.chatList.filter((c) => c.id !== chatId),
        }));
      },
      toggleCourseStatus: (chatId) => {
        set((state) => ({
          chatList: state.chatList.map((chat) =>
            chat.id === chatId ? { ...chat, completed: !chat.completed } : chat
          ),
        }));
      },
      setChatList: (newChatList) => {
        set({ chatList: newChatList });
      },
    }), {
      name: "Chats",
    })
  )
);

export default useChatStore;

// import {create} from 'zustand';
// import { devtools, persist } from 'zustand/middleware'; // to check info in browser
// // persist: to store info in browser


// const chatStore = (set) => ({
//     chatList: [], // initially
//     addChat: (chat) => {
//         set((state) => ({
//             chatList : [chat, ...state.chatList],
//         }))
//     },
//     removeChat: (chatId) => {
//         set((state) => ({
//             chatList: state.chatList.filter((c) => c.id !== chatId)
//         }))
//     },
//     toggleCourseStatus: (chatId) => {
//         set((state) => ({
//             chatList: state.chatList.map((chat) => chat.id === chatId ? {...chat, completed: !chat.completed} : chat)
//         }))
//     }

// })

// const useChatStore = create(
//     devtools(
//         persist(chatStore, {
//             name: "Chats",
//         })
//     )
// )

// export default useChatStore;