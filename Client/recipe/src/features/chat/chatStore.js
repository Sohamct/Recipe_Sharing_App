import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import { getChats } from '../../app/service/ChatApi';

export const useChatStore = create(
    devtools(
        persist((set) => ({
            chatsByUser: [], // Initialize chatsByUser as an empty object
            fetchChats: async () => {
                try {
                    const chats = await getChats();
                    console.log(chats.data);
                    set({ chatsByUser: chats.data });
                } catch (error) {
                    console.log("Error occurred while fetching chats:", error);
                }
            }
        }),
            {
                name: "Chats",
            })
    )
);

export default useChatStore;
