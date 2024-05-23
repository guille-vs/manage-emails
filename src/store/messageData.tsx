import { create } from "zustand";
import { Folder, Message } from "../interfaces";

interface MessageDataState{
    messages: Message[];
    folders: Folder[];
    selectedFolder: Folder | null;

    setMessages: (value: Message[]) => void;
    setFolders: (value: Folder[]) => void;
    setSelectedFolder: (value: Folder) => void;
}

export const useMessageData = create<MessageDataState>((set) => ({
    messages: [],
    folders: [],
    selectedFolder: null,

    setMessages: (value: Message[]) =>  set({
        messages: [...value]
    }),
    setFolders: (value: Folder[]) => set({
        folders: [...value]
    }),
    setSelectedFolder: (value: Folder) => set({
        selectedFolder: value
    })

}))
